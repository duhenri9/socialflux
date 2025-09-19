import type { CampaignInsight } from "../../shared/types";

export const campaigns: CampaignInsight[] = [
  {
    id: "cmp-aurora",
    name: "Lançamento Aurora Speaker",
    objective: "consideration",
    summary:
      "Campanha omnichannel focada em apresentar o assistente de áudio Aurora a públicos com interesse em automação residencial.",
    performance: {
      impressions: 185000,
      clicks: 18450,
      conversions: 2140,
      spend: 28500,
      revenue: 84500,
    },
    trend: [
      { date: "2025-02-01", impressions: 22000, clicks: 1680, conversions: 185 },
      { date: "2025-02-08", impressions: 25500, clicks: 2140, conversions: 230 },
      { date: "2025-02-15", impressions: 32000, clicks: 2750, conversions: 295 },
      { date: "2025-02-22", impressions: 41000, clicks: 3960, conversions: 420 },
      { date: "2025-03-01", impressions: 46800, clicks: 4910, conversions: 510 },
    ],
    audience: [
      {
        id: "tech-enthusiasts",
        name: "Entusiastas de tecnologia",
        description:
          "Consumidores que buscam gadgets premium e acompanham lançamentos de automação residencial.",
        share: 42,
        growth: 11,
      },
      {
        id: "young-professionals",
        name: "Profissionais jovens",
        description: "Executivos e freelancers que trabalham em casa e priorizam produtividade.",
        share: 33,
        growth: 7,
      },
    ],
    bestAsset: {
      id: "asset-aurora-video",
      name: "Vídeo com tour pelo apartamento inteligente",
      type: "video",
      performance: {
        clickThroughRate: 5.8,
        conversionRate: 1.9,
        costPerAcquisition: 13.3,
      },
    },
    recommendedActions: [
      {
        id: "aurora-lookalike",
        title: "Criar audiência semelhante com base em clientes recorrentes",
        description:
          "Utilize os dados de quem já adquiriu o Aurora Speaker para ampliar o alcance em públicos parecidos.",
        impact: "high",
      },
      {
        id: "aurora-story",
        title: "Testar sequência de stories com depoimentos",
        description:
          "Aproveite a boa performance dos vídeos para validar versões curtas em stories destacando reviews reais.",
        impact: "medium",
      },
    ],
  },
  {
    id: "cmp-fit",
    name: "SocialFlux Active - coleção fitness",
    objective: "conversion",
    summary:
      "Coleção de roupas fitness sustentáveis com foco em gerar assinaturas do clube de recorrência SocialFlux Active.",
    performance: {
      impressions: 96000,
      clicks: 12400,
      conversions: 1760,
      spend: 18250,
      revenue: 67200,
    },
    trend: [
      { date: "2025-02-01", impressions: 10800, clicks: 1280, conversions: 180 },
      { date: "2025-02-08", impressions: 14600, clicks: 1760, conversions: 220 },
      { date: "2025-02-15", impressions: 18450, clicks: 2375, conversions: 305 },
      { date: "2025-02-22", impressions: 23600, clicks: 3180, conversions: 420 },
      { date: "2025-03-01", impressions: 28550, clicks: 3805, conversions: 445 },
    ],
    audience: [
      {
        id: "urban-athletes",
        name: "Atletas urbanos",
        description:
          "Pessoas que conciliam rotina de escritório e treinos funcionais, buscando roupas resistentes.",
        share: 38,
        growth: 9,
      },
      {
        id: "wellness-creators",
        name: "Criadores de conteúdo wellness",
        description:
          "Influenciadores e micro criadores que produzem conteúdo sobre bem-estar e treinamentos em casa.",
        share: 27,
        growth: 6,
      },
    ],
    bestAsset: {
      id: "asset-fit-carousel",
      name: "Carrossel com variações de cores",
      type: "carousel",
      performance: {
        clickThroughRate: 6.4,
        conversionRate: 2.8,
        costPerAcquisition: 9.6,
      },
    },
    recommendedActions: [
      {
        id: "fit-bundle",
        title: "Criar bundle com acessórios inteligentes",
        description:
          "Combine as peças mais vendidas com garrafas térmicas conectadas para aumentar o ticket médio.",
        impact: "high",
      },
      {
        id: "fit-live",
        title: "Programar live shop quinzenal",
        description:
          "Use a base de creators cadastrados para co-criar lives demonstrando os tecidos sustentáveis.",
        impact: "medium",
      },
    ],
  },
  {
    id: "cmp-gem",
    name: "Consultoria IA - plano Gemini",
    objective: "awareness",
    summary:
      "Serviço de consultoria que combina Gemini e GPT-4 para otimizar funis de marketing com geração de relatórios automatizados.",
    performance: {
      impressions: 124500,
      clicks: 10890,
      conversions: 860,
      spend: 21600,
      revenue: 45200,
    },
    trend: [
      { date: "2025-02-01", impressions: 15400, clicks: 980, conversions: 70 },
      { date: "2025-02-08", impressions: 18850, clicks: 1260, conversions: 95 },
      { date: "2025-02-15", impressions: 22400, clicks: 1685, conversions: 130 },
      { date: "2025-02-22", impressions: 29600, clicks: 2420, conversions: 200 },
      { date: "2025-03-01", impressions: 40750, clicks: 4545, conversions: 365 },
    ],
    audience: [
      {
        id: "growth-leads",
        name: "Líderes de growth",
        description:
          "Diretores e heads de growth marketing em scale-ups buscando modelos de atribuição multicanal.",
        share: 46,
        growth: 12,
      },
      {
        id: "agency-owners",
        name: "Sócios de agências digitais",
        description:
          "Agências com portfólio enterprise que precisam de fluxos de criação de anúncios mais rápidos.",
        share: 29,
        growth: 8,
      },
    ],
    bestAsset: {
      id: "asset-gem-webinar",
      name: "Webinar com demonstração prática",
      type: "video",
      performance: {
        clickThroughRate: 4.4,
        conversionRate: 1.2,
        costPerAcquisition: 18.5,
      },
    },
    recommendedActions: [
      {
        id: "gem-case",
        title: "Produzir case detalhado com cliente enterprise",
        description:
          "Transforme os resultados da StonePay em um estudo de caso interativo para gerar leads qualificados.",
        impact: "high",
      },
      {
        id: "gem-personas",
        title: "Ativar campanhas dinâmicas por persona",
        description:
          "Crie variações automáticas com Gemini focadas em problemas específicos de cada segmento mapeado.",
        impact: "medium",
      },
    ],
  },
];
