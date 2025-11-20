'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Building2, Plus, Search, MapPin, DollarSign, Maximize, Bed, 
  Bath, Car, Eye, Edit, ChevronLeft, Loader2, Navigation,
  Filter, X, SlidersHorizontal, Globe, AlertCircle
} from 'lucide-react';

// Dados mockados para demonstração
const IMOVEIS_MOCK = [
  {
    id: '1',
    titulo: 'Apartamento T3 no Centro',
    tipo: 'apartamento',
    preco: 250000,
    area_m2: 120,
    quartos: 3,
    banheiros: 2,
    vagas_garagem: 1,
    endereco: 'Rua das Flores, 123',
    cidade: 'Lisboa',
    bairro: 'Baixa',
    fonte: 'OLX',
    lat: 38.7223,
    lng: -9.1393,
    distancia_km: 2.5,
    data_publicacao: '2024-01-15',
    fotos: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop']
  },
  {
    id: '2',
    titulo: 'Moradia V4 com Jardim',
    tipo: 'casa',
    preco: 450000,
    area_m2: 250,
    quartos: 4,
    banheiros: 3,
    vagas_garagem: 2,
    endereco: 'Av. Principal, 456',
    cidade: 'Porto',
    bairro: 'Boavista',
    fonte: 'Facebook Marketplace',
    lat: 41.1579,
    lng: -8.6291,
    distancia_km: 5.8,
    data_publicacao: '2024-01-14',
    fotos: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop']
  },
  {
    id: '3',
    titulo: 'Apartamento T2 Renovado',
    tipo: 'apartamento',
    preco: 180000,
    area_m2: 85,
    quartos: 2,
    banheiros: 1,
    vagas_garagem: 1,
    endereco: 'Rua Nova, 789',
    cidade: 'Lisboa',
    bairro: 'Alvalade',
    fonte: 'Idealista',
    lat: 38.7436,
    lng: -9.1480,
    distancia_km: 1.2,
    data_publicacao: '2024-01-16',
    fotos: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop']
  },
  {
    id: '4',
    titulo: 'Loja Comercial Centro',
    tipo: 'comercial',
    preco: 320000,
    area_m2: 150,
    endereco: 'Praça do Comércio, 12',
    cidade: 'Lisboa',
    bairro: 'Baixa',
    fonte: 'Google',
    lat: 38.7077,
    lng: -9.1365,
    distancia_km: 0.8,
    data_publicacao: '2024-01-13',
    fotos: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop']
  }
];

const CIDADES_PORTUGAL = [
  'Lisboa', 'Porto', 'Braga', 'Coimbra', 'Faro', 'Aveiro', 
  'Setúbal', 'Funchal', 'Évora', 'Viseu', 'Leiria', 'Guimarães'
];

export default function ImoveisPage() {
  const [buscaAtiva, setBuscaAtiva] = useState(false);
  const [usarGeolocalizacao, setUsarGeolocalizacao] = useState(false);
  const [localizacaoAtual, setLocalizacaoAtual] = useState<{lat: number, lng: number} | null>(null);
  const [carregandoLocalizacao, setCarregandoLocalizacao] = useState(false);
  const [erroLocalizacao, setErroLocalizacao] = useState('');
  
  // Filtros de busca
  const [cidadeSelecionada, setCidadeSelecionada] = useState('');
  const [bairro, setBairro] = useState('');
  const [precoMin, setPrecoMin] = useState('');
  const [precoMax, setPrecoMax] = useState('');
  const [raioKm, setRaioKm] = useState('10');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  
  // Novos filtros
  const [quartosMin, setQuartosMin] = useState('');
  const [banheirosMin, setBanheirosMin] = useState('');
  const [vagasGaragemMin, setVagasGaragemMin] = useState('');
  const [areaMin, setAreaMin] = useState('');
  
  // Resultados
  const [imoveis, setImoveis] = useState(IMOVEIS_MOCK);
  const [carregandoBusca, setCarregandoBusca] = useState(false);

  // Solicitar geolocalização
  const solicitarGeolocalizacao = () => {
    setCarregandoLocalizacao(true);
    setErroLocalizacao('');
    
    if (!navigator.geolocation) {
      setErroLocalizacao('Geolocalização não suportada pelo navegador');
      setCarregandoLocalizacao(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocalizacaoAtual({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setUsarGeolocalizacao(true);
        setCarregandoLocalizacao(false);
        // Simular busca automática
        realizarBusca(true, position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        setErroLocalizacao('Não foi possível obter sua localização. Verifique as permissões.');
        setCarregandoLocalizacao(false);
      }
    );
  };

  // Realizar busca (simulada com IA)
  const realizarBusca = (porGeo = false, lat?: number, lng?: number) => {
    setCarregandoBusca(true);
    setBuscaAtiva(true);

    // Simular chamada à IA que busca em todos os portais
    setTimeout(() => {
      let resultados = [...IMOVEIS_MOCK];

      // Filtrar por cidade/bairro
      if (cidadeSelecionada) {
        resultados = resultados.filter(i => 
          i.cidade.toLowerCase() === cidadeSelecionada.toLowerCase()
        );
      }

      if (bairro) {
        resultados = resultados.filter(i => 
          i.bairro?.toLowerCase().includes(bairro.toLowerCase())
        );
      }

      // Filtrar por preço
      if (precoMin) {
        resultados = resultados.filter(i => i.preco >= parseInt(precoMin));
      }
      if (precoMax) {
        resultados = resultados.filter(i => i.preco <= parseInt(precoMax));
      }

      // Filtrar por quartos
      if (quartosMin) {
        resultados = resultados.filter(i => i.quartos && i.quartos >= parseInt(quartosMin));
      }

      // Filtrar por banheiros
      if (banheirosMin) {
        resultados = resultados.filter(i => i.banheiros && i.banheiros >= parseInt(banheirosMin));
      }

      // Filtrar por vagas de garagem
      if (vagasGaragemMin) {
        resultados = resultados.filter(i => i.vagas_garagem && i.vagas_garagem >= parseInt(vagasGaragemMin));
      }

      // Filtrar por área
      if (areaMin) {
        resultados = resultados.filter(i => i.area_m2 && i.area_m2 >= parseInt(areaMin));
      }

      // Filtrar por raio (se geolocalização ativa)
      if (porGeo && lat && lng) {
        const raio = parseInt(raioKm);
        resultados = resultados.filter(i => i.distancia_km && i.distancia_km <= raio);
      }

      // Ordenar por data de publicação (mais recente primeiro)
      resultados.sort((a, b) => 
        new Date(b.data_publicacao).getTime() - new Date(a.data_publicacao).getTime()
      );

      setImoveis(resultados);
      setCarregandoBusca(false);
    }, 1500);
  };

  const limparFiltros = () => {
    setCidadeSelecionada('');
    setBairro('');
    setPrecoMin('');
    setPrecoMax('');
    setRaioKm('10');
    setQuartosMin('');
    setBanheirosMin('');
    setVagasGaragemMin('');
    setAreaMin('');
    setUsarGeolocalizacao(false);
    setLocalizacaoAtual(null);
    setBuscaAtiva(false);
    setImoveis(IMOVEIS_MOCK);
  };

  const getFonteColor = (fonte: string) => {
    switch (fonte.toLowerCase()) {
      case 'olx': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      case 'facebook marketplace': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'idealista': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'google': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'casafari': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black pb-20">
      {/* iOS Status Bar Spacer */}
      <div className="h-11 bg-white dark:bg-gray-900"></div>

      {/* Header iOS Style */}
      <header className="bg-white dark:bg-gray-900 sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Link href="/">
                <button className="w-9 h-9 flex items-center justify-center active:bg-gray-100 dark:active:bg-gray-800 rounded-full transition-colors">
                  <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                    Buscar Imóveis
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    IA + Múltiplos Portais
                  </p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setMostrarFiltros(!mostrarFiltros)}
              className="px-3 py-2 bg-purple-500 active:bg-purple-600 text-white rounded-xl transition-colors flex items-center gap-1.5 shadow-lg"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="text-sm font-semibold">Filtros</span>
            </button>
          </div>
        </div>
      </header>

      <main className="px-4 py-4 space-y-4">
        {/* Painel de Busca */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-5 shadow-sm border border-gray-200 dark:border-gray-800 space-y-4">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-5 h-5 text-purple-500" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Busca Inteligente
            </h2>
          </div>

          {/* Opção de Geolocalização */}
          <div className="space-y-3">
            <button
              onClick={solicitarGeolocalizacao}
              disabled={carregandoLocalizacao}
              className="w-full px-4 py-3.5 bg-gradient-to-r from-blue-500 to-purple-600 active:from-blue-600 active:to-purple-700 text-white rounded-2xl transition-all flex items-center justify-center gap-2 font-semibold shadow-lg disabled:opacity-50"
            >
              {carregandoLocalizacao ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Obtendo localização...
                </>
              ) : usarGeolocalizacao && localizacaoAtual ? (
                <>
                  <Navigation className="w-5 h-5" />
                  Localização Ativada
                </>
              ) : (
                <>
                  <Navigation className="w-5 h-5" />
                  Usar Minha Localização
                </>
              )}
            </button>

            {erroLocalizacao && (
              <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700 dark:text-red-300">{erroLocalizacao}</p>
              </div>
            )}

            {usarGeolocalizacao && localizacaoAtual && (
              <div className="p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span className="text-sm font-medium text-green-700 dark:text-green-300">
                      Buscando na sua região
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setUsarGeolocalizacao(false);
                      setLocalizacaoAtual(null);
                    }}
                    className="text-green-600 dark:text-green-400"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="mt-2 space-y-1">
                  <label className="text-xs text-gray-600 dark:text-gray-400">Raio de busca</label>
                  <select
                    value={raioKm}
                    onChange={(e) => setRaioKm(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white"
                  >
                    <option value="5">5 km</option>
                    <option value="10">10 km</option>
                    <option value="20">20 km</option>
                    <option value="50">50 km</option>
                  </select>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <div className="h-px flex-1 bg-gray-300 dark:bg-gray-700"></div>
              <span>ou</span>
              <div className="h-px flex-1 bg-gray-300 dark:bg-gray-700"></div>
            </div>
          </div>

          {/* Busca por Cidade/Bairro */}
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cidade
              </label>
              <select
                value={cidadeSelecionada}
                onChange={(e) => setCidadeSelecionada(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white"
              >
                <option value="">Selecione uma cidade</option>
                {CIDADES_PORTUGAL.map(cidade => (
                  <option key={cidade} value={cidade}>{cidade}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Bairro (opcional)
              </label>
              <input
                type="text"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                placeholder="Ex: Baixa, Boavista..."
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-500"
              />
            </div>
          </div>

          {/* Filtros Avançados */}
          {mostrarFiltros && (
            <div className="space-y-3 pt-3 border-t border-gray-200 dark:border-gray-800 animate-in slide-in-from-top">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filtros Avançados
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                    Preço Mínimo (€)
                  </label>
                  <input
                    type="number"
                    value={precoMin}
                    onChange={(e) => setPrecoMin(e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                    Preço Máximo (€)
                  </label>
                  <input
                    type="number"
                    value={precoMax}
                    onChange={(e) => setPrecoMax(e.target.value)}
                    placeholder="Sem limite"
                    className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1 flex items-center gap-1">
                    <Bed className="w-3 h-3" />
                    Quartos (mín)
                  </label>
                  <input
                    type="number"
                    value={quartosMin}
                    onChange={(e) => setQuartosMin(e.target.value)}
                    placeholder="0"
                    min="0"
                    className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1 flex items-center gap-1">
                    <Bath className="w-3 h-3" />
                    Casas de Banho (mín)
                  </label>
                  <input
                    type="number"
                    value={banheirosMin}
                    onChange={(e) => setBanheirosMin(e.target.value)}
                    placeholder="0"
                    min="0"
                    className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1 flex items-center gap-1">
                    <Car className="w-3 h-3" />
                    Garagem (mín)
                  </label>
                  <input
                    type="number"
                    value={vagasGaragemMin}
                    onChange={(e) => setVagasGaragemMin(e.target.value)}
                    placeholder="0"
                    min="0"
                    className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1 flex items-center gap-1">
                    <Maximize className="w-3 h-3" />
                    Área Mín (m²)
                  </label>
                  <input
                    type="number"
                    value={areaMin}
                    onChange={(e) => setAreaMin(e.target.value)}
                    placeholder="0"
                    min="0"
                    className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Botões de Ação */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={() => realizarBusca(usarGeolocalizacao, localizacaoAtual?.lat, localizacaoAtual?.lng)}
              disabled={carregandoBusca || (!usarGeolocalizacao && !cidadeSelecionada)}
              className="flex-1 px-4 py-3.5 bg-gradient-to-r from-purple-500 to-pink-600 active:from-purple-600 active:to-pink-700 text-white rounded-2xl transition-all flex items-center justify-center gap-2 font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {carregandoBusca ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Buscando...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Buscar Imóveis
                </>
              )}
            </button>

            {buscaAtiva && (
              <button
                onClick={limparFiltros}
                className="px-4 py-3.5 bg-gray-200 dark:bg-gray-800 active:bg-gray-300 dark:active:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-2xl transition-all flex items-center justify-center gap-2 font-semibold"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Informação sobre Fontes */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-900 rounded-2xl p-4 border border-blue-200 dark:border-gray-800">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                Busca em Múltiplos Portais
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                Nossa IA busca automaticamente em: <span className="font-semibold">OLX, Facebook Marketplace, Idealista, Google, Casafari, BPI Expresso Imobiliário, Casa Sapo, Imovirtual</span> e outros portais disponíveis. Ordenado por data de publicação mais recente.
              </p>
            </div>
          </div>
        </div>

        {/* Resultados */}
        {buscaAtiva && (
          <div className="space-y-3">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {imoveis.length} {imoveis.length === 1 ? 'Imóvel Encontrado' : 'Imóveis Encontrados'}
              </h3>
              {usarGeolocalizacao && (
                <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  Ordenado por distância
                </span>
              )}
            </div>

            {imoveis.map((imovel) => (
              <div key={imovel.id} className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden active:scale-98 transition-transform">
                {/* Imagem */}
                <div className="relative h-48 bg-gray-200 dark:bg-gray-800">
                  {imovel.fotos[0] && (
                    <img 
                      src={imovel.fotos[0]} 
                      alt={imovel.titulo}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getFonteColor(imovel.fonte)}`}>
                      {imovel.fonte}
                    </span>
                    {usarGeolocalizacao && imovel.distancia_km && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                        {imovel.distancia_km} km
                      </span>
                    )}
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="p-4">
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">
                    {imovel.titulo}
                  </h3>

                  <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <MapPin className="w-4 h-4" />
                    <span className="text-xs">{imovel.bairro}, {imovel.cidade}</span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl font-bold text-purple-600 dark:text-purple-400">
                      €{imovel.preco?.toLocaleString('pt-PT')}
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-2 mb-3 text-xs">
                    {imovel.area_m2 && (
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                        <Maximize className="w-3.5 h-3.5" />
                        <span>{imovel.area_m2}m²</span>
                      </div>
                    )}
                    {imovel.quartos && (
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                        <Bed className="w-3.5 h-3.5" />
                        <span>{imovel.quartos}</span>
                      </div>
                    )}
                    {imovel.banheiros && (
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                        <Bath className="w-3.5 h-3.5" />
                        <span>{imovel.banheiros}</span>
                      </div>
                    )}
                    {imovel.vagas_garagem && (
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                        <Car className="w-3.5 h-3.5" />
                        <span>{imovel.vagas_garagem}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="flex-1 px-3 py-2.5 bg-purple-500 active:bg-purple-600 text-white rounded-xl transition-colors flex items-center justify-center gap-2 text-sm font-semibold shadow-lg">
                      <Eye className="w-4 h-4" />
                      Ver Detalhes
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center border border-gray-300 dark:border-gray-700 active:bg-gray-100 dark:active:bg-gray-800 rounded-xl transition-colors">
                      <Edit className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {imoveis.length === 0 && (
              <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800">
                <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Nenhum imóvel encontrado
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Tente ajustar os filtros ou ampliar o raio de busca
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Floating Action Button iOS Style */}
      <Link href="/imoveis/novo">
        <button className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full shadow-2xl flex items-center justify-center active:scale-95 transition-transform z-50">
          <Plus className="w-7 h-7 text-white" />
        </button>
      </Link>
    </div>
  );
}
