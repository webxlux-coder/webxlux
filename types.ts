
export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  challenge: string;
  result: string;
  role: string;
  focus: string;
  tech: string;
  impact: string;
  metrics: { label: string; value: string }[];
  image: string;
  gallery: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}
