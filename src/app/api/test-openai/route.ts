import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Verificar se a chave existe
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'OPENAI_API_KEY não está configurada',
          message: 'Configure a variável de ambiente OPENAI_API_KEY na Vercel'
        },
        { status: 500 }
      );
    }

    // Testar a API da OpenAI
    const response = await fetch('https://api.openai.com/v1/models', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { 
          success: false, 
          error: 'Erro ao conectar com OpenAI',
          details: errorData,
          message: 'Verifique se a chave da OpenAI está correta'
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      message: '✅ Conexão com OpenAI funcionando perfeitamente!',
      apiKeyConfigured: true,
      modelsAvailable: data.data?.length || 0,
      sampleModels: data.data?.slice(0, 3).map((m: any) => m.id) || []
    });

  } catch (error: any) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro ao testar OpenAI',
        message: error.message 
      },
      { status: 500 }
    );
  }
}
