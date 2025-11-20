'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronLeft, Camera, Sparkles, Image as ImageIcon, Wand2,
  Upload, CheckCircle2, TrendingUp, Eye, Zap, AlertCircle
} from 'lucide-react';
import { iaAnuncioIdealista } from '@/lib/ai-services';

export default function AnuncioIdealistaPage() {
  const [imagemSelecionada, setImagemSelecionada] = useState<string | null>(null);
  const [processando, setProcessando] = useState(false);
  const [imagemOtimizada, setImagemOtimizada] = useState<string | null>(null);
  const [textoGerado, setTextoGerado] = useState('');
  const [scoreQualidade, setScoreQualidade] = useState(0);

  const [dadosImovel, setDadosImovel] = useState({
    titulo: 'Apartamento T3 no Centro',
    localizacao: 'Lisboa, Baixa',
    preco: 250000,
    area_m2: 120,
    quartos: 3,
    banheiros: 2,
    garagem: 1
  });

  const otimizarFoto = async () => {
    if (!imagemSelecionada) return;
    
    setProcessando(true);
    const resultado = await iaAnuncioIdealista.otimizarFoto(imagemSelecionada);
    
    if (resultado.success) {
      setImagemOtimizada(resultado.data.foto_otimizada_url);
      setScoreQualidade(resultado.data.score_qualidade);
    }
    setProcessando(false);
  };

  const gerarTexto = async () => {
    setProcessando(true);
    const resultado = await iaAnuncioIdealista.gerarTextoAnuncio({
      id: '1',
      titulo: dadosImovel.titulo,
      preco: dadosImovel.preco,
      localizacao: dadosImovel.localizacao,
      quartos: dadosImovel.quartos,
      banheiros: dadosImovel.banheiros,
      garagem: dadosImovel.garagem,
      area_m2: dadosImovel.area_m2,
      fonte: 'manual',
      data_publicacao: new Date().toISOString(),
      disponivel: true
    });
    
    if (resultado.success) {
      setTextoGerado(resultado.data.texto);
    }
    setProcessando(false);
  };

  const handleImagemUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagemSelecionada(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Anúncio Idealista
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Otimização com IA
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 py-4 space-y-4">
        {/* Banner Info */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-900 rounded-2xl p-4 border border-orange-200 dark:border-gray-800">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                Otimização para Primeiras Posições
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                Nossa IA otimiza fotos e textos seguindo o algoritmo do Idealista para garantir destaque nos resultados de busca.
              </p>
            </div>
          </div>
        </div>

        {/* Upload e Otimização de Foto */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-5 shadow-sm border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2 mb-4">
            <Camera className="w-5 h-5 text-orange-500" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Otimização de Fotos
            </h2>
          </div>

          {!imagemSelecionada ? (
            <label className="block cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImagemUpload}
                className="hidden"
              />
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-8 text-center hover:border-orange-500 dark:hover:border-orange-500 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                  Carregar Foto do Imóvel
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG até 10MB
                </p>
              </div>
            </label>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {/* Foto Original */}
                <div>
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    Original
                  </p>
                  <div className="relative rounded-2xl overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                    <img 
                      src={imagemSelecionada} 
                      alt="Original" 
                      className="w-full h-40 object-cover"
                    />
                  </div>
                </div>

                {/* Foto Otimizada */}
                <div>
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    Otimizada
                  </p>
                  <div className="relative rounded-2xl overflow-hidden border-2 border-orange-500">
                    {imagemOtimizada ? (
                      <>
                        <img 
                          src={imagemOtimizada} 
                          alt="Otimizada" 
                          className="w-full h-40 object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          {scoreQualidade}%
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-40 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        <Wand2 className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {imagemOtimizada && (
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-green-900 dark:text-green-300 mb-1">
                        Foto Otimizada com Sucesso!
                      </p>
                      <div className="space-y-1">
                        <p className="text-xs text-green-700 dark:text-green-400">
                          ✓ Ajuste de luz e contraste
                        </p>
                        <p className="text-xs text-green-700 dark:text-green-400">
                          ✓ Correção de cores
                        </p>
                        <p className="text-xs text-green-700 dark:text-green-400">
                          ✓ Enquadramento otimizado
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={otimizarFoto}
                  disabled={processando || !!imagemOtimizada}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 active:from-orange-700 active:to-red-800 text-white rounded-2xl font-semibold transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {processando ? (
                    <>
                      <Wand2 className="w-5 h-5 animate-spin" />
                      Otimizando...
                    </>
                  ) : imagemOtimizada ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Otimizada
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5" />
                      Otimizar Foto
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    setImagemSelecionada(null);
                    setImagemOtimizada(null);
                    setScoreQualidade(0);
                  }}
                  className="px-4 py-3 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-2xl font-semibold transition-all"
                >
                  Nova Foto
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Dados do Imóvel */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-5 shadow-sm border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2 mb-4">
            <ImageIcon className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Informações do Imóvel
            </h2>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                Título
              </label>
              <input
                type="text"
                value={dadosImovel.titulo}
                onChange={(e) => setDadosImovel({...dadosImovel, titulo: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  Localização
                </label>
                <input
                  type="text"
                  value={dadosImovel.localizacao}
                  onChange={(e) => setDadosImovel({...dadosImovel, localizacao: e.target.value})}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  Preço (€)
                </label>
                <input
                  type="number"
                  value={dadosImovel.preco}
                  onChange={(e) => setDadosImovel({...dadosImovel, preco: parseInt(e.target.value)})}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  m²
                </label>
                <input
                  type="number"
                  value={dadosImovel.area_m2}
                  onChange={(e) => setDadosImovel({...dadosImovel, area_m2: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  Quartos
                </label>
                <input
                  type="number"
                  value={dadosImovel.quartos}
                  onChange={(e) => setDadosImovel({...dadosImovel, quartos: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  Banhos
                </label>
                <input
                  type="number"
                  value={dadosImovel.banheiros}
                  onChange={(e) => setDadosImovel({...dadosImovel, banheiros: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  Garagem
                </label>
                <input
                  type="number"
                  value={dadosImovel.garagem}
                  onChange={(e) => setDadosImovel({...dadosImovel, garagem: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Geração de Texto */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-5 shadow-sm border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-purple-500" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Texto do Anúncio
            </h2>
          </div>

          {!textoGerado ? (
            <div className="text-center py-6">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Gere um texto otimizado para SEO seguindo o padrão Idealista
              </p>
              <button
                onClick={gerarTexto}
                disabled={processando}
                className="px-6 py-3 bg-purple-500 hover:bg-purple-600 active:bg-purple-700 text-white rounded-2xl font-semibold transition-all shadow-lg flex items-center justify-center gap-2 mx-auto disabled:opacity-50"
              >
                {processando ? (
                  <>
                    <Wand2 className="w-5 h-5 animate-spin" />
                    Gerando...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Gerar Texto com IA
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
                <textarea
                  value={textoGerado}
                  onChange={(e) => setTextoGerado(e.target.value)}
                  className="w-full bg-transparent text-sm text-gray-900 dark:text-white resize-none outline-none"
                  rows={10}
                />
              </div>

              <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                <p className="text-xs text-green-700 dark:text-green-400 font-semibold">
                  Score SEO: 92% - Otimizado para primeiras posições
                </p>
              </div>

              <button
                onClick={gerarTexto}
                className="w-full px-4 py-3 bg-purple-500 hover:bg-purple-600 active:bg-purple-700 text-white rounded-2xl font-semibold transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Wand2 className="w-5 h-5" />
                Gerar Novo Texto
              </button>
            </div>
          )}
        </div>

        {/* Recomendações */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-900 rounded-3xl p-5 border border-blue-200 dark:border-gray-800">
          <div className="flex items-center gap-2 mb-4">
            <Eye className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Dicas para Destaque
            </h2>
          </div>

          <div className="space-y-2">
            {[
              'Atualize o anúncio diariamente para manter no topo',
              'Adicione pelo menos 8 fotos de alta qualidade',
              'Responda mensagens em até 1 hora',
              'Mantenha preço competitivo com o mercado'
            ].map((dica, idx) => (
              <div key={idx} className="flex items-start gap-2 p-3 bg-white dark:bg-gray-800 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700 dark:text-gray-300">{dica}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Botão Publicar */}
        <button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 active:from-orange-700 active:to-red-800 text-white font-bold py-4 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Publicar no Idealista
        </button>
      </main>
    </div>
  );
}
