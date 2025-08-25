'use client'

import { useRealtimeData } from '@/hooks/use-realtime-data'
import { DashboardHeader } from './dashboard-header'
import { MetricsGrid } from './metrics-grid'
import { RevenueChart } from './revenue-chart'
import { TransactionsList } from './transactions-list'
import { KeyboardShortcuts } from './keyboard-shortcuts'
import { DashboardContainer } from '@/components/layout/container'

export function Dashboard() {
  const { 
    metrics, 
    isLive, 
    isLoading, 
    lastUpdated, 
    toggleLive, 
    refreshData 
  } = useRealtimeData(3000, true) // 使用演示数据

  return (
    <DashboardContainer>
      {/* 仪表盘头部 */}
      <DashboardHeader 
        isLive={isLive}
        onToggleLive={toggleLive}
        lastUpdated={lastUpdated}
        onRefresh={refreshData}
      />
      
      {/* 指标网格 */}
      <div className="min-h-[320px]">
        {metrics ? (
          <MetricsGrid metrics={metrics} loading={isLoading} />
        ) : (
          <DashboardSkeleton />
        )}
      </div>
      
      {/* 图表和交易列表 */}
      {metrics && (
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RevenueChart data={metrics.revenue.trend} />
          </div>
          <div>
            <TransactionsList transactions={metrics.transactions} />
          </div>
        </div>
      )}
      
      {/* 键盘快捷键系统 */}
      <KeyboardShortcuts 
        isLive={isLive}
        onToggleLive={toggleLive}
        onRefresh={refreshData}
      />
    </DashboardContainer>
  )
}

// 骨架屏组件
function DashboardSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div 
          key={i} 
          className="h-32 bg-white/80 backdrop-blur-sm rounded-xl animate-pulse border border-gray-200"
        />
      ))}
    </div>
  )
}

