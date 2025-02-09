export interface AnalysisResult {
  ruleId: string;
  compliant: boolean;
  explanation: string;
  score: number;
  recommendedProducts?: string[];
}
