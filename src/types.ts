export interface Script {
  hook: string;
  problem: string;
  solution: string;
  features: string[];
  cta: string;
}

export interface Scene {
  id: string;
  text: string;
  imageUrl?: string;
  audioUrl?: string;
  duration: number; // in seconds
}

export interface Project {
  id: string;
  name: string;
  product_url: string;
  product_description: string;
  script: Script;
  scenes: Scene[];
  status: 'draft' | 'generating' | 'completed' | 'failed';
  created_at: string;
}
