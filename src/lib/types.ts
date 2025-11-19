// Types para Imobiliário GO Plus

export type UserProfile = 'novo' | 'intermediario' | 'premium';
export type Theme = 'light' | 'dark' | 'accessibility';

export type LeadStatus = 
  | 'novo' 
  | 'contactado' 
  | 'em_negociacao' 
  | 'visita_marcada' 
  | 'proposta' 
  | 'fechado' 
  | 'perdido';

export type ImovelStatus = 'disponivel' | 'vendido' | 'reservado';
export type ImovelTipo = 'apartamento' | 'moradia' | 'terreno' | 'comercial';

export interface Lead {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  status: LeadStatus;
  origem: string;
  valor_estimado: number;
  data_criacao: Date;
  ultima_interacao: Date;
  notas: Nota[];
  pontuacao: number;
  imovel_interesse?: string;
}

export interface Nota {
  id: string;
  texto: string;
  data: Date;
  tipo: 'texto' | 'voz';
  autor: string;
}

export interface Imovel {
  id: string;
  titulo: string;
  tipo: ImovelTipo;
  status: ImovelStatus;
  preco: number;
  localizacao: string;
  area: number;
  quartos: number;
  casas_banho: number;
  descricao: string;
  imagens: string[];
  data_adicao: Date;
  proprietario: string;
  duplicado?: boolean;
}

export interface Comissao {
  id: string;
  lead_id: string;
  imovel_id: string;
  valor_venda: number;
  percentual_comissao: number;
  valor_bruto: number;
  taxa_iva: number;
  valor_iva: number;
  valor_liquido: number;
  data_fechamento: Date;
  consultor: string;
  status: 'pendente' | 'pago' | 'cancelado';
}

export interface Badge {
  id: string;
  nome: string;
  descricao: string;
  icone: string;
  conquistado: boolean;
  data_conquista?: Date;
}

export interface Desafio {
  id: string;
  titulo: string;
  descricao: string;
  tipo: 'diario' | 'semanal' | 'mensal';
  meta: number;
  progresso: number;
  pontos_recompensa: number;
  expira_em: Date;
}

export interface UserStats {
  pontos_totais: number;
  nivel: number;
  leads_convertidos: number;
  imoveis_vendidos: number;
  comissao_total: number;
  ranking_posicao: number;
  badges: Badge[];
}

export interface Notificacao {
  id: string;
  tipo: 'lead' | 'imovel' | 'comissao' | 'desafio' | 'sistema';
  titulo: string;
  mensagem: string;
  data: Date;
  lida: boolean;
  prioridade: 'baixa' | 'media' | 'alta';
}

export interface RelatorioMercado {
  regiao: string;
  tipo_imovel: ImovelTipo;
  preco_medio: number;
  preco_minimo: number;
  preco_maximo: number;
  tendencia: 'subida' | 'descida' | 'estavel';
  volume_vendas: number;
  tempo_medio_venda: number;
}
