// êhØpn{‹
export interface DashboardMetrics {
  revenue: {
    current: number
    previous: number
    growth: number
    trend: DataPoint[]
  }
  customers: {
    new: number
    total: number
    growth: number
  }
  balance: {
    available: number
    pending: number
    withdrawable: number
  }
  transactions: Transaction[]
  billing: {
    paid: number
    pending: number
    overdue: number
  }
}

export interface DataPoint {
  time: string
  value: number
  label?: string
}

export interface Transaction {
  id: string
  type: 'payment' | 'refund' | 'payout'
  amount: number
  currency: string
  description: string
  timestamp: Date
  status: 'completed' | 'pending' | 'failed'
  customer?: string
}

// Äö{‹
export interface FeatureCard {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
  gradient: string
  cta?: {
    text: string
    href: string
  }
}

// ß¡pn{‹
export interface StatItem {
  id: string
  title: string
  value: number
  suffix: string
  description: string
  format?: (value: number) => string
}

// ¨;Mn{‹
export interface AnimationConfig {
  initial: object
  animate: object
  exit?: object
  transition?: object
}

// ;˜{‹
export type Theme = 'light' | 'dark' | 'system'

// ëw.¨\{‹
export interface ShortcutAction {
  key: string
  description: string
  action: () => void
  modifier?: 'ctrl' | 'cmd' | 'shift' | 'alt'
}

// ü*ÜU{‹
export interface NavigationItem {
  name: string
  href: string
  icon?: string
  children?: NavigationItem[]
}