import type { CampaignInsight } from "@shared/types";
import { formatCurrency, formatNumber, formatPercent, formatShortDate } from "../lib/format";

interface CampaignCardProps {
  campaign: CampaignInsight;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign }) => {
  const { performance } = campaign;
  const roi = performance.spend === 0 ? 0 : ((performance.revenue - performance.spend) / performance.spend) * 100;
  const conversionRate =
    performance.clicks === 0 ? 0 : (performance.conversions / performance.clicks) * 100;

  return (
    <article className="campaign-card">
      <header className="campaign-card__header">
        <div>
          <h3>{campaign.name}</h3>
          <span className={`campaign-card__objective campaign-card__objective--${campaign.objective}`}>
            {campaign.objective === "awareness" && "Reconhecimento"}
            {campaign.objective === "consideration" && "Consideração"}
            {campaign.objective === "conversion" && "Conversão"}
          </span>
        </div>
        <p className="campaign-card__summary">{campaign.summary}</p>
      </header>

      <section className="campaign-card__metrics">
        <div>
          <strong>Investimento</strong>
          <span>{formatCurrency(performance.spend)}</span>
        </div>
        <div>
          <strong>Receita</strong>
          <span>{formatCurrency(performance.revenue)}</span>
        </div>
        <div>
          <strong>ROI</strong>
          <span>{formatPercent(roi, 1)}</span>
        </div>
        <div>
          <strong>Conversões</strong>
          <span>{formatNumber(performance.conversions)}</span>
        </div>
        <div>
          <strong>Taxa de conversão</strong>
          <span>{formatPercent(conversionRate, 1)}</span>
        </div>
      </section>

      <section className="campaign-card__audience">
        <h4>Segmentos que mais respondem</h4>
        <ul>
          {campaign.audience.map((segment) => (
            <li key={segment.id}>
              <div>
                <strong>{segment.name}</strong>
                <p>{segment.description}</p>
              </div>
              <span>
                {formatPercent(segment.share, 0)} share • crescimento de {formatPercent(segment.growth, 0)}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="campaign-card__asset">
        <h4>Ativo com melhor performance</h4>
        <div className="campaign-card__asset-content">
          <div>
            <strong>{campaign.bestAsset.name}</strong>
            <span className="campaign-card__asset-tag">{campaign.bestAsset.type}</span>
          </div>
          <div className="campaign-card__asset-metrics">
            <span>CTR {formatPercent(campaign.bestAsset.performance.clickThroughRate, 1)}</span>
            <span>CR {formatPercent(campaign.bestAsset.performance.conversionRate, 1)}</span>
            <span>CPA {formatCurrency(campaign.bestAsset.performance.costPerAcquisition)}</span>
          </div>
        </div>
      </section>

      <section className="campaign-card__trend">
        <h4>Performance nas últimas semanas</h4>
        <ul>
          {campaign.trend.map((point) => (
            <li key={point.date}>
              <span>{formatShortDate(point.date)}</span>
              <span>{formatNumber(point.impressions)} imp</span>
              <span>{formatNumber(point.clicks)} cliques</span>
              <span>{formatNumber(point.conversions)} conv.</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="campaign-card__actions">
        <h4>Próximas ações recomendadas</h4>
        <ul>
          {campaign.recommendedActions.map((action) => (
            <li key={action.id}>
              <div>
                <strong>{action.title}</strong>
                <p>{action.description}</p>
              </div>
              <span className={`campaign-card__impact campaign-card__impact--${action.impact}`}>
                Impacto {action.impact === "high" ? "alto" : action.impact === "medium" ? "médio" : "baixo"}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
};

export default CampaignCard;
