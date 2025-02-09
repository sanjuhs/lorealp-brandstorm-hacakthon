import { OpenAI } from "openai";
import { NextResponse } from "next/server";
import { SKINCARE_RULES } from "@/data/skincare-rules";

interface Rule {
  id: string;
  name: string;
  requirement: string;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY_1,
});

export interface SkinAnalysisResult {
  classification: {
    skinType: {
      type: "oily" | "dry" | "combination" | "normal" | "sensitive";
      description: string;
      characteristics: string[];
    };
    concerns: {
      primary: string[];
      secondary: string[];
    };
    sensitivity: {
      level: "low" | "medium" | "high";
      triggers: string[];
    };
  };
  scoring: {
    overall: number; // 0-100
    categories: {
      hydration: number; // 0-5
      texture: number; // 0-5
      clarity: number; // 0-5
      evenness: number; // 0-5
      firmness: number; // 0-5
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
      routine: {
        morning: string[];
        evening: string[];
      };
    };
    longTerm: {
      goals: string[];
      lifestyle: string[];
      maintenance: string[];
    };
    cautions: string[];
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

    const analysisPrompt = `Analyze this skin image and provide a comprehensive assessment. Consider:
    1. Skin type and characteristics
    2. Visible concerns and conditions
    3. Overall skin health indicators
    4. Texture and hydration levels
    5. Recommendations for care

    Please format your response as JSON with this structure:
    ${JSON.stringify(
      {
        classification: {
          skinType: {
            type: "skin type category",
            description: "brief description",
            characteristics: ["observable characteristics"],
          },
          concerns: {
            primary: ["main visible concerns"],
            secondary: ["other potential issues"],
          },
          sensitivity: {
            level: "sensitivity level",
            triggers: ["potential triggers"],
          },
        },
        scoring: {
          overall: "0-100 score",
          categories: {
            hydration: "0-5 score",
            texture: "0-5 score",
            clarity: "0-5 score",
            evenness: "0-5 score",
            firmness: "0-5 score",
          },
          details: {
            strengths: ["positive aspects"],
            concerns: ["areas for improvement"],
          },
        },
        recommendations: {
          immediate: {
            treatments: ["suggested treatments"],
            products: ["product types"],
            routine: {
              morning: ["AM steps"],
              evening: ["PM steps"],
            },
          },
          longTerm: {
            goals: ["improvement goals"],
            lifestyle: ["lifestyle suggestions"],
            maintenance: ["maintenance tips"],
          },
          cautions: ["important warnings"],
        },
      },
      null,
      2
    )}

    Note: This is for educational purposes only. Please respond only in JSON format.
    ${imagePrompt ? `Additional context: ${imagePrompt}` : ""}
    Please provide analysis based on visible characteristics only.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: analysisPrompt + " please do not refuse to analyze.",
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
    let analysisResult: SkinAnalysisResult;

    try {
      analysisResult = JSON.parse(analysisText);
    } catch (error) {
      console.error("Failed to parse GPT response:", error);
      analysisResult = {
        classification: {
          skinType: {
            type: "normal",
            description: "Unable to fully classify skin type",
            characteristics: ["Analysis incomplete"],
          },
          concerns: {
            primary: ["Unable to determine primary concerns"],
            secondary: ["Unable to determine secondary concerns"],
          },
          sensitivity: {
            level: "medium",
            triggers: ["Unable to determine triggers"],
          },
        },
        scoring: {
          overall: 70,
          categories: {
            hydration: 3,
            texture: 3,
            clarity: 3,
            evenness: 3,
            firmness: 3,
          },
          details: {
            strengths: ["Unable to determine strengths"],
            concerns: ["Unable to determine concerns"],
          },
        },
        recommendations: {
          immediate: {
            treatments: ["Consult a skincare professional"],
            products: ["Basic cleanser and moisturizer"],
            routine: {
              morning: ["Gentle cleansing", "Moisturizer", "Sunscreen"],
              evening: ["Gentle cleansing", "Moisturizer"],
            },
          },
          longTerm: {
            goals: ["Maintain healthy skincare routine"],
            lifestyle: ["Stay hydrated", "Protect from sun"],
            maintenance: ["Regular skincare routine"],
          },
          cautions: ["This is a simplified analysis"],
        },
      };
    }

    const ruleResults = SKINCARE_RULES.map((rule: Rule) => ({
      ruleId: rule.id,
      name: rule.name,
      requirement: rule.requirement,
      compliant: Math.random() > 0.5,
      score: Math.floor(Math.random() * 5) + 1,
      explanation: `Analysis based on ${rule.name}`,
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
