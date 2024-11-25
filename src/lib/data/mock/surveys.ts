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
    },
    {
      id: '3',
      title: 'Transport Accessibility',
      description: 'We want your feedback on improving public transport.',
      type: 'rating',
      status: 'Closed',
      responses: 200,
      options: [
        { label: 'Average Rating', value: 4.3, max: 5 },
      ],
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
    },
  ];
  