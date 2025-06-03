const mockSubscriptions = [
  {
    id: 1,
    name: 'Netflix - Standard',
    cost: '179',
    price: 'R 179',
    billingCycle: 'monthly',
    category: 'Entertainment',
    importance: 'Regular',
    usageHours: '15',
    usageFrequency: 'weekly',
    isTrial: false,
    renewalDate: '2025-06-15',
    dateAdded: '2025-01-15T00:00:00.000Z',
    notes: 'Family plan shared with household',
    logo: 'https://logo.clearbit.com/netflix.com'
  },
  {
    id: 2,
    name: 'Spotify Premium',
    cost: '60',
    price: 'R 60',
    billingCycle: 'monthly',
    category: 'Entertainment',
    importance: 'Critical',
    usageHours: '20',
    usageFrequency: 'weekly',
    isTrial: false,
    renewalDate: '2025-06-10',
    dateAdded: '2025-02-01T00:00:00.000Z',
    notes: 'Premium individual plan',
    logo: 'https://logo.clearbit.com/spotify.com'
  },
  {
    id: 3,
    name: 'Adobe Creative Cloud - All Apps',
    cost: '679',
    price: 'R 679',
    billingCycle: 'monthly',
    category: 'Software',
    importance: 'Critical',
    usageHours: '25',
    usageFrequency: 'weekly',
    isTrial: true,
    trialEndDate: '2025-06-30',
    renewalDate: '2025-06-30',
    dateAdded: '2025-05-01T00:00:00.000Z',
    notes: 'Free trial - decide before it ends',
    logo: 'https://logo.clearbit.com/adobe.com'
  }
];

export default mockSubscriptions;