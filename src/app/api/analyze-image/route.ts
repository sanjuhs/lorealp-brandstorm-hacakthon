import { OpenAI } from "openai";
import { NextResponse } from "next/server";
import { SKINCARE_RULES } from "@/data/skincare-rules";
import { LOREAL_PRODUCTS } from "@/data/loreal-products";

interface AnalysisResult {
  ruleId: string;
  compliant: boolean;
  explanation: string;
  score: number;
  recommendedProducts: string[];
}

export const maxDuration = 60;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY_1,
});

const createAnalysisPrompt = (imagePrompt: string) => `
Analyze this skincare transformation image against these specific criteria:

Image Context: "${imagePrompt}"

Evaluation Criteria:
${SKINCARE_RULES.map((rule) => `- ${rule.name}: ${rule.requirement}`).join(
  "\n"
)}

Available Product Recommendations:
${LOREAL_PRODUCTS.map(
  (product) =>
    `- ${product.name}: ${product.description} (for ${product.concerns.join(
      ", "
    )})`
).join("\n")}

For each criterion:
1. Compare the before/after states if available
2. Rate improvement on a scale of 1-5
3. Provide specific observations
4. Suggest specific L'Oreal products that could help

Return analysis in JSON format:
{
  results: [
    {
      "ruleId": "criterion-id",
      "compliant": true/false,
      "explanation": "Detailed observation of changes and current state",
      "score": 1-5,
      "recommendedProducts": ["product-id1", "product-id2"]
    }
  ]
}

Focus on objective, measurable changes in skin condition and recommend relevant L'Oreal products for areas needing improvement.
`;

export async function POST(req: Request) {
  try {
    const { imagePrompt, imageUrl, imageBase64, mode, analysisResults } =
      await req.json();

    if (mode === "suggest_improvements") {
      const failedRules = analysisResults.filter(
        (result: AnalysisResult) => !result.compliant
      );

      const improvementsPrompt = `
        As a skincare expert, analyze these concerns and recommend L'Oreal products:

        Current Status: "${imagePrompt}"

        Areas Needing Attention:
        ${failedRules
          .map((rule: AnalysisResult) => `- ${rule.explanation}`)
          .join("\n")}

        Available L'Oreal Products:
        ${LOREAL_PRODUCTS.map(
          (product) =>
            `- ${product.name}: ${
              product.description
            } (for ${product.concerns.join(", ")})`
        ).join("\n")}

        Please provide:
        1. Specific L'Oreal product recommendations for each concern
        2. Usage instructions and routine
        3. Expected timeline for improvements
        4. Additional skincare tips

        Format response as JSON:
        {
          "recommendations": [
            {
              "concern": "concern name",
              "products": ["product-id1", "product-id2"],
              "instructions": "how to use",
              "timeline": "expected improvement timeline"
            }
          ],
          "additionalTips": "general advice"
        }
      `;

      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: improvementsPrompt }],
        model: "gpt-4o",
        response_format: { type: "json_object" },
      });

      let suggestions;
      try {
        suggestions = JSON.parse(completion.choices[0].message.content || "{}");
        // Ensure all fields are strings and handle potential objects
        suggestions = {
          recommendations: String(suggestions.recommendations || ""),
          productSuggestions: String(suggestions.productSuggestions || ""),
          timeline: String(suggestions.timeline || ""),
          additionalTips: String(suggestions.additionalTips || ""),
        };
      } catch (error) {
        console.error("Error parsing suggestions:", error);
        suggestions = {
          recommendations: "Failed to parse recommendation",
          productSuggestions: "Failed to parse product suggestions",
          timeline: "Failed to parse timeline",
          additionalTips: "Failed to parse additional tips",
        };
      }
      return NextResponse.json(suggestions);
    }

    const analysisPrompt = createAnalysisPrompt(imagePrompt);

    // Restore the original image content handling
    const imageContent = imageBase64
      ? { url: `data:image/jpeg;base64,${imageBase64}`, detail: "high" }
      : { url: imageUrl, detail: "high" };

    console.log("Analyzing image with type:", imageBase64 ? "base64" : "url");

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a brand compliance expert analyzing images against brand guidelines.",
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: analysisPrompt,
            },
            {
              type: "image_url",
              image_url: {
                url: imageContent.url,
                detail: "high",
              },
            },
          ] as const,
        },
      ],
      // max_tokens: 1000,
    });

    const finalResponse = completion.choices[0].message.content;
    console.log("Analysis response:", finalResponse);

    const analysis = JSON.parse(finalResponse || "{}");

    return NextResponse.json(analysis.results);
  } catch (error) {
    console.error("Analysis error:", error);

    const errorObj = error as {
      error?: { message?: string };
      message?: string;
    };
    const errorMessage =
      errorObj.error?.message || errorObj.message || "Failed to analyze image";

    return NextResponse.json(
      {
        error: errorMessage,
        details: errorObj.error || errorObj,
      },
      { status: 500 }
    );
  }
}
