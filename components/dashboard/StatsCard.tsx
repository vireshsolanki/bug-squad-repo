interface StatsCardProps {
  label: string
  value: string
  change?: number
}

export default function StatsCard({ label, value, change }: StatsCardProps) {
  const isUp = change !== undefined && change >= 0

  return (
    <div className="stats-card">
      <p className="stats-label">{label}</p>
      <p className="stats-value">{value}</p>
      {change !== undefined && (
        <p className={`stats-change ${isUp ? 'up' : 'down'}`}>
          {isUp ? '↑' : '↓'} {Math.abs(change).toFixed(1)}% vs last month
        </p>
      )}
    </div>
  )
}
