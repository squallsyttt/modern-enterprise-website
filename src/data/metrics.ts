import { DashboardMetrics, DataPoint, Transaction } from '@/types'

// Utility functions for generating random data
export const generateRandomMetrics = (): DashboardMetrics => {
  const baseRevenue = 3500000
  const currentRevenue = baseRevenue + Math.random() * 100000
  const previousRevenue = baseRevenue * 0.85 + Math.random() * 50000
  const growth = ((currentRevenue - previousRevenue) / previousRevenue) * 100

  // Generate 24-hour trend data
  const trendData: DataPoint[] = Array.from({ length: 24 }, (_, i) => ({
    time: `${String(i).padStart(2, '0')}:00`,
    value: baseRevenue * 0.6 + Math.random() * baseRevenue * 0.6,
    label: `${String(i).padStart(2, '0')}:00`
  }))

  // Generate simulated transaction data
  const transactionTypes = ['payment', 'refund', 'payout'] as const
  const transactionDescriptions = [
    'Rocket Rides Subscription Fee',
    'Online Payment Processing',
    'API Usage Fee',
    'Monthly Settlement',
    'Refund Processing',
    'Premium Plan Upgrade',
    'International Transfer',
    'Platform Service Fee'
  ]

  const transactions: Transaction[] = Array.from({ length: 12 }, (_, i) => {
    const type = transactionTypes[Math.floor(Math.random() * transactionTypes.length)]
    const isRefund = type === 'refund'
    
    return {
      id: `txn_${Date.now()}_${i}`,
      type,
      amount: isRefund ? 
        -(Math.floor(Math.random() * 5000) + 100) : 
        Math.floor(Math.random() * 15000) + 500,
      currency: 'HKD',
      description: transactionDescriptions[Math.floor(Math.random() * transactionDescriptions.length)],
      timestamp: new Date(Date.now() - Math.random() * 86400000 * 7), // Within past 7 days
      status: Math.random() > 0.15 ? 'completed' as const : (Math.random() > 0.5 ? 'pending' as const : 'failed' as const),
      customer: `customer_${Math.floor(Math.random() * 1000)}`
    }
  }).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()) // Sort by time descending

  return {
    revenue: {
      current: currentRevenue,
      previous: previousRevenue,
      growth: Number(growth.toFixed(1)),
      trend: trendData
    },
    customers: {
      new: Math.floor(Math.random() * 50) + 25,
      total: Math.floor(Math.random() * 2000) + 800,
      growth: Number((Math.random() * 50 + 15).toFixed(1))
    },
    balance: {
      available: Math.floor(Math.random() * 1000000) + 500000,
      pending: Math.floor(Math.random() * 200000) + 50000,
      withdrawable: Math.floor(Math.random() * 150000) + 100000
    },
    transactions,
    billing: {
      paid: Math.floor(Math.random() * 50000) + 20000,
      pending: Math.floor(Math.random() * 30000) + 15000,
      overdue: Math.floor(Math.random() * 5000) + 1000
    }
  }
}

// 获取静态演示数据
export const getDemoMetrics = (): DashboardMetrics => {
  const demoTrend: DataPoint[] = [
    { time: '00:00', value: 2800000 },
    { time: '01:00', value: 2850000 },
    { time: '02:00', value: 2900000 },
    { time: '03:00', value: 2950000 },
    { time: '04:00', value: 3000000 },
    { time: '05:00', value: 3100000 },
    { time: '06:00', value: 3200000 },
    { time: '07:00', value: 3250000 },
    { time: '08:00', value: 3300000 },
    { time: '09:00', value: 3400000 },
    { time: '10:00', value: 3450000 },
    { time: '11:00', value: 3500000 },
    { time: '12:00', value: 3520000 },
    { time: '13:00', value: 3530000 },
    { time: '14:00', value: 3528198 },
    { time: '15:00', value: 3530000 },
    { time: '16:00', value: 3540000 },
    { time: '17:00', value: 3580000 },
    { time: '18:00', value: 3600000 },
    { time: '19:00', value: 3650000 },
    { time: '20:00', value: 3700000 },
    { time: '21:00', value: 3750000 },
    { time: '22:00', value: 3800000 },
    { time: '23:00', value: 3820000 },
  ]

  const demoTransactions: Transaction[] = [
    {
      id: 'txn_001',
      type: 'payment',
      amount: 12580,
      currency: 'HKD',
      description: 'Rocket Rides Premium 月度订阅',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30分钟前
      status: 'completed',
      customer: 'customer_premium_001'
    },
    {
      id: 'txn_002',
      type: 'payment',
      amount: 8900,
      currency: 'HKD',
      description: 'API 调用费用 - 高峰时段',
      timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45分钟前
      status: 'completed',
      customer: 'customer_api_002'
    },
    {
      id: 'txn_003',
      type: 'refund',
      amount: -2340,
      currency: 'HKD',
      description: '服务中断补偿退款',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2小时前
      status: 'completed',
      customer: 'customer_003'
    }
  ]

  return {
    revenue: {
      current: 3528198.72,
      previous: 2931556.34,
      growth: 32.8,
      trend: demoTrend
    },
    customers: {
      new: 37,
      total: 1245,
      growth: 32.1
    },
    balance: {
      available: 553257.51,
      pending: 102633.07,
      withdrawable: 450000
    },
    transactions: demoTransactions,
    billing: {
      paid: 25000,
      pending: 20000,
      overdue: 1000
    }
  }
}

// 格式化货币
export const formatCurrency = (amount: number, currency = 'HKD'): string => {
  const prefix = currency === 'HKD' ? 'HK$' : '$'
  return `${prefix}${Math.abs(amount).toLocaleString()}`
}

// 格式化百分比
export const formatPercentage = (value: number): string => {
  return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`
}

// 格式化时间
export const formatTimestamp = (timestamp: Date): string => {
  const now = new Date()
  const diffMs = now.getTime() - timestamp.getTime()
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMins < 1) return '刚刚'
  if (diffMins < 60) return `${diffMins} 分钟前`
  if (diffHours < 24) return `${diffHours} 小时前`
  if (diffDays < 7) return `${diffDays} 天前`
  
  return timestamp.toLocaleDateString('zh-CN')
}