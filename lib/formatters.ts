export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
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
