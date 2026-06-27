export function formatCurrency(amount: number | string, currency = 'USD'): string {
  let numericAmount: number;
  if (typeof amount === 'string') {
    numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) {
      numericAmount = 0;
    }
  } else {
    numericAmount = amount;
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numericAmount)
}

export function formatOrderCount(value: number): string {
  const count = parseInt(value as unknown as string)
  return count.toLocaleString()
}

export function formatPercentage(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(dateString))
}