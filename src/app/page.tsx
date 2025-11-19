'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Home, Users, Building2, TrendingUp, Award, MessageSquare, 
  Bell, Settings, ChevronRight, Target, Zap, Trophy, Star,
  Calendar, DollarSign, BarChart3, FileText
} from 'lucide-react';
import ThemeSwitcher from '@/components/custom/theme-switcher';
import { MOCK_USER_STATS, MOCK_NOTIFICACOES, MOCK_DESAFIOS } from '@/lib/constants';

export default function Dashboard() {
  const [notificacoesVisiveis, setNotificacoesVisiveis] = useState(false);
  const stats = MOCK_USER_STATS;
  const notificacoes = MOCK_NOTIFICACOES.filter(n => !n.lida);
  const desafios = MOCK_DESAFIOS;

  const menuItems = [
    { icon: Users, label: 'Leads', href: '/leads', color: 'from-blue-500 to-cyan-500', count: 12 },
    { icon: Building2, label: 'Imóveis', href: '/imoveis', color: 'from-purple-500 to-pink-500', count: 8 },
    { icon: DollarSign, label: 'Comissões', href: '/comissoes', color: 'from-green-500 to-emerald-500', count: 5 },
    { icon: BarChart3, label: 'Relatórios', href: '#', color: 'from-orange-500 to-red-500', count: 3, disabled: true },
  ];

  const quickStats = [
    { label: 'Pontos', value: stats.pontos_totais.toLocaleString('pt-PT'), icon: Star, color: 'text-yellow-500' },
    { label: 'Nível', value: stats.nivel, icon: Trophy, color: 'text-purple-500' },
    { label: 'Ranking', value: `#${stats.ranking_posicao}`, icon: Target, color: 'text-blue-500' },
    { label: 'Vendas', value: stats.imoveis_vendidos, icon: Zap, color: 'text-green-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-xl">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Imobiliário GO Plus
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Bem-vindo de volta, Ana Costa
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <ThemeSwitcher />
              
              <button 
                onClick={() => setNotificacoesVisiveis(!notificacoesVisiveis)}
                className="relative p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Bell className="w-6 h-6" />
                {notificacoes.length > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {notificacoes.length}
                  </span>
                )}
              </button>

              <button className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Settings className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Notificações Dropdown */}
      {notificacoesVisiveis && (
        <div className="fixed top-20 right-4 w-96 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-y-auto">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white">Notificações</h3>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {notificacoes.map(notif => (
              <div key={notif.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    notif.prioridade === 'alta' ? 'bg-red-100 text-red-600' :
                    notif.prioridade === 'media' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    <Bell className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">{notif.titulo}</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{notif.mensagem}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(notif.data).toLocaleString('pt-PT')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {quickStats.map((stat, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                    {stat.value}
                  </p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Main Menu Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {menuItems.map((item, idx) => {
            const content = (
              <div className={`group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
                <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-4 ${!item.disabled && 'group-hover:scale-110'} transition-transform`}>
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {item.label}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {item.count} ativos
                  </span>
                  {!item.disabled && (
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 group-hover:translate-x-1 transition-all" />
                  )}
                </div>
              </div>
            );

            return item.disabled ? (
              <div key={idx}>{content}</div>
            ) : (
              <Link key={idx} href={item.href}>
                {content}
              </Link>
            );
          })}
        </div>

        {/* Desafios e Gamificação */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Desafios Ativos */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Target className="w-6 h-6 text-orange-500" />
                Desafios Ativos
              </h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {desafios.length} em progresso
              </span>
            </div>

            <div className="space-y-4">
              {desafios.map(desafio => (
                <div key={desafio.id} className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-700 dark:to-gray-700 rounded-xl p-4 border border-orange-200 dark:border-gray-600">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {desafio.titulo}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {desafio.descricao}
                      </p>
                    </div>
                    <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      +{desafio.pontos_recompensa}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Progresso</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {desafio.progresso}/{desafio.meta}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(desafio.progresso / desafio.meta) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Expira em {new Date(desafio.expira_em).toLocaleDateString('pt-PT')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Badges Conquistados */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Award className="w-6 h-6 text-purple-500" />
                Conquistas
              </h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {stats.badges.filter(b => b.conquistado).length}/{stats.badges.length}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {stats.badges.map(badge => (
                <div 
                  key={badge.id} 
                  className={`rounded-xl p-4 border-2 transition-all ${
                    badge.conquistado 
                      ? 'bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-300 dark:border-purple-700' 
                      : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 opacity-50'
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                      badge.conquistado 
                        ? 'bg-gradient-to-br from-purple-500 to-pink-500' 
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}>
                      <Trophy className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-sm text-gray-900 dark:text-white">
                      {badge.nome}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {badge.descricao}
                    </p>
                    {badge.conquistado && badge.data_conquista && (
                      <p className="text-xs text-purple-600 dark:text-purple-400 mt-2">
                        {new Date(badge.data_conquista).toLocaleDateString('pt-PT')}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
          <h2 className="text-2xl font-bold mb-4">Ações Rápidas</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/leads">
              <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl p-4 text-left transition-all">
                <Users className="w-6 h-6 mb-2" />
                <p className="font-semibold">Adicionar Lead</p>
              </button>
            </Link>
            <Link href="/imoveis">
              <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl p-4 text-left transition-all">
                <Building2 className="w-6 h-6 mb-2" />
                <p className="font-semibold">Registar Imóvel</p>
              </button>
            </Link>
            <Link href="/comissoes">
              <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl p-4 text-left transition-all">
                <DollarSign className="w-6 h-6 mb-2" />
                <p className="font-semibold">Calcular Comissão</p>
              </button>
            </Link>
            <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl p-4 text-left transition-all">
              <MessageSquare className="w-6 h-6 mb-2" />
              <p className="font-semibold">Assistente IA</p>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
