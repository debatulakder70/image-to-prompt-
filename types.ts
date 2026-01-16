
export interface AnalysisResult {
  imageType: string;
  prompt: string;
  styleTags: string;
  negativePrompt: string;
  userReplacementGuide: string;
}

export interface AppState {
  image: string | null;
  analyzing: boolean;
  result: AnalysisResult | null;
  error: string | null;
}
