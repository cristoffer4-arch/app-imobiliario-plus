'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Plus, Search, Filter, Phone, Mail, MessageSquare,
  Calendar, TrendingUp, CheckCircle, XCircle, Clock, User
} from 'lucide-react';
import { MOCK_LEADS, LEAD_STATUS_CONFIG } from '@/lib/constants';
import { Lead, LeadStatus } from '@/lib/types';

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
  const [filtroStatus, setFiltroStatus] = useState<LeadStatus | 'todos'>('todos');
  const [busca, setBusca] = useState('');
  const [leadSelecionado, setLeadSelecionado] = useState<Lead | null>(null);

  const leadsFiltrados = leads.filter(lead => {
    const matchStatus = filtroStatus === 'todos' || lead.status === filtroStatus;
    const matchBusca = lead.nome.toLowerCase().includes(busca.toLowerCase()) ||
                       lead.email.toLowerCase().includes(busca.toLowerCase());
    return matchStatus && matchBusca;
  });

  const statusCounts = {
    novo: leads.filter(l => l.status === 'novo').length,
    contactado: leads.filter(l => l.status === 'contactado').length,
    em_negociacao: leads.filter(l => l.status === 'em_negociacao').length,
    visita_marcada: leads.filter(l => l.status === 'visita_marcada').length,
    proposta: leads.filter(l => l.status === 'proposta').length,
    fechado: leads.filter(l => l.status === 'fechado').length,
    perdido: leads.filter(l => l.status === 'perdido').length,
  };

  const handleStatusChange = (leadId: string, novoStatus: LeadStatus) => {
    setLeads(leads.map(lead => 
      lead.id === leadId 
        ? { ...lead, status: novoStatus, ultima_interacao: new Date() }
        : lead
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <ArrowLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                </button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Gestão de Leads
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {leadsFiltrados.length} leads ativos
                </p>
              </div>
            </div>

            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Novo Lead
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Funil Visual */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Funil de Vendas</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {Object.entries(LEAD_STATUS_CONFIG).map(([status, config]) => (
              <button
                key={status}
                onClick={() => setFiltroStatus(status as LeadStatus)}
                className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                  filtroStatus === status
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className={`w-10 h-10 ${config.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                  <span className="text-white font-bold text-lg">
                    {statusCounts[status as LeadStatus]}
                  </span>
                </div>
                <p className="text-xs font-medium text-gray-900 dark:text-white text-center">
                  {config.label}
                </p>
              </button>
            ))}
          </div>

          {filtroStatus !== 'todos' && (
            <button
              onClick={() => setFiltroStatus('todos')}
              className="mt-4 text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Ver todos os leads
            </button>
          )}
        </div>

        {/* Busca e Filtros */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nome ou email..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filtros
            </button>
          </div>
        </div>

        {/* Lista de Leads */}
        <div className="grid gap-4">
          {leadsFiltrados.map(lead => {
            const config = LEAD_STATUS_CONFIG[lead.status];
            return (
              <div
                key={lead.id}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all cursor-pointer"
                onClick={() => setLeadSelecionado(lead)}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Info Principal */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {lead.nome}
                        </h3>
                        <span className={`${config.color} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                          {config.label}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {lead.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {lead.telefone}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {new Date(lead.ultima_interacao).toLocaleDateString('pt-PT')}
                        </span>
                      </div>

                      {lead.imovel_interesse && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                          Interesse: {lead.imovel_interesse}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Métricas e Ações */}
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {lead.pontuacao}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Score</p>
                    </div>

                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {(lead.valor_estimado / 1000).toFixed(0)}k€
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Valor Est.</p>
                    </div>

                    <div className="flex gap-2">
                      <button className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                        <Phone className="w-5 h-5" />
                      </button>
                      <button className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors">
                        <MessageSquare className="w-5 h-5" />
                      </button>
                      <button className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors">
                        <Calendar className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Notas */}
                {lead.notas.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="font-medium">Última nota:</span> {lead.notas[lead.notas.length - 1].texto}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {leadsFiltrados.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">Nenhum lead encontrado</p>
          </div>
        )}
      </main>
    </div>
  );
}
