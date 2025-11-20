'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronLeft, MessageSquare, Send, Sparkles, FileText,
  Scale, Home as HomeIcon, Briefcase, AlertCircle, BookOpen,
  Search, Loader2
} from 'lucide-react';

export default function AssistenteIAPage() {
  const [mensagem, setMensagem] = useState('');
  const [conversas, setConversas] = useState<any[]>([
    {
      id: 1,
      tipo: 'ia',
      texto: 'Olá! Sou seu assistente especializado em legislação imobiliária portuguesa. Como posso ajudar hoje?',
      timestamp: new Date()
    }
  ]);
  const [carregando, setCarregando] = useState(false);

  const perguntasFrequentes = [
    {
      icon: Scale,
      titulo: 'IMT - Imposto Municipal',
      pergunta: 'Como calcular o IMT na compra de imóvel?'
    },
    {
      icon: FileText,
      titulo: 'Contrato de Arrendamento',
      pergunta: 'Quais cláusulas são obrigatórias no contrato?'
    },
    {
      icon: HomeIcon,
      titulo: 'Certificado Energético',
      pergunta: 'Quando é obrigatório o certificado energético?'
    },
    {
      icon: Briefcase,
      titulo: 'Comissões',
      pergunta: 'Qual a legislação sobre comissões de mediação?'
    }
  ];

  const enviarMensagem = async () => {
    if (!mensagem.trim()) return;

    const novaMensagem = {
      id: conversas.length + 1,
      tipo: 'usuario',
      texto: mensagem,
      timestamp: new Date()
    };

    setConversas([...conversas, novaMensagem]);
    setMensagem('');
    setCarregando(true);

    // Simula resposta da IA
    setTimeout(() => {
      const resposta = {
        id: conversas.length + 2,
        tipo: 'ia',
        texto: 'Com base na legislação portuguesa vigente, posso explicar que... [Resposta detalhada baseada em leis e decretos específicos]',
        referencias: ['Lei nº 6/2006', 'Decreto-Lei nº 118/2013'],
        timestamp: new Date()
      };
      setConversas(prev => [...prev, resposta]);
      setCarregando(false);
    }, 1500);
  };

  const usarPerguntaRapida = (pergunta: string) => {
    setMensagem(pergunta);
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
              <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Assistente IA
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Especialista em Legislação PT
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex flex-col h-[calc(100vh-8rem)]">
        {/* Área de Conversas */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {/* Banner Info */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-900 rounded-2xl p-4 border border-indigo-200 dark:border-gray-800">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                  IA Integrada
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  Este assistente se comunica com todas as outras IAs do sistema para fornecer respostas completas e personalizadas.
                </p>
              </div>
            </div>
          </div>

          {/* Perguntas Frequentes */}
          {conversas.length === 1 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 px-2">
                Perguntas Frequentes
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {perguntasFrequentes.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => usarPerguntaRapida(item.pergunta)}
                    className="p-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl text-left active:scale-98 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-900 dark:text-white mb-1">
                          {item.titulo}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {item.pergunta}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Mensagens */}
          {conversas.map((conversa) => (
            <div
              key={conversa.id}
              className={`flex ${conversa.tipo === 'usuario' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-3xl p-4 ${
                  conversa.tipo === 'usuario'
                    ? 'bg-indigo-500 text-white'
                    : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800'
                }`}
              >
                {conversa.tipo === 'ia' && (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-xs font-semibold text-gray-900 dark:text-white">
                      Assistente IA
                    </span>
                  </div>
                )}
                
                <p className={`text-sm leading-relaxed ${
                  conversa.tipo === 'usuario' 
                    ? 'text-white' 
                    : 'text-gray-700 dark:text-gray-300'
                }`}>
                  {conversa.texto}
                </p>

                {conversa.referencias && (
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-1 mb-2">
                      <BookOpen className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                        Referências Legais:
                      </span>
                    </div>
                    <div className="space-y-1">
                      {conversa.referencias.map((ref: string, idx: number) => (
                        <div key={idx} className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                          <div className="w-1 h-1 bg-indigo-500 rounded-full"></div>
                          {ref}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <p className={`text-xs mt-2 ${
                  conversa.tipo === 'usuario' 
                    ? 'text-indigo-200' 
                    : 'text-gray-400'
                }`}>
                  {conversa.timestamp.toLocaleTimeString('pt-PT', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          ))}

          {carregando && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-4">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-indigo-500 animate-spin" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Analisando legislação...
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input de Mensagem */}
        <div className="px-4 py-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-end gap-2">
            <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-3xl px-4 py-3 border border-gray-200 dark:border-gray-700">
              <textarea
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    enviarMensagem();
                  }
                }}
                placeholder="Pergunte sobre legislação imobiliária..."
                className="w-full bg-transparent text-sm text-gray-900 dark:text-white placeholder:text-gray-500 resize-none outline-none"
                rows={1}
                style={{ minHeight: '24px', maxHeight: '120px' }}
              />
            </div>
            <button
              onClick={enviarMensagem}
              disabled={!mensagem.trim() || carregando}
              className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
