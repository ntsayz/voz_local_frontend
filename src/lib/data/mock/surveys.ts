export const mockSurveys = [
    {
      id: '1',
      title: 'Acesso à Saúde nas Zonas Rurais',
      description: 'Avaliar a qualidade e disponibilidade dos serviços de saúde nas áreas rurais de Moçambique.',
      type: 'multiple_choice',
      status: 'Ativo',
      category: 'Saúde',
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
      category: 'Transporte',
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
      category: 'Tecnologia',
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
      category: 'Infraestrutura',
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
      category: 'Ambiente',
      results: [
        { label: 'Acesso a cuidados veterinários', votes: 40 },
        { label: 'Alimentação adequada', votes: 30 },
        { label: 'Espaço para os animais', votes: 30 },
      ],
      totalVotes: 100,
    },
    {
      id: '3',
      title: 'Satisfação com a Educação Primária Pública',
      description: 'Avaliar a satisfação dos pais com a qualidade da educação primária oferecida pelo Estado.',
      type: 'rating',
      status: 'Encerrado',
      category: 'Educação',
      results: { average: 3.5, max: 5 },
    },
    {
      id: '4',
      title: 'Apoio à Implementação de Renda Básica Universal',
      description: 'Verificar o apoio da população à introdução de uma renda básica universal em Moçambique.',
      type: 'binary-line',
      status: 'Ativo',
      category: 'Economia',
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
      category: 'Transporte',
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
      category: 'Infraestrutura',
      results: [
        { label: 'Melhoria das Infraestruturas de Saneamento', rank: 1 },
        { label: 'Aumento da Segurança Pública', rank: 2 },
        { label: 'Criação de Oportunidades de Emprego', rank: 3 },
      ],
    },
    {
      id: '10',
      title: 'Qual tecnologia digital traria mais benefícios para o teu dia-a-dia?',
      description: 'Explorar a perceção da população sobre avanços tecnológicos no trabalho, estudo ou serviços públicos.',
      type: 'multiple_choice',
      status: 'Ativo',
      category: 'Tecnologia',
      results: [
        { label: 'Internet acessível e rápida', votes: 70 },
        { label: 'Plataformas de ensino à distância', votes: 50 },
        { label: 'Digitalização de serviços públicos (licenças, registos)', votes: 40 },
        { label: 'Aplicações móveis para transporte e mapas', votes: 30 },
      ],
      totalVotes: 190,
    },
    {
      id: '11',
      title: 'Qual é a maior preocupação em relação ao lixo na tua área?',
      description: 'Recolher feedback sobre problemas com gestão de resíduos em comunidades urbanas e rurais.',
      type: 'single_choice',
      status: 'Encerrado',
      category: 'Ambiente',
      results: [
        { label: 'Falta de contentores', votes: 50 },
        { label: 'Raridade de recolha de lixo', votes: 30 },
        { label: 'Poluição de rios e praias com resíduos', votes: 15 },
        { label: 'Ausência de programas de reciclagem', votes: 5 },
      ],
      totalVotes: 100,
    },
    {
      id: '12',
      title: 'Qual elemento da cultura local deve ser mais promovido?',
      description: 'Avaliar a perceção sobre o fortalecimento cultural em festivais, escolas e eventos comunitários.',
      type: 'multiple_choice',
      status: 'Ativo',
      category: 'Cultura',
      results: [
        { label: 'Danças tradicionais', votes: 40 },
        { label: 'Gastronomia local', votes: 60 },
        { label: 'Música tradicional e contemporânea', votes: 50 },
        { label: 'Feiras de artesanato', votes: 30 },
      ],
      totalVotes: 180,
    },
    {
      id: '13',
      title: 'Quais são os maiores desafios enfrentados pelos jovens empreendedores?',
      description: 'Identificar barreiras ao sucesso no empreendedorismo jovem.',
      type: 'single_choice',
      status: 'Encerrado',
      category: 'Economia',
      results: [
        { label: 'Falta de acesso a financiamento', votes: 60 },
        { label: 'Ausência de mentoria ou suporte técnico', votes: 25 },
        { label: 'Baixa literacia digital', votes: 10 },
        { label: 'Competição desleal com grandes empresas', votes: 5 },
      ],
      totalVotes: 100,
    },
    {
      id: '17',
      title: 'Apoias a expansão de energia solar nas zonas rurais?',
      description: 'Recolher a opinião pública sobre a implementação de energia solar em comunidades remotas.',
      type: 'binary',
      status: 'Encerrado',
      category: 'Energia',
      results: {
        options: [
          { label: 'Sim', votes: 80 },
          { label: 'Não', votes: 20 },
        ],
        colors: ['#4caf50', '#f44336'],
      },
      totalVotes: 100,
    },
    {
      id: '19',
      title: 'Qual a tua principal preocupação com a saúde pública?',
      description: 'Indica qual destas questões te parece mais urgente na área de saúde pública.',
      type: 'single_choice',
      status: 'Encerrado',
      category: 'Saúde',
      results: [
        { label: 'Falta de hospitais nas zonas rurais', votes: 50 },
        { label: 'Escassez de medicamentos', votes: 30 },
        { label: 'Longas filas de espera', votes: 20 },
      ],
      totalVotes: 100,
    },
  ];
  