
export enum GenerationStatus {
  PENDING,
  GENERATING,
  SUCCESS,
  FAILED,
}

export interface PromptItem {
  id: string;
  text: string;
  status: GenerationStatus;
  imageUrl?: string;
  error?: string;
}
