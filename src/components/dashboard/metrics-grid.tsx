'use client'

import { DashboardMetrics } from '@/types'
import { DashboardMetricCard } from './metric-card'
import { 
  DollarSign, 
  Users, 
  Wallet, 
  CreditCard,
  TrendingUp,
  Activity,
  PiggyBank,
  Receipt
} from 'lucide-react'

interface MetricsGridProps {
  metrics: DashboardMetrics
  loading?: boolean
}

export function MetricsGrid({ metrics, loading = false }: MetricsGridProps) {
  const metricsConfig = [
    // 第一行 - 主要收入指标
    {
      title: 'Net Revenue',
      value: metrics.revenue.current,
      format: 'currency' as const,
      icon: DollarSign,
      change: {
        value: metrics.revenue.growth,
        direction: metrics.revenue.growth > 0 ? 'up' as const : 'down' as const
      },
      subtitle: 'Today',
      trend: metrics.revenue.trend.slice(-12).map(d => d.value) // 最近12个数据点
    },
    {
      title: 'HKD Balance',
      value: metrics.balance.available,
      format: 'currency' as const,
      icon: Wallet,
      subtitle: 'Available for Withdrawal',
      trend: [] // 余额通常不显示趋势
    },
    {
      title: 'New Customers',
      value: metrics.customers.new,
      format: 'number' as const,
      icon: Users,
      change: {
        value: metrics.customers.growth,
        direction: metrics.customers.growth > 0 ? 'up' as const : 'down' as const
      },
      subtitle: 'Added Today'
    },
    {
      title: 'Withdrawals',
      value: metrics.balance.withdrawable,
      format: 'currency' as const,
      icon: PiggyBank,
      subtitle: 'Expected Today'
    },
    
    // 第二行 - 详细指标
    {
      title: 'Yesterday Revenue',
      value: metrics.revenue.previous,
      format: 'currency' as const,
      icon: Activity,
      subtitle: 'Comparison Baseline'
    },
    {
      title: 'Pending Balance',
      value: metrics.balance.pending,
      format: 'currency' as const,
      icon: TrendingUp,
      subtitle: 'Processing'
    },
    {
      title: 'Paid Invoices',
      value: metrics.billing.paid,
      format: 'currency' as const,
      icon: Receipt,
      subtitle: 'Paid This Month'
    },
    {
      title: 'Pending Invoices',
      value: metrics.billing.pending,
      format: 'currency' as const,
      icon: CreditCard,
      subtitle: 'Pending Processing'
    }
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {metricsConfig.map((config, index) => (
        <DashboardMetricCard
          key={config.title}
          title={config.title}
          value={config.value}
          format={config.format}
          icon={config.icon}
          change={config.change}
          trend={config.trend}
          subtitle={config.subtitle}
          index={index}
          loading={loading}
        />
      ))}
    </div>
  )
}