'use client'

import { useState, useEffect, useCallback } from 'react'
import { DashboardMetrics } from '@/types'
import { generateRandomMetrics, getDemoMetrics } from '@/data/metrics'

export function useRealtimeData(interval = 3000, demo = false) {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
  const [isLive, setIsLive] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const updateMetrics = useCallback(() => {
    setIsLoading(true)
    
    // 模拟网络延迟
    setTimeout(() => {
      const newMetrics = demo ? getDemoMetrics() : generateRandomMetrics()
      setMetrics(newMetrics)
      setLastUpdated(new Date())
      setIsLoading(false)
    }, 200)
  }, [demo])

  const toggleLive = useCallback(() => {
    setIsLive(prev => !prev)
  }, [])

  const refreshData = useCallback(() => {
    updateMetrics()
  }, [updateMetrics])

  // 初始化数据
  useEffect(() => {
    updateMetrics()
  }, [updateMetrics])

  // 实时更新逻辑
  useEffect(() => {
    if (!isLive) return

    const intervalId = setInterval(() => {
      updateMetrics()
    }, interval)

    return () => clearInterval(intervalId)
  }, [isLive, interval, updateMetrics])

  // 默认保持暂停状态，不自动开启实时模式
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLive(true)
  //   }, 5000)

  //   return () => clearTimeout(timer)
  // }, [])

  return {
    metrics,
    isLive,
    isLoading,
    lastUpdated,
    toggleLive,
    refreshData,
    updateMetrics
  }
}