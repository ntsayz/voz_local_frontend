import apiRequest from './index';

// Reporting API
export const createReport = async (data: Record<string, any>, token: string) => {
  return apiRequest('/report', 'POST', data, token);
};

export const getReports = async (token: string) => {
  return apiRequest('/report', 'GET', null, token);
};

export async function getReportsPerProvince(): Promise<{ [key: string]: { count: number; details: string[] } }> {
  return {
    MZL: { 
      count: 0, 
      details: ["Não há problemas reportados nesta região."] 
    },
    MZP: { 
      count: 1, 
      details: ["Problema identificado: estradas em mau estado devido à falta de manutenção regular."] 
    },
    MZA: { 
      count: 3, 
      details: [
        "Falta de segurança em áreas residenciais, especialmente durante a noite.",
        "Escassez de água potável em várias comunidades.",
        "Interrupções frequentes no fornecimento de energia elétrica."
      ] 
    },
    MZT: { 
      count: 7, 
      details: [
        "Falta de materiais escolares nas escolas públicas.",
        "Longas filas nos hospitais e clínicas devido à falta de profissionais de saúde.",
        "Desmatamento em zonas florestais protegidas.",
        "Pouco apoio aos agricultores locais na compra de fertilizantes.",
        "Danos a infraestruturas causados pelas chuvas intensas.",
        "Problemas no transporte público em zonas rurais.",
        "Aumento de pequenos furtos em áreas comerciais."
      ] 
    },
    MZB: { 
      count: 2, 
      details: [
        "Inundações em bairros devido à fraca drenagem.",
        "Urgência na reparação das principais estradas que ligam as comunidades."
      ] 
    },
    MZG: { 
      count: 9, 
      details: [
        "Acumulação de lixo devido à falta de recolha regular.",
        "Aumento de assaltos em bairros suburbanos.",
        "Falta de acesso a cuidados de saúde em zonas rurais.",
        "Postos de combustível com falta de abastecimento.",
        "Rios poluídos devido ao descarte irregular de resíduos.",
        "Falta de iluminação pública em ruas movimentadas.",
        "Perdas de água nas canalizações públicas.",
        "Redução da produção agrícola devido à ausência de apoios.",
        "Desemprego elevado entre jovens nas áreas urbanas."
      ] 
    },
    MZQ: { 
      count: 4, 
      details: [
        "Casas em condições precárias, principalmente em zonas rurais.",
        "Dificuldades de acesso ao mercado de trabalho.",
        "Estradas esburacadas dificultando o transporte de mercadorias.",
        "Esgotos a céu aberto, causando preocupações de saúde."
      ] 
    },
    MZMPM: { 
      count: 1, 
      details: ["Aumento de assaltos durante a noite em áreas movimentadas."] 
    },
    MZI: { 
      count: 6, 
      details: [
        "Pequenos negócios sem acesso a incentivos financeiros.",
        "Serviço de transporte público irregular.",
        "Escolas com necessidade de reparações urgentes.",
        "Falta de medicamentos essenciais em hospitais.",
        "Poluição sonora excessiva em bairros residenciais.",
        "Interrupções frequentes no fornecimento de eletricidade."
      ] 
    },
    MZS: { 
      count: 8, 
      details: [
        "Falta de produtos agrícolas nos mercados locais.",
        "Distribuição de recursos limitada em zonas mais afastadas.",
        "Lotação nos centros de saúde.",
        "Pontes danificadas impedindo a circulação em estradas rurais.",
        "Despejo ilegal de resíduos nos mangais.",
        "Bairros sem acesso a água potável.",
        "Dificuldades no transporte escolar para estudantes.",
        "Aumento de furtos em lojas e mercados."
      ] 
    },
    MZN: { 
      count: 10, 
      details: [
        "Desmatamento preocupante em áreas florestais.",
        "Casos crescentes de doenças devido à falta de saneamento.",
        "Comunidades rurais sem acesso à energia elétrica.",
        "Dificuldade em aceder a serviços bancários.",
        "Insegurança em zonas afastadas dos centros urbanos.",
        "Recolha irregular de lixo em bairros urbanos.",
        "Falta de oportunidades de formação técnica para jovens.",
        "Estradas principais com muitos buracos e más condições.",
        "Rios contaminados por resíduos industriais.",
        "Inundações frequentes durante a época chuvosa, afetando as habitações."
      ] 
    }
  };
}



