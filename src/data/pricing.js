export const PRICING = {
  dataTransfer: {
    firstTierLimit: 500,
    firstTierRate: 0.10,
    secondTierRate: 0.05,
  },
  vm: {
    firstTierLimit: 100,
    firstTierRate: 0.50,
    secondTierRate: 0.30,
  },
  storage: {
    rate: 0.20,
  },
};

export const DISCOUNTS = [
  { minimum: 500, rate: 0.10 },
  { minimum: 250, rate: 0.05 },
  { minimum: 0, rate: 0 },
];
