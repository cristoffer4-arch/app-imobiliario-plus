'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, Plus, Search, Filter, MapPin, Home, Bed, Bath,
  Square, TrendingUp, CheckCircle, XCircle, AlertCircle
} from 'lucide-react';
import { MOCK_IMOVEIS } from '@/lib/constants';
import { Imovel, ImovelStatus, ImovelTipo } from '@/lib/types';

export default function ImoveisPage() {
  const [imoveis, setImoveis] = useState<Imovel[]>(MOCK_IMOVEIS);
  const [filtroStatus, setFiltroStatus] = useState<ImovelStatus | 'todos'>('todos');
  const [filtroTipo, setFiltroTipo] = useState<ImovelTipo | 'todos'>('todos');
  const [busca, setBusca] = useState('');

  const imoveisFiltrados = imoveis.filter(imovel => {
    const matchStatus = filtroStatus === 'todos' || imovel.status === filtroStatus;
    const matchTipo = filtroTipo === 'todos' || imovel.tipo === filtroTipo;
    const matchBusca = imovel.titulo.toLowerCase().includes(busca.toLowerCase()) ||
                       imovel.localizacao.toLowerCase().includes(busca.toLowerCase());
    return matchStatus && matchTipo && matchBusca;
  });

  const statusConfig = {
    disponivel: { label: 'Disponível', color: 'bg-green-500', icon: CheckCircle },
    reservado: { label: 'Reservado', color: 'bg-yellow-500', icon: AlertCircle },
    vendido: { label: 'Vendido', color: 'bg-red-500', icon: XCircle },
  };

  const tipoConfig = {
    apartamento: { label: 'Apartamento', icon: Home },
    moradia: { label: 'Moradia', icon: Home },
    terreno: { label: 'Terreno', icon: Square },
    comercial: { label: 'Comercial', icon: TrendingUp },
  };

  const statusCounts = {
    disponivel: imoveis.filter(i => i.status === 'disponivel').length,
    reservado: imoveis.filter(i => i.status === 'reservado').length,
    vendido: imoveis.filter(i => i.status === 'vendido').length,
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
                  Gestão de Imóveis
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {imoveisFiltrados.length} imóveis no portfólio
                </p>
              </div>
            </div>

            <button className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Novo Imóvel
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Overview */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {Object.entries(statusConfig).map(([status, config]) => (
            <button
              key={status}
              onClick={() => setFiltroStatus(status as ImovelStatus)}
              className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border-2 transition-all hover:scale-105 ${
                filtroStatus === status
                  ? 'border-blue-500'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <config.icon className={`w-6 h-6 text-white ${config.color} p-1 rounded`} />
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  {statusCounts[status as ImovelStatus]}
                </span>
              </div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {config.label}
              </p>
            </button>
          ))}
        </div>

        {/* Busca e Filtros */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por título ou localização..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value as ImovelTipo | 'todos')}
              className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="todos">Todos os Tipos</option>
              {Object.entries(tipoConfig).map(([tipo, config]) => (
                <option key={tipo} value={tipo}>{config.label}</option>
              ))}
            </select>

            {(filtroStatus !== 'todos' || filtroTipo !== 'todos') && (
              <button
                onClick={() => {
                  setFiltroStatus('todos');
                  setFiltroTipo('todos');
                }}
                className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Limpar Filtros
              </button>
            )}
          </div>
        </div>

        {/* Grid de Imóveis */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {imoveisFiltrados.map(imovel => {
            const statusInfo = statusConfig[imovel.status];
            const tipoInfo = tipoConfig[imovel.tipo];
            
            return (
              <div
                key={imovel.id}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all cursor-pointer group"
              >
                {/* Imagem */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={imovel.imagens[0]}
                    alt={imovel.titulo}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`${statusInfo.color} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                      {statusInfo.label}
                    </span>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full">
                      {tipoInfo.label}
                    </span>
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
                    {imovel.titulo}
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span className="line-clamp-1">{imovel.localizacao}</span>
                  </div>

                  {/* Características */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Square className="w-4 h-4" />
                      <span>{imovel.area}m²</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Bed className="w-4 h-4" />
                      <span>{imovel.quartos}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Bath className="w-4 h-4" />
                      <span>{imovel.casas_banho}</span>
                    </div>
                  </div>

                  {/* Preço */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Preço</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {(imovel.preco / 1000).toFixed(0)}k€
                      </p>
                    </div>
                    <button className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all">
                      Ver Detalhes
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {imoveisFiltrados.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">Nenhum imóvel encontrado</p>
          </div>
        )}
      </main>
    </div>
  );
}
