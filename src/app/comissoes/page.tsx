'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Calculator, DollarSign, TrendingUp, FileText,
  Download, Eye, CheckCircle
} from 'lucide-react';
import { TAXA_IVA_RECIBOS_VERDES } from '@/lib/constants';

export default function ComissoesPage() {
  const [valorVenda, setValorVenda] = useState<string>('');
  const [percentualComissao, setPercentualComissao] = useState<string>('3');
  const [tipoNegocio, setTipoNegocio] = useState<'venda' | 'arrendamento'>('venda');
  
  const valorVendaNum = parseFloat(valorVenda) || 0;
  const percentualNum = parseFloat(percentualComissao) || 0;
  
  const valorBruto = valorVendaNum * (percentualNum / 100);
  const valorIVA = valorBruto * TAXA_IVA_RECIBOS_VERDES;
  const valorLiquido = valorBruto - valorIVA;

  const comissoesHistorico = [
    {
      id: '1',
      cliente: 'João Silva',
      imovel: 'Apartamento T3 - Lisboa',
      valor_venda: 285000,
      comissao_bruta: 8550,
      comissao_liquida: 6583.50,
      data: new Date('2024-01-20'),
      status: 'pago'
    },
    {
      id: '2',
      cliente: 'Maria Santos',
      imovel: 'Moradia V3 - Cascais',
      valor_venda: 450000,
      comissao_bruta: 13500,
      comissao_liquida: 10395,
      data: new Date('2024-01-18'),
      status: 'pago'
    },
    {
      id: '3',
      cliente: 'Carlos Pereira',
      imovel: 'Apartamento T2 - Porto',
      valor_venda: 195000,
      comissao_bruta: 5850,
      comissao_liquida: 4504.50,
      data: new Date('2024-01-15'),
      status: 'pendente'
    },
  ];

  const totalComissoesBrutas = comissoesHistorico.reduce((acc, c) => acc + c.comissao_bruta, 0);
  const totalComissoesLiquidas = comissoesHistorico.reduce((acc, c) => acc + c.comissao_liquida, 0);

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
                  Gestão de Comissões
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Cálculo automático com IVA (Recibos Verdes)
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Resumo Financeiro */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-8 h-8" />
              <TrendingUp className="w-6 h-6 opacity-70" />
            </div>
            <p className="text-sm opacity-90 mb-1">Total Bruto</p>
            <p className="text-3xl font-bold">
              {totalComissoesBrutas.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}€
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8" />
              <TrendingUp className="w-6 h-6 opacity-70" />
            </div>
            <p className="text-sm opacity-90 mb-1">Total Líquido</p>
            <p className="text-3xl font-bold">
              {totalComissoesLiquidas.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}€
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <FileText className="w-8 h-8" />
              <TrendingUp className="w-6 h-6 opacity-70" />
            </div>
            <p className="text-sm opacity-90 mb-1">Comissões Pagas</p>
            <p className="text-3xl font-bold">
              {comissoesHistorico.filter(c => c.status === 'pago').length}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculadora */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Calculadora de Comissões
              </h2>
            </div>

            <div className="space-y-6">
              {/* Tipo de Negócio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tipo de Negócio
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setTipoNegocio('venda')}
                    className={`p-3 rounded-xl border-2 font-medium transition-all ${
                      tipoNegocio === 'venda'
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                        : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    Venda
                  </button>
                  <button
                    onClick={() => setTipoNegocio('arrendamento')}
                    className={`p-3 rounded-xl border-2 font-medium transition-all ${
                      tipoNegocio === 'arrendamento'
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                        : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    Arrendamento
                  </button>
                </div>
              </div>

              {/* Valor da Venda */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Valor da {tipoNegocio === 'venda' ? 'Venda' : 'Renda Anual'} (€)
                </label>
                <input
                  type="number"
                  value={valorVenda}
                  onChange={(e) => setValorVenda(e.target.value)}
                  placeholder="Ex: 250000"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Percentual de Comissão */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Percentual de Comissão (%)
                </label>
                <input
                  type="number"
                  value={percentualComissao}
                  onChange={(e) => setPercentualComissao(e.target.value)}
                  placeholder="Ex: 3"
                  step="0.1"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Resultados */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border-2 border-green-200 dark:border-green-800">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Cálculo Detalhado
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Comissão Bruta
                    </span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {valorBruto.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}€
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      IVA ({(TAXA_IVA_RECIBOS_VERDES * 100).toFixed(0)}%)
                    </span>
                    <span className="text-lg font-semibold text-red-600 dark:text-red-400">
                      -{valorIVA.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}€
                    </span>
                  </div>

                  <div className="pt-3 border-t-2 border-green-300 dark:border-green-700">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Valor Líquido
                      </span>
                      <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {valorLiquido.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}€
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                <FileText className="w-5 h-5" />
                Gerar Recibo Verde
              </button>
            </div>
          </div>

          {/* Histórico */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Histórico de Comissões
            </h2>

            <div className="space-y-4">
              {comissoesHistorico.map(comissao => (
                <div
                  key={comissao.id}
                  className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {comissao.cliente}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {comissao.imovel}
                      </p>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      comissao.status === 'pago'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      {comissao.status === 'pago' ? 'Pago' : 'Pendente'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Valor Venda</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {comissao.valor_venda.toLocaleString('pt-PT')}€
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Comissão Bruta</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {comissao.comissao_bruta.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}€
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-600">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Líquido</p>
                      <p className="text-lg font-bold text-green-600 dark:text-green-400">
                        {comissao.comissao_liquida.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}€
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-gray-400 mt-2">
                    {comissao.data.toLocaleDateString('pt-PT')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
