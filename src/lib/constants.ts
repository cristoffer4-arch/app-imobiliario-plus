// Constantes e dados mock para Imobiliário GO Plus
import { Lead, Imovel, Badge, Desafio, UserStats, Notificacao, RelatorioMercado } from './types';

export const TAXA_IVA_RECIBOS_VERDES = 0.23; // 23% IVA em Portugal

export const LEAD_STATUS_CONFIG = {
  novo: { label: 'Novo', color: 'bg-blue-500', icon: 'UserPlus' },
  contactado: { label: 'Contactado', color: 'bg-purple-500', icon: 'Phone' },
  em_negociacao: { label: 'Em Negociação', color: 'bg-yellow-500', icon: 'MessageSquare' },
  visita_marcada: { label: 'Visita Marcada', color: 'bg-orange-500', icon: 'Calendar' },
  proposta: { label: 'Proposta', color: 'bg-indigo-500', icon: 'FileText' },
  fechado: { label: 'Fechado', color: 'bg-green-500', icon: 'CheckCircle' },
  perdido: { label: 'Perdido', color: 'bg-red-500', icon: 'XCircle' },
};

export const MOCK_LEADS: Lead[] = [
  {
    id: '1',
    nome: 'João Silva',
    email: 'joao.silva@email.pt',
    telefone: '+351 912 345 678',
    status: 'em_negociacao',
    origem: 'Website',
    valor_estimado: 250000,
    data_criacao: new Date('2024-01-15'),
    ultima_interacao: new Date('2024-01-20'),
    notas: [
      { id: 'n1', texto: 'Cliente interessado em apartamento T3 em Lisboa', data: new Date('2024-01-15'), tipo: 'texto', autor: 'Ana Costa' }
    ],
    pontuacao: 85,
    imovel_interesse: 'Apartamento T3 - Avenidas Novas'
  },
  {
    id: '2',
    nome: 'Maria Santos',
    email: 'maria.santos@email.pt',
    telefone: '+351 913 456 789',
    status: 'visita_marcada',
    origem: 'Referência',
    valor_estimado: 180000,
    data_criacao: new Date('2024-01-18'),
    ultima_interacao: new Date('2024-01-22'),
    notas: [
      { id: 'n2', texto: 'Visita agendada para 25/01 às 15h', data: new Date('2024-01-22'), tipo: 'texto', autor: 'Pedro Alves' }
    ],
    pontuacao: 92,
    imovel_interesse: 'Moradia V3 - Cascais'
  },
  {
    id: '3',
    nome: 'Carlos Pereira',
    email: 'carlos.pereira@email.pt',
    telefone: '+351 914 567 890',
    status: 'novo',
    origem: 'Facebook Ads',
    valor_estimado: 320000,
    data_criacao: new Date('2024-01-23'),
    ultima_interacao: new Date('2024-01-23'),
    notas: [],
    pontuacao: 65,
  },
];

export const MOCK_IMOVEIS: Imovel[] = [
  {
    id: '1',
    titulo: 'Apartamento T3 - Avenidas Novas',
    tipo: 'apartamento',
    status: 'disponivel',
    preco: 285000,
    localizacao: 'Lisboa, Avenidas Novas',
    area: 120,
    quartos: 3,
    casas_banho: 2,
    descricao: 'Apartamento moderno com varanda, próximo ao metro',
    imagens: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop'],
    data_adicao: new Date('2024-01-10'),
    proprietario: 'António Ferreira',
  },
  {
    id: '2',
    titulo: 'Moradia V3 - Cascais',
    tipo: 'moradia',
    status: 'disponivel',
    preco: 450000,
    localizacao: 'Cascais, Centro',
    area: 180,
    quartos: 3,
    casas_banho: 3,
    descricao: 'Moradia com jardim e garagem, perto da praia',
    imagens: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop'],
    data_adicao: new Date('2024-01-12'),
    proprietario: 'Sofia Rodrigues',
  },
  {
    id: '3',
    titulo: 'Apartamento T2 - Porto',
    tipo: 'apartamento',
    status: 'reservado',
    preco: 195000,
    localizacao: 'Porto, Boavista',
    area: 85,
    quartos: 2,
    casas_banho: 1,
    descricao: 'Apartamento renovado em zona premium',
    imagens: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop'],
    data_adicao: new Date('2024-01-14'),
    proprietario: 'Miguel Sousa',
  },
];

export const MOCK_BADGES: Badge[] = [
  { id: '1', nome: 'Primeiro Lead', descricao: 'Registou o seu primeiro lead', icone: 'Award', conquistado: true, data_conquista: new Date('2024-01-15') },
  { id: '2', nome: 'Vendedor Estrela', descricao: 'Fechou 5 vendas', icone: 'Star', conquistado: true, data_conquista: new Date('2024-01-20') },
  { id: '3', nome: 'Mestre da Negociação', descricao: 'Converteu 10 leads', icone: 'Trophy', conquistado: false },
  { id: '4', nome: 'Velocidade Máxima', descricao: 'Fechou uma venda em menos de 7 dias', icone: 'Zap', conquistado: false },
];

export const MOCK_DESAFIOS: Desafio[] = [
  {
    id: '1',
    titulo: 'Contactar 10 Leads',
    descricao: 'Entre em contacto com 10 leads esta semana',
    tipo: 'semanal',
    meta: 10,
    progresso: 6,
    pontos_recompensa: 150,
    expira_em: new Date('2024-01-28'),
  },
  {
    id: '2',
    titulo: 'Marcar 3 Visitas',
    descricao: 'Agende 3 visitas a imóveis hoje',
    tipo: 'diario',
    meta: 3,
    progresso: 1,
    pontos_recompensa: 50,
    expira_em: new Date('2024-01-24'),
  },
];

export const MOCK_USER_STATS: UserStats = {
  pontos_totais: 2450,
  nivel: 8,
  leads_convertidos: 12,
  imoveis_vendidos: 8,
  comissao_total: 24500,
  ranking_posicao: 3,
  badges: MOCK_BADGES,
};

export const MOCK_NOTIFICACOES: Notificacao[] = [
  {
    id: '1',
    tipo: 'lead',
    titulo: 'Novo Lead',
    mensagem: 'Carlos Pereira demonstrou interesse num imóvel',
    data: new Date('2024-01-23T10:30:00'),
    lida: false,
    prioridade: 'alta',
  },
  {
    id: '2',
    tipo: 'imovel',
    titulo: 'Imóvel Vendido',
    mensagem: 'Apartamento T2 - Porto foi marcado como vendido',
    data: new Date('2024-01-22T15:45:00'),
    lida: false,
    prioridade: 'media',
  },
  {
    id: '3',
    tipo: 'desafio',
    titulo: 'Desafio Quase Completo',
    mensagem: 'Faltam apenas 4 contactos para completar o desafio semanal',
    data: new Date('2024-01-23T09:00:00'),
    lida: true,
    prioridade: 'baixa',
  },
];

export const MOCK_RELATORIOS: RelatorioMercado[] = [
  {
    regiao: 'Lisboa',
    tipo_imovel: 'apartamento',
    preco_medio: 285000,
    preco_minimo: 180000,
    preco_maximo: 450000,
    tendencia: 'subida',
    volume_vendas: 142,
    tempo_medio_venda: 45,
  },
  {
    regiao: 'Porto',
    tipo_imovel: 'apartamento',
    preco_medio: 195000,
    preco_minimo: 120000,
    preco_maximo: 320000,
    tendencia: 'estavel',
    volume_vendas: 98,
    tempo_medio_venda: 52,
  },
];

export const PROFILE_FEATURES = {
  novo: {
    tutoriais: true,
    automacao_basica: true,
    relatorios_simples: true,
    limite_leads: 50,
  },
  intermediario: {
    tutoriais: false,
    automacao_avancada: true,
    relatorios_detalhados: true,
    limite_leads: 200,
  },
  premium: {
    tutoriais: false,
    automacao_completa: true,
    relatorios_ia: true,
    limite_leads: -1, // ilimitado
  },
};
