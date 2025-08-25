'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Keyboard, X, Zap, Play, Pause } from 'lucide-react'
import { useKeyboardShortcuts, ShortcutAction } from '@/hooks/use-keyboard-shortcuts'

interface KeyboardShortcutsProps {
  isLive: boolean
  onToggleLive: () => void
  onRefresh: () => void
  onThemeChange?: (theme: string) => void
}

export function KeyboardShortcuts({ 
  isLive, 
  onToggleLive, 
  onRefresh,
  onThemeChange
}: KeyboardShortcutsProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTheme, setActiveTheme] = useState('default')

  const handleThemeChange = useCallback((theme: string) => {
    setActiveTheme(theme)
    onThemeChange?.(theme)
    // 这里可以实现主题切换逻辑
  }, [onThemeChange])

  const shortcuts: ShortcutAction[] = [
    // 控制类快捷键
    {
      key: 'p',
      description: '暂停/播放实时数据',
      action: onToggleLive,
      category: '控制'
    },
    {
      key: 'r',
      description: '刷新数据',
      action: onRefresh,
      category: '控制'
    },
    {
      key: '?',
      description: '显示/隐藏快捷键',
      action: () => setIsVisible(!isVisible),
      category: '帮助'
    },
    {
      key: 'Escape',
      description: '关闭面板',
      action: () => setIsVisible(false),
      category: '导航'
    },
    
    // 主题切换快捷键
    {
      key: '1',
      description: '红色主题',
      action: () => handleThemeChange('red'),
      category: '主题'
    },
    {
      key: '2',
      description: '蓝色主题',
      action: () => handleThemeChange('blue'),
      category: '主题'
    },
    {
      key: '3',
      description: '黄色主题',
      action: () => handleThemeChange('yellow'),
      category: '主题'
    },
    {
      key: '4',
      description: '紫色主题',
      action: () => handleThemeChange('purple'),
      category: '主题'
    },
    
    // 导航快捷键
    {
      key: 'ArrowLeft',
      description: '快退（时间线）',
      action: () => console.log('快退'),
      category: '时间线'
    },
    {
      key: 'ArrowRight',
      description: '快进（时间线）',
      action: () => console.log('快进'),
      category: '时间线'
    },
    {
      key: 'ArrowUp',
      description: '增加数据振幅',
      action: () => console.log('增加振幅'),
      category: '数据'
    },
    {
      key: 'ArrowDown',
      description: '减少数据振幅',
      action: () => console.log('减少振幅'),
      category: '数据'
    },
    {
      key: '=',
      description: '放大视图',
      action: () => console.log('放大'),
      category: '视图'
    },
    {
      key: '-',
      description: '缩小视图',
      action: () => console.log('缩小'),
      category: '视图'
    },
  ]

  useKeyboardShortcuts(shortcuts)

  const groupedShortcuts = shortcuts.reduce((groups, shortcut) => {
    const category = shortcut.category || '其他'
    if (!groups[category]) {
      groups[category] = []
    }
    groups[category].push(shortcut)
    return groups
  }, {} as Record<string, ShortcutAction[]>)

  const getKeyDisplay = (key: string) => {
    const keyMap: Record<string, string> = {
      'ArrowLeft': '←',
      'ArrowRight': '→',
      'ArrowUp': '↑',
      'ArrowDown': '↓',
      'Escape': 'Esc',
      ' ': 'Space'
    }
    return keyMap[key] || key.toUpperCase()
  }

  return (
    <>
      {/* 快捷键提示按钮 */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <Button
          onClick={() => setIsVisible(true)}
          className="rounded-full w-14 h-14 shadow-lg hover:shadow-xl group relative"
          size="icon"
          variant="glow"
        >
          <Keyboard className="w-6 h-6" />
          
          {/* 脉冲动画提示 */}
          <div className="absolute inset-0 rounded-full bg-primary-500 opacity-20 animate-ping" />
          
          {/* 悬停提示 */}
          <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            快捷键 (?)
          </div>
        </Button>
      </motion.div>

      {/* 状态指示器 */}
      <motion.div
        className="fixed bottom-6 left-6 z-40"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <div className="flex items-center gap-2 px-3 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-white/20">
          {isLive ? (
            <>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <Play className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">实时</span>
            </>
          ) : (
            <>
              <div className="w-2 h-2 bg-gray-400 rounded-full" />
              <Pause className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">已暂停</span>
            </>
          )}
          <div className="text-xs text-gray-500 ml-2">按 P 切换</div>
        </div>
      </motion.div>

      {/* 快捷键面板 */}
      <AnimatePresence>
        {isVisible && (
          <>
            {/* 背景遮罩 */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsVisible(false)}
            />
            
            {/* 快捷键面板 */}
            <motion.div
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-4xl max-h-[80vh] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 20 }}
            >
              <Card variant="glass" className="border-0 shadow-2xl">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-purple-700 rounded-lg flex items-center justify-center">
                        <Zap className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">Keyboard Shortcuts</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">
                          Use shortcuts to quickly control the dashboard
                        </p>
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsVisible(false)}
                      className="rounded-full"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(groupedShortcuts).map(([category, categoryShortcuts]) => (
                      <motion.div
                        key={category}
                        className="space-y-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide border-b border-gray-200 pb-2">
                          {category}
                        </h3>
                        
                        <div className="space-y-2">
                          {categoryShortcuts.map((shortcut, index) => (
                            <motion.div
                              key={`${category}-${shortcut.key}`}
                              className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.05 * index }}
                            >
                              <span className="text-sm text-gray-700 flex-1">
                                {shortcut.description}
                              </span>
                              
                              <kbd className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-mono rounded border border-gray-300 shadow-sm min-w-[24px] text-center">
                                {shortcut.modifier && `${shortcut.modifier.toUpperCase()} + `}
                                {getKeyDisplay(shortcut.key)}
                              </kbd>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* 底部提示 */}
                  <motion.div 
                    className="mt-8 pt-6 border-t border-gray-200 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <p className="text-sm text-gray-600">
                      当前主题: <span className="font-medium text-primary-600">{activeTheme}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      按 <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Esc</kbd> 或点击背景关闭此面板
                    </p>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}