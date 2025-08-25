'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Play, Pause, RefreshCw, Activity, Clock } from 'lucide-react'
import { formatTimestamp } from '@/data/metrics'

interface DashboardHeaderProps {
  isLive: boolean
  onToggleLive: () => void
  lastUpdated: Date | null
  onRefresh?: () => void
}

export function DashboardHeader({
  isLive,
  onToggleLive,
  lastUpdated,
  onRefresh
}: DashboardHeaderProps) {
  return (
    <Card variant="glass" className="border-0">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          {/* 标题区域 */}
          <div className="flex items-center gap-4">
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-purple-700 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Rocket Rides
                </h1>
                <p className="text-sm text-gray-600">
                  Real-time Business Dashboard
                </p>
              </div>
            </motion.div>
          </div>

          {/* 控制区域 */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* 实时状态指示器 */}
            <div className="flex items-center gap-2 text-sm">
              <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
              <span className="text-gray-600">
                {isLive ? 'Live Updates' : 'Paused'}
              </span>
            </div>

            {/* 最后更新时间 */}
            {lastUpdated && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{formatTimestamp(lastUpdated)}</span>
              </div>
            )}

            {/* 控制按钮 */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onRefresh}
                className="gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </Button>
              
              <Button
                variant={isLive ? "destructive" : "default"}
                size="sm"
                onClick={onToggleLive}
                className="gap-2 min-w-[100px]"
              >
                {isLive ? (
                  <>
                    <Pause className="w-4 h-4" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Start
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        </div>

        {/* 今日概览 */}
        <motion.div
          className="mt-4 pt-4 border-t border-gray-200"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900">Today</div>
              <div className="text-sm text-gray-600">Data Overview</div>
            </div>
            
            <div className="text-right md:text-left">
              <div className="text-lg font-semibold text-green-600">+32.8%</div>
              <div className="text-sm text-gray-600">Sales Growth</div>
            </div>
            
            <div className="text-right md:text-left">
              <div className="text-lg font-semibold text-blue-600">37</div>
              <div className="text-sm text-gray-600">New Customers</div>
            </div>
            
            <div className="text-right">
              <div className="text-lg font-semibold text-purple-600">Real-time</div>
              <div className="text-sm text-gray-600">Data Stream</div>
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  )
}