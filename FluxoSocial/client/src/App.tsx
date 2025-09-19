import { useEffect, useMemo, useState } from "react";

import type { InsightResponse } from "@shared/types";
import CampaignCard from "./components/CampaignCard";
import { formatCurrency, formatPercent } from "./lib/format";

interface AppProps {
  initialData?: InsightResponse;
}

const isRecord = (input: unknown): input is Record<string, unknown> =>
  typeof input === "object" && input !== null;

const isInsightResponse = (input: unknown): input is InsightResponse => {
  if (!isRecord(input)) {
    return false;
  }

  const { campaigns, summary, generatedAt } = input;

  if (!Array.isArray(campaigns) || typeof generatedAt !== "string" || !isRecord(summary)) {
    return false;
  }

  const summaryValid =
    typeof summary.totalSpend === "number" &&
    typeof summary.totalRevenue === "number" &&
    typeof summary.averageRoi === "number" &&
    typeof summary.averageConversionRate === "number";

  if (!summaryValid) {
    return false;
  }

  return campaigns.every((campaign) => {
    if (!isRecord(campaign)) {
      return false;
    }

    const hasBasicFields =
      typeof campaign.id === "string" &&
      typeof campaign.name === "string" &&
      typeof campaign.summary === "string" &&
      typeof campaign.objective === "string";

    if (!hasBasicFields || !isRecord(campaign.performance) || !isRecord(campaign.bestAsset)) {
      return false;
    }

    const performance = campaign.performance;

    const performanceValid =
      typeof performance.impressions === "number" &&
      typeof performance.clicks === "number" &&
      typeof performance.conversions === "number" &&
      typeof performance.spend === "number" &&
      typeof performance.revenue === "number";

    const bestAsset = campaign.bestAsset;
    const assetPerformance = isRecord(bestAsset.performance) ? bestAsset.performance : null;

    const assetValid =
      typeof bestAsset.name === "string" &&
      typeof bestAsset.type === "string" &&
      assetPerformance !== null &&
      typeof assetPerformance.clickThroughRate === "number" &&
      typeof assetPerformance.conversionRate === "number" &&
      typeof assetPerformance.costPerAcquisition === "number";

    const audienceValid =
      Array.isArray(campaign.audience) &&
      campaign.audience.every(
        (segment) =>
          isRecord(segment) &&
          typeof segment.id === "string" &&
          typeof segment.name === "string" &&
          typeof segment.description === "string" &&
          typeof segment.share === "number" &&
          typeof segment.growth === "number",
      );

    const actionsValid =
      Array.isArray(campaign.recommendedActions) &&
      campaign.recommendedActions.every(
        (action) =>
          isRecord(action) &&
          typeof action.id === "string" &&
          typeof action.title === "string" &&
          typeof action.description === "string" &&
          typeof action.impact === "string",
      );

    const trendValid =
      Array.isArray(campaign.trend) &&
      campaign.trend.every(
        (point) =>
          isRecord(point) &&
          typeof point.date === "string" &&
          typeof point.impressions === "number" &&
          typeof point.clicks === "number" &&
          typeof point.conversions === "number",
      );

    return performanceValid && assetValid && audienceValid && actionsValid && trendValid;
  });
};

const App: React.FC<AppProps> = ({ initialData }) => {
  const [data, setData] = useState<InsightResponse | null>(initialData ?? null);
  const [loading, setLoading] = useState(initialData === undefined);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      return;
    }

    let isActive = true;

    const loadInsights = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/insights");

        if (!response.ok) {
          throw new Error("Não foi possível carregar os insights.");
        }

        const payload: unknown = await response.json();

        if (!isInsightResponse(payload)) {
          throw new Error("A resposta recebida do servidor possui um formato inválido.");
        }

        if (isActive) {
          setData(payload);
        }
      } catch (fetchError) {
        if (!isActive) {
          return;
        }

        const message =
          fetchError instanceof Error ? fetchError.message : "Não foi possível processar a resposta do servidor.";

        setError(message);
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    void loadInsights();

    return () => {
      isActive = false;
    };
  }, [initialData]);

  const summary = data?.summary;
  const campaigns = data?.campaigns ?? [];
  const generatedAt = useMemo(() => {
    if (!data?.generatedAt) {
      return "";
    }

    const date = new Date(data.generatedAt);

    if (Number.isNaN(date.valueOf())) {
      return data.generatedAt;
    }

    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "long",
      hour: "2-digit",
      minute: "2-digit",
    });
  }, [data?.generatedAt]);

  return (
    <div className="page">
      <header className="page__header">
        <div>
          <h1>SocialFlux∞</h1>
          <p>Insights acionáveis gerados por IA para acelerar campanhas digitais.</p>
          {generatedAt ? <span className="page__timestamp">Atualizado em {generatedAt}</span> : null}
        </div>
        <div className="page__summary">
          {summary ? (
            <>
              <div>
                <span>Investimento total</span>
                <strong>{formatCurrency(summary.totalSpend)}</strong>
              </div>
              <div>
                <span>Receita consolidada</span>
                <strong>{formatCurrency(summary.totalRevenue)}</strong>
              </div>
              <div>
                <span>ROI médio</span>
                <strong>{formatPercent(summary.averageRoi, 1)}</strong>
              </div>
              <div>
                <span>Taxa de conversão média</span>
                <strong>{formatPercent(summary.averageConversionRate, 1)}</strong>
              </div>
            </>
          ) : (
            <span>Carregando métricas...</span>
          )}
        </div>
      </header>

      <main className="page__content">
        {loading && <p className="page__status">Carregando informações de campanha...</p>}
        {error && !loading ? <p className="page__status page__status--error">{error}</p> : null}
        {!loading && !error && campaigns.length === 0 ? (
          <p className="page__status">Nenhuma campanha cadastrada no momento.</p>
        ) : null}

        <div className="page__grid">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
