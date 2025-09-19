import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import App from "./App";
import type { InsightResponse } from "@shared/types";

const mockResponse: InsightResponse = {
  generatedAt: "2025-03-05T10:30:00.000Z",
  summary: {
    totalSpend: 15000,
    totalRevenue: 42000,
    averageRoi: 180,
    averageConversionRate: 3.4,
  },
  campaigns: [
    {
      id: "cmp-test",
      name: "Campanha teste",
      objective: "conversion",
      summary: "Campanha de exemplo utilizada para validar a interface.",
      performance: {
        impressions: 12000,
        clicks: 980,
        conversions: 160,
        spend: 4800,
        revenue: 15200,
      },
      trend: [
        { date: "2025-02-01", impressions: 3000, clicks: 210, conversions: 30 },
        { date: "2025-02-08", impressions: 3200, clicks: 240, conversions: 34 },
        { date: "2025-02-15", impressions: 2800, clicks: 260, conversions: 45 },
        { date: "2025-02-22", impressions: 3000, clicks: 270, conversions: 51 },
      ],
      audience: [
        {
          id: "segment-a",
          name: "Segmento A",
          description: "Clientes recorrentes com alto engajamento.",
          share: 52,
          growth: 10,
        },
      ],
      bestAsset: {
        id: "asset-1",
        name: "Vídeo principal",
        type: "video",
        performance: {
          clickThroughRate: 5.2,
          conversionRate: 2.9,
          costPerAcquisition: 9.5,
        },
      },
      recommendedActions: [
        {
          id: "action-1",
          title: "Criar variações orientadas por IA",
          description: "Utilize o motor da SocialFlux para testar versões com foco em compradores recorrentes.",
          impact: "high",
        },
      ],
    },
  ],
};

describe("App", () => {
  it("exibe o resumo quando os dados iniciais são informados", () => {
    render(<App initialData={mockResponse} />);

    expect(screen.getByText("Investimento total")).toBeInTheDocument();
    expect(screen.getByText("Receita consolidada")).toBeInTheDocument();
    expect(screen.getByText("Campanha teste")).toBeInTheDocument();
    expect(screen.getByText(/variações orientadas por IA/i)).toBeInTheDocument();
  });
});
