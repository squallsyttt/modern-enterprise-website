'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Transaction } from '@/types'
import { formatCurrency, formatTimestamp } from '@/data/metrics'
import { 
  ArrowDownLeft, 
  ArrowUpRight, 
  ArrowRightLeft,
  Clock,
  CheckCircle,
  XCircle,
  MoreHorizontal
} from 'lucide-react'
import { cn } from '@/utils/cn'

interface TransactionsListProps {
  transactions: Transaction[]
  title?: string
}

export function TransactionsList({ 
  transactions, 
  title = "最近交易" 
}: TransactionsListProps) {
  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'payment':
        return <ArrowDownLeft className="w-4 h-4 text-green-600" />
      case 'payout':
        return <ArrowUpRight className="w-4 h-4 text-blue-600" />
      case 'refund':
        return <ArrowRightLeft className="w-4 h-4 text-red-600" />
      default:
        return <MoreHorizontal className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getTransactionColor = (type: Transaction['type']) => {
    switch (type) {
      case 'payment':
        return 'text-green-600'
      case 'payout':
        return 'text-blue-600'
      case 'refund':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const getTransactionBg = (type: Transaction['type']) => {
    switch (type) {
      case 'payment':
        return 'bg-green-50 border-green-200'
      case 'payout':
        return 'bg-blue-50 border-blue-200'
      case 'refund':
        return 'bg-red-50 border-red-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  return (
    <Card variant="glass" className="border-0">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            {title}
          </CardTitle>
          <div className="text-sm text-gray-500">
            {transactions.length} 笔交易
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {transactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className={cn(
                "flex items-center gap-3 p-3 rounded-lg border transition-all duration-200",
                "hover:shadow-md hover:scale-105 cursor-pointer",
                getTransactionBg(transaction.type)
              )}
            >
              {/* 交易类型图标 */}
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm">
                {getTransactionIcon(transaction.type)}
              </div>

              {/* 交易信息 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {transaction.description}
                  </p>
                  {getStatusIcon(transaction.status)}
                </div>
                
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{formatTimestamp(transaction.timestamp)}</span>
                  {transaction.customer && (
                    <>
                      <span>•</span>
                      <span className="truncate">{transaction.customer}</span>
                    </>
                  )}
                </div>
              </div>

              {/* 金额 */}
              <div className="flex-shrink-0 text-right">
                <div className={cn(
                  "text-sm font-semibold",
                  getTransactionColor(transaction.type)
                )}>
                  {transaction.amount > 0 ? '+' : ''}
                  {formatCurrency(transaction.amount)}
                </div>
                
                <div className="text-xs text-gray-500 capitalize">
                  {transaction.status}
                </div>
              </div>
            </motion.div>
          ))}

          {/* 空状态 */}
          {transactions.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <div className="w-12 h-12 bg-gray-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                <ArrowRightLeft className="w-6 h-6" />
              </div>
              <p className="text-sm">暂无交易记录</p>
            </div>
          )}
        </div>

        {/* 查看更多按钮 */}
        {transactions.length > 0 && (
          <motion.div 
            className="mt-4 pt-4 border-t border-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <button className="w-full text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors">
              查看所有交易
            </button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}