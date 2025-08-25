'use client'

import { motion } from 'framer-motion'
import { MetricCard } from '@/components/ui/card'
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react'
import { cn } from '@/utils/cn'
import { formatCurrency, formatPercentage } from '@/data/metrics'

interface MetricCardProps {
  title: string
  value: string | number
  change?: {
    value: number
    direction: 'up' | 'down'
  }
  format?: 'currency' | 'number' | 'percentage'
  icon?: LucideIcon
  trend?: number[]
  className?: string
  index: number
  loading?: boolean
  subtitle?: string
}

export function DashboardMetricCard({ 
  title, 
  value, 
  change, 
  format = 'number',
  icon: Icon,
  trend,
  className,
  index,
  loading = false,
  subtitle
}: MetricCardProps) {
  const formatValue = (val: string | number) => {
    const numValue = typeof val === 'string' ? parseFloat(val) : val
    
    switch (format) {
      case 'currency':
        return formatCurrency(numValue)
      case 'percentage':
        return formatPercentage(numValue)
      default:
        return numValue.toLocaleString()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      layout
      layoutId={`metric-card-${title}`}
    >
      <MetricCard
        title={title}
        value={loading ? undefined : formatValue(value)}
        trend={change ? {
          value: change.value,
          direction: change.direction
        } : undefined}
        icon={Icon && <Icon className="w-5 h-5" />}
        loading={loading}
        className={cn(
          "h-full group cursor-pointer",
          // 根据变化方向添加微妙的色彩提示
          change?.direction === 'up' && "hover:shadow-green-500/10",
          change?.direction === 'down' && "hover:shadow-red-500/10",
          className
        )}
      >
        {/* 趋势图 */}
        {trend && trend.length > 0 && !loading && (
          <div className="mt-4">
            <MiniChart data={trend} />
          </div>
        )}
        
        {/* 副标题 */}
        {subtitle && !loading && (
          <div className="mt-2 text-xs text-gray-500">
            {subtitle}
          </div>
        )}
        
        {/* 变化指示器 */}
        {change && !loading && (
          <motion.div
            className={cn(
              "flex items-center gap-1 text-sm font-medium mt-2",
              change.direction === 'up' ? 'text-green-600' : 'text-red-600'
            )}
            layout
            layoutId={`change-indicator-${title}`}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {change.direction === 'up' ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span>{formatPercentage(change.value)}</span>
          </motion.div>
        )}
      </MetricCard>
    </motion.div>
  )
}

// 迷你图表组件
function MiniChart({ data }: { data: number[] }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1

  // 生成 SVG 路径
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100
    const y = 100 - ((value - min) / range) * 100
    return `${x},${y}`
  }).join(' ')

  return (
    <div className="h-12 w-full">
      <svg 
        className="w-full h-full" 
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* 背景网格 */}
        <defs>
          <pattern 
            id="grid" 
            width="20" 
            height="20" 
            patternUnits="userSpaceOnUse"
          >
            <path 
              d="M 20 0 L 0 0 0 20" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="0.5"
              className="text-gray-200"
            />
          </pattern>
        </defs>
        
        <rect width="100" height="100" fill="url(#grid)" opacity="0.3" />
        
        {/* 渐变区域 */}
        <defs>
          <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        
        <polygon
          fill="url(#chartGradient)"
          points={`0,100 ${points} 100,100`}
          className="text-primary-500"
        />
        
        {/* 趋势线 */}
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          points={points}
          className="text-primary-500"
        />
        
        {/* 数据点 */}
        {data.map((value, index) => {
          const x = (index / (data.length - 1)) * 100
          const y = 100 - ((value - min) / range) * 100
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="1.5"
              fill="currentColor"
              className="text-primary-600"
            />
          )
        })}
      </svg>
    </div>
  )
}