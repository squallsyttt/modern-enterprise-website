'use client'

import { useEffect, useRef } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions
} from 'chart.js'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DataPoint } from '@/types'
import { formatCurrency } from '@/data/metrics'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface RevenueChartProps {
  data: DataPoint[]
  title?: string
  height?: number
}

export function RevenueChart({ 
  data, 
  title = "收入趋势", 
  height = 320 
}: RevenueChartProps) {
  const chartRef = useRef<ChartJS<"line">>(null)

  const chartData = {
    labels: data.map(point => point.time),
    datasets: [
      {
        label: '收入',
        data: data.map(point => point.value),
        borderColor: '#635bff',
        backgroundColor: 'rgba(99, 91, 255, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 8,
        pointBackgroundColor: '#635bff',
        pointBorderColor: 'white',
        pointBorderWidth: 3,
        pointHoverBackgroundColor: '#635bff',
        pointHoverBorderColor: 'white',
        pointHoverBorderWidth: 3,
      },
    ],
  }

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: '#635bff',
        borderWidth: 1,
        cornerRadius: 12,
        displayColors: false,
        padding: 12,
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        },
        callbacks: {
          title: function(context) {
            return `时间: ${context[0].label}`
          },
          label: function(context) {
            return `收入: ${formatCurrency(context.parsed.y)}`
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 12,
          },
          maxTicksLimit: 8
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.06)',
        },
        border: {
          display: false,
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 12,
          },
          callback: function(value) {
            const numValue = Number(value)
            return formatCurrency(numValue, 'HKD').replace('HK$', 'HK$') + 'K'
          },
          maxTicksLimit: 6
        },
      },
    },
    elements: {
      point: {
        hoverBackgroundColor: '#635bff',
        hoverBorderColor: 'white',
        hoverBorderWidth: 3
      },
    },
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart'
    },
    onHover: (event, activeElements) => {
      const canvas = chartRef.current?.canvas
      if (canvas) {
        canvas.style.cursor = activeElements.length > 0 ? 'pointer' : 'default'
      }
    }
  }

  // 图表更新动画
  useEffect(() => {
    const chart = chartRef.current
    if (chart) {
      chart.update('active')
    }
  }, [data])

  return (
    <Card variant="glass" className="border-0 overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
            {title}
          </CardTitle>
          
          {/* 图表控制按钮（将来可以添加时间范围选择等） */}
          <div className="flex gap-1">
            <button className="px-3 py-1 text-xs bg-primary-50 text-primary-600 rounded-full">
              24H
            </button>
            <button className="px-3 py-1 text-xs text-gray-500 hover:text-gray-700 rounded-full">
              7D
            </button>
            <button className="px-3 py-1 text-xs text-gray-500 hover:text-gray-700 rounded-full">
              30D
            </button>
          </div>
        </div>
        
        {/* 快速统计 */}
        <div className="flex gap-6 text-sm text-gray-600">
          <div>
            <span className="text-gray-500">最高: </span>
            <span className="font-medium text-green-600">
              {formatCurrency(Math.max(...data.map(d => d.value)))}
            </span>
          </div>
          <div>
            <span className="text-gray-500">最低: </span>
            <span className="font-medium text-red-600">
              {formatCurrency(Math.min(...data.map(d => d.value)))}
            </span>
          </div>
          <div>
            <span className="text-gray-500">平均: </span>
            <span className="font-medium text-blue-600">
              {formatCurrency(data.reduce((sum, d) => sum + d.value, 0) / data.length)}
            </span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div style={{ height: `${height}px` }}>
          <Line 
            ref={chartRef}
            data={chartData} 
            options={options} 
          />
        </div>
      </CardContent>
    </Card>
  )
}