export const mockSurveys = [
    {
      id: '1',
      title: 'Community Development Survey',
      description: 'See how people ranked improvements in your community.',
      type: 'multiple_choice',
      status: 'Active',
      results: [
        { label: 'Better Roads', votes: 60 },
        { label: 'More Schools', votes: 30 },
        { label: 'Healthcare Access', votes: 30 },
      ],
      totalVotes: 120,
    },
    {
      id: '2',
      title: 'Environmental Awareness',
      description: 'Here are the preferred solutions for climate action.',
      type: 'single_choice',
      status: 'Closed',
      results: [
        { label: 'Plant Trees', votes: 50 },
        { label: 'Reduce Plastic', votes: 25 },
        { label: 'Clean Rivers', votes: 10 },
      ],
      totalVotes: 85,
    },
    {
      id: '3',
      title: 'Transport Accessibility',
      description: 'See the average satisfaction score for public transport.',
      type: 'rating',
      status: 'Closed',
      results: { average: 4.3, max: 5 },
    },
    {
      id: '4',
      title: 'Support for UBI',
      description: 'Check how people voted on Universal Basic Income.',
      type: 'binary',
      status: 'Active',
      results: { yes: 90, no: 60 },
      totalVotes: 150,
    },
    {
      id: '5',
      title: 'Customer Feedback on Service Quality',
      description: 'Here’s how customers rated key service areas.',
      type: 'matrix',
      status: 'Active',
      results: [
        {
          label: 'Ease of Use',
          values: [60, 30, 10],
          columns: ['Excellent', 'Average', 'Poor'],
        },
        {
          label: 'Support Quality',
          values: [50, 40, 10],
          columns: ['Excellent', 'Average', 'Poor'],
        },
      ],
    },
    {
      id: '6',
      title: 'Priority Ranking for Community Improvements',
      description: 'See how people prioritized community needs.',
      type: 'ranking',
      status: 'Active',
      results: [
        { label: 'Better Roads', rank: 1 },
        { label: 'More Schools', rank: 3 },
        { label: 'Healthcare Access', rank: 2 },
      ],
    },
  ];
  