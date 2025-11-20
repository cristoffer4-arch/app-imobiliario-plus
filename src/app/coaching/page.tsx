'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ChevronLeft, Brain, Target, TrendingUp, Award, Calendar,
  CheckCircle2, Zap, Users, BarChart3, Sparkles, Trophy,
  MessageSquare, BookOpen, Lightbulb, Star
} from 'lucide-react';
import { sistemaCentralIA } from '@/lib/ai-services';

export default function CoachingPage() {
  const [metaAnual, setMetaAnual] = useState(100000);
  const [metaAtual, setMetaAtual] = useState(45000);
  const [planoAtivo, setPlanoAtivo] = useState(false);
  const [atividadesDia, setAtividadesDia] = useState<any[]>([]);
  const [perfilDISC, setPerfilDISC] = useState<string | null>(null);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    const iaCoaching = sistemaCentralIA.getIA('coaching');
    const atividades = await iaCoaching.gerarAtividadesDiarias();
    if (atividades.success) {
      setAtividadesDia(atividades.data.atividades);
    }
  };

  const criarPlano = async () => {
    const iaCoaching = sistemaCentralIA.getIA('coaching');
    const resultado = await iaCoaching.criarPlanoDesenvolvimento({
      objetivo: 'crescimento',
      meta_anual: metaAnual,
      meta_atual: metaAtual,
      nivel_experiencia: 'intermediario'
    });
    
    if (resultado.success) {
      setPlanoAtivo(true);
    }
  };

  const percentualMeta = (metaAtual / metaAnual) * 100;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black pb-20">
      <div className="h-11 bg-white dark:bg-gray-900"></div>

      {/* Header */}
      <header className="bg-white dark:bg-gray-900 sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <Link href="/">
              <button className="w-9 h-9 flex items-center justify-center active:bg-gray-100 dark:active:bg-gray-800 rounded-full transition-colors">
                <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  IA Coaching
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Seu Coach Executivo Pessoal
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 py-4 space-y-4">
        {/* Banner Principal */}
        <div className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 rounded-3xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Meta Anual</h2>
                <p className="text-white/90 text-sm">€0 → €100.000</p>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-white text-sm">
                <span>Progresso</span>
                <span className="font-bold">€{metaAtual.toLocaleString('pt-PT')} / €{metaAnual.toLocaleString('pt-PT')}</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div 
                  className="bg-white h-3 rounded-full transition-all duration-500"
                  style={{ width: `${percentualMeta}%` }}
                />
              </div>
              <p className="text-white/90 text-xs text-right">
                {percentualMeta.toFixed(1)}% concluído
              </p>
            </div>

            {!planoAtivo ? (
              <button 
                onClick={criarPlano}
                className="w-full bg-white hover:bg-gray-100 active:bg-gray-200 text-orange-600 font-bold py-3 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Criar Plano de Desenvolvimento
              </button>
            ) : (
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-white" />
                <span className="text-white text-sm font-semibold">Plano Ativo</span>
              </div>
            )}
          </div>
        </div>

        {/* Atividades do Dia */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-5 shadow-sm border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-orange-500" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Atividades de Hoje
            </h2>
          </div>

          <div className="space-y-3">
            {atividadesDia.map((atividade, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                      {atividade.hora}
                    </span>
                    <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 px-2 py-0.5 rounded-full font-semibold">
                      +{atividade.pontos} pts
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {atividade.atividade}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Estratégias */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-5 shadow-sm border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Estratégias Recomendadas
            </h2>
          </div>

          <div className="space-y-2">
            {[
              'Prospecção ativa diária de 10 novos leads',
              'Follow-up estruturado com clientes existentes',
              'Networking em eventos do setor',
              'Presença digital otimizada (redes sociais)'
            ].map((estrategia, idx) => (
              <div key={idx} className="flex items-start gap-2 p-3 bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-800 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700 dark:text-gray-300">{estrategia}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Métricas de Performance */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-5 shadow-sm border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Métricas Diárias
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Ligações/dia', valor: '20', icon: '📞' },
              { label: 'Visitas/semana', valor: '5', icon: '🏠' },
              { label: 'Propostas/mês', valor: '8', icon: '📄' },
              { label: 'Fechamentos/mês', valor: '2', icon: '✅' }
            ].map((metrica, idx) => (
              <div key={idx} className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl">
                <div className="text-2xl mb-2">{metrica.icon}</div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {metrica.valor}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {metrica.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Análise DISC */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-900 rounded-3xl p-5 border border-purple-200 dark:border-gray-800">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-purple-500" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Análise DISC
            </h2>
          </div>

          {!perfilDISC ? (
            <div className="text-center py-6">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Descubra seu perfil comportamental e aprenda a se comunicar melhor com seus clientes
              </p>
              <button 
                onClick={() => setPerfilDISC('D - Dominância')}
                className="px-6 py-3 bg-purple-500 hover:bg-purple-600 active:bg-purple-700 text-white rounded-2xl font-semibold transition-all shadow-lg"
              >
                Fazer Análise DISC
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl">
                <p className="text-sm font-semibold text-purple-600 dark:text-purple-400 mb-2">
                  Seu Perfil: {perfilDISC}
                </p>
                <div className="space-y-1">
                  {['Direto', 'Orientado a resultados', 'Decisivo'].map((carac, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <Star className="w-4 h-4 text-yellow-500" />
                      {carac}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Técnicas PNL */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-5 shadow-sm border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-green-500" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Técnicas de PNL
            </h2>
          </div>

          <div className="space-y-2">
            {[
              { titulo: 'Rapport e Espelhamento', descricao: 'Crie conexão instantânea com clientes' },
              { titulo: 'Ancoragem Positiva', descricao: 'Associe emoções positivas ao processo' },
              { titulo: 'Reframing de Objeções', descricao: 'Transforme objeções em oportunidades' }
            ].map((tecnica, idx) => (
              <div key={idx} className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                  {tecnica.titulo}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {tecnica.descricao}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Sessão de Coaching */}
        <button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 active:from-orange-700 active:to-red-800 text-white font-bold py-4 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Iniciar Sessão de Coaching
        </button>
      </main>
    </div>
  );
}
