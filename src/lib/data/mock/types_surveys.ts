export const mockSurveys = [
    // Multiple Choice
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
    // Single Choice
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
    // Rating
    {
      id: '3',
      title: 'Transport Accessibility',
      description: 'We want your feedback on improving public transport.',
      type: 'rating',
      status: 'Closed',
      responses: 200,
      options: [{ label: 'Average Rating', value: 4.3, max: 5 }],
    },
    // Binary
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
    // Matrix
    {
      id: '5',
      title: 'Customer Feedback Matrix',
      description: 'Rate our service quality across different areas.',
      type: 'matrix',
      status: 'Active',
      responses: 100,
      options: [
        {
          rowLabel: 'Ease of Use',
          values: [5, 3, 2],
          columns: ['Excellent', 'Average', 'Poor'],
        },
        {
          rowLabel: 'Support Quality',
          values: [4, 4, 2],
          columns: ['Excellent', 'Average', 'Poor'],
        },
      ],
    },
    // Ranking
    {
      id: '6',
      title: 'Community Priorities Ranking',
      description: 'Rank the following community improvements by priority.',
      type: 'ranking',
      status: 'Active',
      responses: 80,
      options: [
        { label: 'Better Roads', rank: 1 },
        { label: 'More Schools', rank: 3 },
        { label: 'Healthcare Access', rank: 2 },
      ],
    },
    // Open-Ended with Attachments
    {
      id: '7',
      title: 'Feature Suggestion with Attachments',
      description: 'Share your feature ideas with optional screenshots.',
      type: 'open_ended_attachment',
      status: 'Active',
      responses: 40,
      options: [
        { label: 'User Comments', value: ['Add a dark mode', 'Improve notifications'] },
        { attachments: ['url1.jpg', 'url2.mp4'] },
      ],
    },
    // Slider
    {
      id: '8',
      title: 'Satisfaction Survey',
      description: 'How satisfied are you with our service? (1 being least satisfied, 10 being most satisfied).',
      type: 'slider',
      status: 'Active',
      responses: 120,
      options: [{ label: 'Satisfaction Level', min: 1, max: 10, average: 7.5 }],
    },
    // Demographic
    {
      id: '9',
      title: 'Demographic Information',
      description: 'Help us understand our audience by sharing some details.',
      type: 'demographic',
      status: 'Active',
      responses: 300,
      options: [
        { label: 'Age', value: ['18-25', '26-35', '36-45', '46+'] },
        { label: 'Gender', value: ['Male', 'Female', 'Other'] },
      ],
    },
    // Conditional Logic
    {
      id: '10',
      title: 'Conditional Logic Poll',
      description: 'Answer follow-up questions based on your responses.',
      type: 'conditional',
      status: 'Active',
      responses: 50,
      options: [
        { label: 'Do you own a car?', value: ['Yes', 'No'] },
        {
          conditional: {
            trigger: 'Yes',
            followUp: [
              { label: 'What brand?', value: ['Toyota', 'Honda', 'Other'] },
            ],
          },
        },
      ],
    },
  ];
  