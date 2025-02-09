"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { SKINCARE_RULES } from "@/data/skincare-rules";
import { HAIRCARE_RULES } from "@/data/haircare-rules";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { HairAnalysisResult } from "@/app/api/analysis-haircare/route";
import { PostData, AnalysisResult } from "@/app/types";

interface AnalysisType {
  none: boolean;
  skincare: boolean;
  haircare: boolean;
}

interface AnalysisPostProps {
  onPost: (post: PostData) => void;
}

export function AnalysisPost({ onPost }: AnalysisPostProps) {
  const [image, setImage] = useState<string>("");
  const [caption, setCaption] = useState("");
  const [description, setDescription] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([]);
  const [analysisType, setAnalysisType] = useState<AnalysisType>({
    none: true,
    skincare: false,
    haircare: false,
  });
  const [hairAnalysis, setHairAnalysis] = useState<HairAnalysisResult | null>(
    null
  );
  const imageRef = useRef<HTMLInputElement>(null);

  const handleAnalysisTypeChange = (type: keyof AnalysisType) => {
    if (type === "none") {
      if (!analysisType.none) {
        setAnalysisType({
          none: true,
          skincare: false,
          haircare: false,
        });
      }
    } else {
      setAnalysisType((prev) => {
        const newState = {
          ...prev,
          none: false,
          [type]: !prev[type],
        };

        if (!newState.skincare && !newState.haircare) {
          newState.none = true;
        }

        return newState;
      });
    }
  };

  const handleAnalyze = async () => {
    if (!image || analysisType.none) return;

    setAnalyzing(true);
    try {
      // If only haircare is selected
      if (analysisType.haircare && !analysisType.skincare) {
        const response = await fetch("/api/analysis-haircare", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            imagePrompt: caption,
            imageBase64: image.split(",")[1],
          }),
        });

        if (!response.ok) throw new Error("Analysis failed");

        const { analysis, ruleResults } = await response.json();
        setAnalysisResults(ruleResults);
        setHairAnalysis(analysis);
        setAnalyzed(true);

        // Create a comprehensive description from the hair analysis
        const description = `
Hair Classification:
Type: ${analysis.classification.type.category}${
          analysis.classification.type.subcategory
        } - ${analysis.classification.type.description}
Porosity: ${analysis.classification.porosity.level} - ${
          analysis.classification.porosity.description
        }
Density: ${analysis.classification.density.level} - ${
          analysis.classification.density.description
        }

Overall Score: ${analysis.scoring.overall}/100

Detailed Scores:
- Health: ${analysis.scoring.categories.health}/5
- Moisture: ${analysis.scoring.categories.moisture}/5
- Damage: ${analysis.scoring.categories.damage}/5
- Scalp: ${analysis.scoring.categories.scalp}/5
- Style: ${analysis.scoring.categories.style}/5

Strengths:
${analysis.scoring.details.strengths.map((s: string) => `• ${s}`).join("\n")}

Concerns:
${analysis.scoring.details.concerns.map((c: string) => `• ${c}`).join("\n")}

Recommendations:
Immediate Treatments:
${analysis.recommendations.immediate.treatments
  .map((t: string) => `• ${t}`)
  .join("\n")}

Suggested Products:
${analysis.recommendations.immediate.products
  .map((p: string) => `• ${p}`)
  .join("\n")}

Long-term Goals:
${analysis.recommendations.longTerm.goals
  .map((g: string) => `• ${g}`)
  .join("\n")}

Important Notes:
${analysis.recommendations.warnings.map((w: string) => `⚠️ ${w}`).join("\n")}
`;

        setDescription(description);
      } else {
        // Original analyze-image endpoint for skincare or combined analysis
        const rules = [
          ...(analysisType.skincare ? SKINCARE_RULES : []),
          ...(analysisType.haircare ? HAIRCARE_RULES : []),
        ];

        const response = await fetch("/api/analyze-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            imagePrompt: caption,
            rules,
            imageBase64: image.split(",")[1],
            mode: "analyze",
          }),
        });

        if (!response.ok) throw new Error("Analysis failed");

        const results = await response.json();
        setAnalysisResults(results);
        setHairAnalysis(
          results.find((r: AnalysisResult) => r.ruleId === "haircare")
        );
        setAnalyzed(true);

        const summary = results
          .map(
            (result: AnalysisResult) =>
              `${result.compliant ? "✅" : "❌"} ${
                result.explanation
              } (Score: ${result.score}/5)`
          )
          .join("\n\n");
        setDescription(summary);
      }
    } catch (error) {
      console.error("Analysis error:", error);
      toast.error("Analysis failed. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  const handlePost = () => {
    onPost({
      type: "analysis",
      images: [image],
      caption,
      description,
      analysisResults: analysisType.none ? [] : analysisResults,
    });

    // Reset form
    setImage("");
    setCaption("");
    setDescription("");
    setAnalysisResults([]);
    setAnalyzed(false);
    setAnalysisType({ none: true, skincare: false, haircare: false });
  };

  return (
    <div className="space-y-4">
      <div
        className="aspect-square bg-white rounded-lg border-2 border-dashed border-[#FFB74D]/40 flex items-center justify-center relative overflow-hidden"
        onClick={() => imageRef.current?.click()}
      >
        {image ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt="Uploaded"
              className="object-cover w-full h-full"
            />
            <div className="absolute bottom-4 right-4">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAnalyze();
                }}
                className="bg-[#C4944C] hover:bg-[#8B6B3D]"
                disabled={analyzing}
              >
                {analyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze Image"
                )}
              </Button>
            </div>
          </>
        ) : (
          <Button variant="ghost" className="text-[#C4944C]">
            Upload image for analysis
          </Button>
        )}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                setImage(reader.result as string);
              };
              reader.readAsDataURL(file);
            }
          }}
          ref={imageRef}
        />
      </div>

      <div className="bg-white rounded-lg p-4 border border-[#FFB74D]/20">
        <div className="text-sm font-medium text-[#8B6B3D] mb-3">
          Analysis Type
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="none"
              checked={analysisType.none}
              onCheckedChange={() => handleAnalysisTypeChange("none")}
            />
            <Label htmlFor="none" className="text-[#8B6B3D]">
              None (Post without analysis)
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="skincare"
              checked={analysisType.skincare}
              onCheckedChange={() => handleAnalysisTypeChange("skincare")}
            />
            <Label htmlFor="skincare" className="text-[#8B6B3D]">
              Skincare Analysis
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="haircare"
              checked={analysisType.haircare}
              onCheckedChange={() => handleAnalysisTypeChange("haircare")}
            />
            <Label htmlFor="haircare" className="text-[#8B6B3D]">
              Haircare Analysis
            </Label>
          </div>
        </div>
      </div>

      {analysisType.haircare && !analysisType.skincare && hairAnalysis && (
        <HairAnalysisDisplay analysis={hairAnalysis} />
      )}

      <div className="space-y-4">
        <Input
          placeholder="Add a caption... *"
          className="bg-white border-[#FFB74D]/20"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          required
        />
        <Textarea
          placeholder="Add a description..."
          className="bg-white border-[#FFB74D]/20"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button
          className="w-full bg-[#C4944C] hover:bg-[#8B6B3D]"
          onClick={handlePost}
          disabled={
            !image || !caption.trim() || (!analysisType.none && !analyzed)
          }
        >
          {!analyzed && !analysisType.none
            ? "Please analyze image first"
            : "Post"}
        </Button>
      </div>
    </div>
  );
}

function HairAnalysisDisplay({ analysis }: { analysis: HairAnalysisResult }) {
  return (
    <div className="space-y-4">
      <Card className="p-4 bg-white/50 backdrop-blur">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-[#8B6B3D]">Overall Score</h3>
          <div className="text-2xl font-bold text-[#C4944C]">
            {analysis.scoring.overall}/100
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {Object.entries(analysis.scoring.categories).map((entry) => {
            const [key, score] = entry as [string, number];
            return (
              <div
                key={key}
                className="flex flex-col items-center p-2 bg-white rounded-lg"
              >
                <div className="text-xs text-[#8B6B3D] capitalize">{key}</div>
                <div className="text-lg font-semibold text-[#C4944C]">
                  {score}/5
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Accordion type="single" collapsible className="space-y-2">
        <AccordionItem value="classification" className="border-none">
          <AccordionTrigger className="bg-white rounded-lg px-4 hover:no-underline">
            <div className="flex items-center gap-2">
              <span className="text-lg">🔍</span>
              Hair Classification
            </div>
          </AccordionTrigger>
          <AccordionContent className="bg-white/50 mt-2 rounded-lg p-4">
            <div className="space-y-3">
              <div>
                <div className="font-medium text-[#8B6B3D]">Hair Type</div>
                <div className="text-sm">
                  Type {analysis.classification.type.category}
                  {analysis.classification.type.subcategory} -{" "}
                  {analysis.classification.type.description}
                </div>
              </div>
              <div>
                <div className="font-medium text-[#8B6B3D]">Porosity</div>
                <div className="text-sm">
                  {analysis.classification.porosity.level} -{" "}
                  {analysis.classification.porosity.description}
                </div>
              </div>
              <div>
                <div className="font-medium text-[#8B6B3D]">Density</div>
                <div className="text-sm">
                  {analysis.classification.density.level} -{" "}
                  {analysis.classification.density.description}
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="details" className="border-none">
          <AccordionTrigger className="bg-white rounded-lg px-4 hover:no-underline">
            <div className="flex items-center gap-2">
              <span className="text-lg">✨</span>
              Strengths & Concerns
            </div>
          </AccordionTrigger>
          <AccordionContent className="bg-white/50 mt-2 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="font-medium text-green-600 mb-2">Strengths</div>
                <ul className="space-y-1">
                  {analysis.scoring.details.strengths.map(
                    (strength: string) => (
                      <li
                        key={strength}
                        className="text-sm flex items-start gap-2"
                      >
                        <span className="text-green-500">•</span>
                        {strength}
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div>
                <div className="font-medium text-red-600 mb-2">Concerns</div>
                <ul className="space-y-1">
                  {analysis.scoring.details.concerns.map((concern: string) => (
                    <li
                      key={concern}
                      className="text-sm flex items-start gap-2"
                    >
                      <span className="text-red-500">•</span>
                      {concern}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="recommendations" className="border-none">
          <AccordionTrigger className="bg-white rounded-lg px-4 hover:no-underline">
            <div className="flex items-center gap-2">
              <span className="text-lg">💫</span>
              Recommendations
            </div>
          </AccordionTrigger>
          <AccordionContent className="bg-white/50 mt-2 rounded-lg p-4">
            <div className="space-y-4">
              <div>
                <div className="font-medium text-[#8B6B3D] mb-2">
                  Immediate Actions
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-[#C4944C] mb-1">
                      Treatments
                    </div>
                    <ul className="space-y-1">
                      {analysis.recommendations.immediate.treatments.map(
                        (treatment: string) => (
                          <li
                            key={treatment}
                            className="text-sm flex items-start gap-2"
                          >
                            <span className="text-[#C4944C]">•</span>
                            {treatment}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[#C4944C] mb-1">
                      Products
                    </div>
                    <ul className="space-y-1">
                      {analysis.recommendations.immediate.products.map(
                        (product: string) => (
                          <li
                            key={product}
                            className="text-sm flex items-start gap-2"
                          >
                            <span className="text-[#C4944C]">•</span>
                            {product}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <div className="font-medium text-[#8B6B3D] mb-2">
                  Long-term Goals
                </div>
                <ul className="space-y-1">
                  {analysis.recommendations.longTerm.goals.map(
                    (goal: string) => (
                      <li key={goal} className="text-sm flex items-start gap-2">
                        <span className="text-[#C4944C]">•</span>
                        {goal}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
