// import { SkinAnalysisResult } from "@/app/api/analysis-skincare/route";

export interface AnalysisResult {
  ruleId: string;
  compliant: boolean;
  explanation: string;
  score: number;
  recommendedProducts: string[] | undefined; // Make this optional to match existing usage
  subtype?: string;
  details?: {
    characteristics?: string[];
    recommendations?: string[];
    risks?: string[];
    hairCharacteristics?: {
      type: string;
      pattern: string;
      texture: string;
      density: string;
      porosity: string;
      elasticity: string;
    };
    wavePattern?: {
      description: string;
      features: string[];
    };
    careNeeds?: string[];
    skinCharacteristics?: {
      type: string;
      concerns: string[];
      strengths: string[];
      sensitivities: string[];
    };
    barrierHealth?: {
      status: string;
      notes: string;
    };
    hydrationLevel?: {
      status: string;
      distribution: string;
    };
  };
}

export type PostType = "analysis" | "ai-edit" | "timeline" | "before-after";

export interface Post {
  id: string;
  type: PostType;
  subtype?: string;
  images: string[];
  caption: string;
  description: string;
  timestamp: number;
  username?: string;
  votes?: {
    better: number;
    worse: number;
  };
  analysisResults?: AnalysisResult[];
  editPrompt?: string;
  comments?: Comment[];
  actionableInsights?: {
    immediate: string[];
    shortTerm: string[];
    longTerm: string[];
  };
}

export interface PostData {
  type: PostType;
  images: string[];
  caption: string;
  description: string;
  analysisResults: AnalysisResult[];
  editPrompt?: string;
  actionableInsights?: {
    immediate: string[];
    shortTerm: string[];
    longTerm: string[];
  };
}

export interface Comment {
  id: string;
  username: string;
  text: string;
  timestamp: number;
}
