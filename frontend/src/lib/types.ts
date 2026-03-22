export type ChatRequest = {
    message: string;
  };
  
  export type ChatResponse = {
    answer: string;
    sources: string[];
  };