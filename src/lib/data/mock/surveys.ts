export const mockSurveys = [
    {
      id: '1',
      title: 'Acesso à Saúde nas Zonas Rurais',
      description: 'Avaliar a qualidade e disponibilidade dos serviços de saúde nas áreas rurais de Moçambique.',
      type: 'multiple_choice',
      status: 'Ativo',
      results: [
        { label: 'Acesso Regular a Clínicas', votes: 45 },
        { label: 'Falta de Medicamentos Essenciais', votes: 30 },
        { label: 'Necessidade de Mais Profissionais de Saúde', votes: 25 },
      ],
      totalVotes: 100,
    },
    {
        id: '7',
        title: 'Preferências de Transporte',
        description: 'Indica o meio de transporte que mais usas para te deslocar no teu dia-a-dia',
        type: 'single_choice',
        status: 'Ativo',
        results: [
          { label: 'Transporte público (Chapa, autocarro, etc.)', votes: 60 },
          { label: 'Veículo pessoal', votes: 25 },
          { label: 'Transporte privado (Táxi, Yango, etc.)', votes: 25 },
          { label: 'A pé', votes: 20 },
        ],
        totalVotes: 130,
      },

    {
        id: '2',
        title: 'Uso de Redes Sociais',
        description: 'Qual rede social você mais utiliza para se informar ou se entreter?',
        type: 'single_choice',
        status: 'Ativo',
        results: [
            { label: 'Facebook', votes: 50 },
            { label: 'WhatsApp', votes: 70 },
            { label: 'Instagram', votes: 40 },
            { label: 'TikTok', votes: 30 },
        ],
        totalVotes: 190,
    },
    {
        id: '9',
        title: 'Melhorias nos Parques e Espaços Públicos',
        description: 'Quais melhorias você gostaria de ver nos parques e espaços públicos na sua região?',
        type: 'multiple_choice',
        status: 'Encerrado',
        results: [
          { label: 'Mais áreas verdes', votes: 50 },
          { label: 'Espaços para eventos culturais', votes: 30 },
          { label: 'Melhor iluminação', votes: 20 },
        ],
        totalVotes: 100,
      },
      

    {
        id: '8',
        title: 'Cuidados com Animais de Estimação',
        description: 'Qual é o maior desafio que enfrenta ao cuidar dos seus animais de estimação?',
        type: 'multiple_choice',
        status: 'Encerrado',
        results: [
          { label: 'Acesso a cuidados veterinários', votes: 40 },
          { label: 'Alimentação adequada', votes: 30 },
          { label: 'Espaço para os animais', votes: 30 },
        ],
        totalVotes: 100,
      }
      ,
    {
      id: '3',
      title: 'Satisfação com a Educação Primária Pública',
      description: 'Avaliar a satisfação dos pais com a qualidade da educação primária oferecida pelo Estado.',
      type: 'rating',
      status: 'Encerrado',
      results: { average: 3.5, max: 5 },
    },
    {
      id: '4',
      title: 'Apoio à Implementação de Renda Básica Universal',
      description: 'Verificar o apoio da população à introdução de uma renda básica universal em Moçambique.',
      type: 'binary-line',
      status: 'Ativo',
      results: {
        options: [
          { label: 'Sim', votes: 70 },
          { label: 'Não', votes: 30 },
        ],
        colors: ['#4caf50', '#f44336'],
      },
      totalVotes: 100,
    },
    {
      id: '5',
      title: 'Avaliação da Qualidade dos Transportes Públicos Urbanos',
      description: 'Coletar feedback sobre a eficiência e qualidade dos transportes públicos nas cidades moçambicanas.',
      type: 'matrix',
      status: 'Ativo',
      results: [
        {
          label: 'Pontualidade',
          values: [20, 50, 30],
          columns: ['Excelente', 'Média', 'Fraca'],
        },
        {
          label: 'Conforto',
          values: [15, 40, 45],
          columns: ['Excelente', 'Média', 'Fraca'],
        },
      ],
    },
    {
      id: '6',
      title: 'Prioridades para o Desenvolvimento Comunitário',
      description: 'Identificar as áreas que a comunidade considera mais urgentes para o desenvolvimento.',
      type: 'ranking',
      status: 'Ativo',
      results: [
        { label: 'Melhoria das Infraestruturas de Saneamento', rank: 1 },
        { label: 'Aumento da Segurança Pública', rank: 2 },
        { label: 'Criação de Oportunidades de Emprego', rank: 3 },
      ],
    },      
  ];
  