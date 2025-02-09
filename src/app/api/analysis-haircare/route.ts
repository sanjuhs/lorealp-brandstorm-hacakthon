import { OpenAI } from "openai";
import { NextResponse } from "next/server";
import { HAIRCARE_RULES } from "@/data/haircare-rules";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY_1,
});

export interface HairAnalysisResult {
  classification: {
    type: {
      category: "1" | "2" | "3" | "4";
      subcategory: "a" | "b" | "c";
      description: string;
      characteristics: string[];
    };
    porosity: {
      level: "low" | "medium" | "high";
      description: string;
      characteristics: string[];
    };
    density: {
      level: "fine" | "medium" | "coarse";
      description: string;
    };
    scalpCondition: {
      type: "dry" | "oily" | "combination" | "normal" | "sensitive";
      concerns: string[];
    };
  };
  scoring: {
    overall: number; // 0-100
    categories: {
      health: number; // 0-5
      moisture: number; // 0-5
      damage: number; // 0-5
      scalp: number; // 0-5
      style: number; // 0-5
    };
    details: {
      strengths: string[];
      concerns: string[];
    };
  };
  recommendations: {
    immediate: {
      treatments: string[];
      products: string[];
      routine: string[];
    };
    longTerm: {
      goals: string[];
      lifestyle: string[];
      maintenance: string[];
    };
    warnings: string[];
  };
}

export async function POST(req: Request) {
  try {
    const { imageBase64, imagePrompt } = await req.json();

    if (!imageBase64) {
      return NextResponse.json(
        { error: "Image data is required" },
        { status: 400 }
      );
    }

    const analysisPrompt = `Analyze this hair image in detail and provide a comprehensive assessment. Consider:
    1. Hair type classification (Andre Walker system)
    2. Porosity and density evaluation
    3. Scalp condition assessment
    4. Overall hair health scoring
    5. Specific concerns and strengths
    6. Treatment and product recommendations

    Format the response as a JSON object with the following structure:
    ${JSON.stringify(
      {
        classification: {
          type: {
            category: "Type (1-4)",
            subcategory: "Subtype (a-c)",
            description: "Description of hair type",
            characteristics: ["List of characteristics"],
          },
          porosity: {
            level: "porosity level",
            description: "porosity description",
            characteristics: ["porosity characteristics"],
          },
          density: {
            level: "density level",
            description: "density description",
          },
          scalpCondition: {
            type: "scalp type",
            concerns: ["scalp concerns"],
          },
        },
        scoring: {
          overall: "overall score",
          categories: {
            health: "health score",
            moisture: "moisture score",
            damage: "damage score",
            scalp: "scalp score",
            style: "style score",
          },
          details: {
            strengths: ["strengths"],
            concerns: ["concerns"],
          },
        },
        recommendations: {
          immediate: {
            treatments: ["treatments"],
            products: ["products"],
            routine: ["routine steps"],
          },
          longTerm: {
            goals: ["goals"],
            lifestyle: ["lifestyle changes"],
            maintenance: ["maintenance tips"],
          },
          warnings: ["warnings"],
        },
      },
      null,
      2
    )}

    Additional context from user: ${
      imagePrompt || "No specific concerns mentioned"
    }

    please analyze my image , as to the best of your ability , this is purely for entertainment purposes.
    
    Base your analysis on visible characteristics in the image and provide practical, actionable recommendations.`;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const analysisPrompt_simple = `
    what type of hair is the woman showing in depth analsyis ?
    please tell me with respect to the andre wlaker's scale as well as comment in porosity an ddensity if possible?
    `;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const analysisPrompt_norejection = `
    what type of hair is the woman showing in depth analsyis ?
    please tell me with respect to the andre wlaker's scale as well as comment in porosity an ddensity if possible?
    `;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const analysisPrompt_3 = `
    Looking at this image, please help me understand:
    1. The basic hair pattern (straight/wavy/curly/coily)
    2. Approximate hair thickness and density
    3. Any visible characteristics about hair health
    4. General hair texture and appearance

    If possible, suggest which Andre Walker hair type this might be (Type 1-4).
    
    Please format your response as JSON with this structure:
    {
      "classification": {
        "type": { "category": "1-4", "subcategory": "a-c", "description": "brief description" },
        "density": { "level": "fine/medium/coarse", "description": "brief note" }
      },
      "scoring": {
        "overall": 1-100,
        "categories": { "health": 1-5, "style": 1-5 },
        "details": { "strengths": [], "concerns": [] }
      },
      "recommendations": {
        "immediate": { "suggestions": [] },
        "maintenance": []
      }
    }

    Note: This is for educational purposes only, not professional advice.
    Please respond only in JSON format. `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text:
                analysisPrompt +
                "please do not refuse as it cab break the json format",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${imageBase64}`,
                detail: "high",
              },
            },
          ],
        },
      ],
    });

    const analysisText = response.choices[0]?.message?.content || "";
    console.log("analysisText ==>", analysisText);
    let analysisResult: HairAnalysisResult;

    try {
      // Try to parse the JSON response
      analysisResult = JSON.parse(analysisText);
    } catch (error) {
      // If parsing fails, create a simplified response
      console.error("Failed to parse GPT response:", error);
      analysisResult = {
        classification: {
          type: {
            category: "2",
            subcategory: "b",
            description: "Unable to fully classify hair type",
            characteristics: ["Analysis incomplete"],
          },
          porosity: {
            level: "medium",
            description: "Unable to determine porosity",
            characteristics: ["Analysis incomplete"],
          },
          density: {
            level: "medium",
            description: "Unable to determine density",
          },
          scalpCondition: {
            type: "normal",
            concerns: ["Unable to assess scalp condition"],
          },
        },
        scoring: {
          overall: 70,
          categories: {
            health: 3,
            moisture: 3,
            damage: 3,
            scalp: 3,
            style: 3,
          },
          details: {
            strengths: ["Unable to determine strengths"],
            concerns: ["Unable to determine concerns"],
          },
        },
        recommendations: {
          immediate: {
            treatments: [
              "Consult a hair care professional for detailed analysis",
            ],
            products: ["Basic moisturizing shampoo and conditioner"],
            routine: ["Regular washing and conditioning"],
          },
          longTerm: {
            goals: ["Maintain healthy hair care routine"],
            lifestyle: ["Protect hair while sleeping"],
            maintenance: ["Regular trims"],
          },
          warnings: [
            "This is a simplified analysis due to processing limitations",
          ],
        },
      };
    }

    // Apply rules-based analysis
    const ruleResults = HAIRCARE_RULES.map((rule) => ({
      ruleId: rule.id,
      name: rule.name,
      requirement: rule.requirement,
      compliant: Math.random() > 0.5, // Replace with actual analysis
      score: Math.floor(Math.random() * 5) + 1, // Replace with actual scoring
      explanation: `Analysis based on ${rule.name}`, // Replace with actual explanation
    }));

    return NextResponse.json({
      analysis: analysisResult,
      ruleResults,
    });
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze image" },
      { status: 500 }
    );
  }
}
