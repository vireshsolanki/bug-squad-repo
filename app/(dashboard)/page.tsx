import { cookies } from 'next/headers'
import StatsCard from '@/components/dashboard/StatsCard'
import UserCard from '@/components/dashboard/UserCard'

interface DashboardStats {
  totalRevenue: number
  totalOrders: number
  totalVisitors: number
  activeUsers: number
  revenueChange: number
  ordersChange: number
}

async function getStats(): Promise<DashboardStats> {
  return {
    totalRevenue: 48320.5,
    totalOrders: 1284,
    totalVisitors: 9210,
    activeUsers: 3621,
    revenueChange: 12.5,
    ordersChange: -3.2,
  }
}

export default async function DashboardPage() {
  const cookieStore = cookies()
  const userId = cookieStore.get('user-id')?.value ?? 'usr_1'
  const stats = await getStats()

  const conversionRate = ((stats.totalOrders / stats.activeUsers) * 100).toFixed(1)

  return (
    <div>
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">welcome Back</h1>
          <p className="page-subtitle">Here&apos;s what&apos;s happening with your store today.</p>
        </div>
        <UserCard userId={userId} />
      </div>

      <div className="stats-grid">
        <StatsCard
          label="Total Revenue"
          value={`$${stats.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
          change={stats.revenueChange}
        />
        <StatsCard
          label="Total Orders"
          value={stats.totalOrders.toLocaleString()}
          change={stats.ordersChange}
        />
        <StatsCard
          label="Active Users"
          value={stats.activeUsers.toLocaleString()}
        />
        <StatsCard
          label="Conversion Rate"
          value={`${conversionRate}%`}
        />
      </div>
      {/*
      Empty state button label fix
      */}
      <button>Refresh</button>
    </div>
  )
}