// import { SkinAnalysisResult } from "@/app/api/analysis-skincare/route";

export interface AnalysisResult {
  ruleId: string;
  compliant: boolean;
  explanation: string;
  score: number;
  recommendedProducts: string[] | undefined; // Make this optional to match existing usage
}

export type PostType = "analysis" | "ai-edit" | "timeline" | "before-after";

export interface Post {
  id: string;
  type: PostType;
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
}

export interface PostData {
  type: PostType;
  images: string[];
  caption: string;
  description: string;
  analysisResults: AnalysisResult[];
  editPrompt?: string;
}

export interface Comment {
  id: string;
  username: string;
  text: string;
  timestamp: number;
}
