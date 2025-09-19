export interface PerformanceSummary {
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  revenue: number;
}

export interface TrendPoint {
  date: string;
  impressions: number;
  clicks: number;
  conversions: number;
}

export interface AudienceSegment {
  id: string;
  name: string;
  description: string;
  share: number;
  growth: number;
}

export type RecommendationImpact = "low" | "medium" | "high";

export interface ActionRecommendation {
  id: string;
  title: string;
  description: string;
  impact: RecommendationImpact;
}

export type CreativeAssetType = "image" | "video" | "carousel" | "story";

export interface CreativeAsset {
  id: string;
  name: string;
  type: CreativeAssetType;
  performance: {
    clickThroughRate: number;
    conversionRate: number;
    costPerAcquisition: number;
  };
}

export type CampaignObjective = "awareness" | "consideration" | "conversion";

export interface CampaignInsight {
  id: string;
  name: string;
  objective: CampaignObjective;
  summary: string;
  performance: PerformanceSummary;
  trend: TrendPoint[];
  audience: AudienceSegment[];
  bestAsset: CreativeAsset;
  recommendedActions: ActionRecommendation[];
}

export interface InsightSummary {
  totalSpend: number;
  totalRevenue: number;
  averageRoi: number;
  averageConversionRate: number;
}

export interface InsightResponse {
  campaigns: CampaignInsight[];
  generatedAt: string;
  summary: InsightSummary;
}

export interface HealthResponse {
  status: "ok";
  timestamp: string;
  environment: string;
  campaignsTracked: number;
}
