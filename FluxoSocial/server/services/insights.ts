import type {
  CampaignInsight,
  InsightResponse,
  InsightSummary,
} from "../../shared/types";

const round = (value: number): number => Math.round(value * 100) / 100;

export const buildSummary = (data: CampaignInsight[]): InsightSummary => {
  const base = data.reduce(
    (accumulator, campaign) => {
      const { impressions, clicks, conversions, spend, revenue } = campaign.performance;

      return {
        impressions: accumulator.impressions + impressions,
        clicks: accumulator.clicks + clicks,
        conversions: accumulator.conversions + conversions,
        spend: accumulator.spend + spend,
        revenue: accumulator.revenue + revenue,
      };
    },
    { impressions: 0, clicks: 0, conversions: 0, spend: 0, revenue: 0 },
  );

  const roi = base.spend === 0 ? 0 : ((base.revenue - base.spend) / base.spend) * 100;
  const conversionRate = base.clicks === 0 ? 0 : (base.conversions / base.clicks) * 100;

  return {
    totalSpend: round(base.spend),
    totalRevenue: round(base.revenue),
    averageRoi: round(roi),
    averageConversionRate: round(conversionRate),
  };
};

export const buildResponse = (data: CampaignInsight[]): InsightResponse => ({
  campaigns: data,
  generatedAt: new Date().toISOString(),
  summary: buildSummary(data),
});
