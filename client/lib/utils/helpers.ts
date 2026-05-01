/**
 * Format currency
 */
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

/**
 * Format number with abbreviations (e.g. 1.2M)
 */
export const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

/**
 * Class name merger (simple version)
 */
export const cn = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Delay for testing/loading states
 */
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
