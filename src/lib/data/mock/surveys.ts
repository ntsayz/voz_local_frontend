// src/lib/data/mockSurveys.ts
export const mockSurveys = [
    {
      id: '1',
      title: 'Community Development Survey',
      description: 'Help us understand how we can improve your local community.',
      type: 'multiple_choice',
      status: 'Active',
      responses: 120,
      options: [
        { label: 'Better Roads', value: 60 },
        { label: 'More Schools', value: 30 },
        { label: 'Healthcare Access', value: 30 },
      ],
      chartData: {
        labels: ['Better Roads', 'More Schools', 'Healthcare Access'],
        datasets: [
          {
            label: 'Votes',
            data: [60, 30, 30],
            backgroundColor: ['#4caf50', '#2196f3', '#ff9800'],
          },
        ],
      },
    },
    {
      id: '2',
      title: 'Environmental Awareness',
      description: 'Share your thoughts on tackling climate change locally.',
      type: 'single_choice',
      status: 'Active',
      responses: 85,
      options: [
        { label: 'Plant Trees', value: 50 },
        { label: 'Reduce Plastic', value: 25 },
        { label: 'Clean Rivers', value: 10 },
      ],
      chartData: {
        labels: ['Plant Trees', 'Reduce Plastic', 'Clean Rivers'],
        datasets: [
          {
            label: 'Votes',
            data: [50, 25, 10],
            backgroundColor: ['#4caf50', '#2196f3', '#ff9800'],
          },
        ],
      },
    },
    {
      id: '4',
      title: 'Do You Support Universal Basic Income?',
      description: 'Share your opinion on implementing UBI in your country.',
      type: 'binary',
      status: 'Active',
      responses: 150,
      options: [
        { label: 'Yes', value: 90 },
        { label: 'No', value: 60 },
      ],
      chartData: {
        labels: ['Yes', 'No'],
        datasets: [
          {
            label: 'Votes',
            data: [90, 60],
            backgroundColor: ['#4caf50', '#f44336'],
          },
        ],
      },
    },
  ];
  