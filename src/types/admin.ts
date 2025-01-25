import type { GroqModel } from './groq';

export interface ScriptConfig {
  headScripts: string;
  bodyScripts: string;
  facebookPixel: string;
  googleAdsTag: string;
  googleAnalyticsTag: string;
  googleTagManager: string;
  wistiaId: string;
  groqApiKey: string;
  groqModel: GroqModel;
}

export interface PlanUrls {
  basicPlanUrl: string;
  masterPlanUrl: string;
  spinnerPlanUrl: string;
}

export interface ButtonUrls {
  startNowTopUrl: string;
  scheduleDemo1Url: string;
  watchVideoUrl: string;
  scheduleDemo2Url: string;
  talkConsultant1Url: string;
  startNowBottomUrl: string;
  talkConsultant2Url: string;
  requestDemoUrl: string;
  whatsappUrl: string;
}

export interface CityGenerationStatus {
  cityName: string;
  status: 'pending' | 'generating' | 'completed' | 'error';
  timestamp: number;
  error?: string;
  pageUrl?: string;
}

export interface AdminState {
  scripts: ScriptConfig;
  planUrls: PlanUrls;
  buttonUrls: ButtonUrls;
  cities: string[];
  generationStatus: CityGenerationStatus[];
}