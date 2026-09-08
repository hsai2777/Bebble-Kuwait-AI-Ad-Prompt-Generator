export interface BebbleProduct {
  id: string;
  nameAr: string;
  nameEn: string;
  value: string;
  category: 'detergent' | 'wash' | 'cream' | 'kids' | 'soap' | 'auto';
  colorAccent: string;
  badge: string;
  bottleColor: string;
  suggestedEnv: string;
  suggestedHeadline: string;
}

export interface AdFormState {
  product: string;
  campaign: string;
  style: string;
  environment: string;
  camera: string;
  lighting: string;
  duration: string;
  format: string;
  promotion: string;
  offer: string;
  headline: string;
  cta: string;
  notes: string;
  referenceImage: string | null;
  referenceImageName: string | null;
}

export interface PresetTemplate {
  id: string;
  title: string;
  description: string;
  icon: string;
  config: Partial<AdFormState>;
}

export interface SavedPrompt {
  id: string;
  title: string;
  createdAt: string;
  promptText: string;
  config: AdFormState;
}
