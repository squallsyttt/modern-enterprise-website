'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/layout/container'
import { ArrowRight, Play, CheckCircle } from 'lucide-react'

// 预生成固定的粒子配置，避免 hydration 不匹配
const particleConfigs = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  initialX: (i * 37 + 100) % 1200, // 伪随机但固定的位置
  initialY: (i * 73 + 200) % 800,
  initialOpacity: ((i * 13) % 50) / 100,
  duration: 10 + (i % 10), // 10-19 秒的动画时长
}))

const companyLogos = [
  { name: 'OpenAI', width: 80 },
  { name: 'Amazon', width: 100 },
  { name: 'Google', width: 85 },
  { name: 'Microsoft', width: 110 },
  { name: 'Shopify', width: 90 },
  { name: 'Airbnb', width: 75 },
  { name: 'Uber', width: 70 },
  { name: 'Netflix', width: 95 },
]

const typewriterTexts = [
  "Join millions of companies worldwide",
  "Build payment systems with modern technology", 
  "Make money movement simple and reliable"
]

export function Hero() {
  const [displayText, setDisplayText] = useState('')
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const { scrollY } = useScroll()
  
  const y = useTransform(scrollY, [0, 300], [0, -50])
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8])

  // 打字机效果
  useEffect(() => {
    const currentText = typewriterTexts[currentTextIndex]
    
    if (isTyping && currentCharIndex < currentText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + currentText[currentCharIndex])
        setCurrentCharIndex(prev => prev + 1)
      }, 50)
      return () => clearTimeout(timeout)
    } else if (isTyping && currentCharIndex === currentText.length) {
      // 完成当前文本，等待2秒后开始删除
      const timeout = setTimeout(() => {
        setIsTyping(false)
      }, 2000)
      return () => clearTimeout(timeout)
    } else if (!isTyping && displayText.length > 0) {
      // 删除文本
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev.slice(0, -1))
      }, 30)
      return () => clearTimeout(timeout)
    } else if (!isTyping && displayText.length === 0) {
      // 切换到下一个文本
      setCurrentTextIndex(prev => (prev + 1) % typewriterTexts.length)
      setCurrentCharIndex(0)
      setIsTyping(true)
    }
  }, [currentTextIndex, currentCharIndex, isTyping, displayText])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-100 via-blue-50 to-purple-100">
      {/* 动态背景粒子 */}
      <div className="absolute inset-0 overflow-hidden">
        {particleConfigs.map((config) => (
          <motion.div
            key={config.id}
            className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
            initial={{
              x: config.initialX,
              y: config.initialY,
              opacity: config.initialOpacity,
            }}
            animate={{
              y: [null, -20, null],
              opacity: [null, 0.8, null],
            }}
            transition={{
              duration: config.duration,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>

      {/* 网格背景 */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <Container className="relative z-10 pt-20">
        <motion.div
          className="text-center max-w-5xl mx-auto"
          style={{ y, opacity }}
        >
          {/* 主标题 */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
              <span className="bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
                {displayText}
              </span>
              <motion.span
                className="inline-block w-1 h-16 bg-primary-600 ml-2"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </h1>
          </motion.div>

          {/* 副标题 */}
          <motion.p
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Use a fully integrated modern payment platform to reduce costs, increase revenue, and operate your business more efficiently
          </motion.p>

          {/* 特性亮点 */}
          <motion.div
            className="flex flex-wrap justify-center gap-6 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {['Global Payments', 'Real-time Data', 'Secure & Reliable', 'API-First'].map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-gray-700">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-medium">{feature}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA 按钮 */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button size="lg" variant="gradient" className="group text-lg px-8 py-4">
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="group text-lg px-8 py-4">
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </motion.div>

          {/* 信任指标 */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-sm text-gray-700 mb-8">Trusted by leading companies worldwide</p>
            
            {/* 公司标志网格 */}
            <div className="grid grid-cols-4 md:grid-cols-8 gap-8 items-center justify-items-center opacity-60">
              {companyLogos.map((logo, logoIndex) => (
                <motion.div
                  key={logo.name}
                  className="text-gray-600 font-semibold text-lg hover:text-gray-800 cursor-pointer"
                  whileHover={{ 
                    scale: 1.1, 
                    opacity: 1,
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 0.6, y: 0 }}
                  transition={{ delay: 0.8 + logoIndex * 0.1, duration: 0.2 }}
                  style={{ width: logo.width }}
                >
                  {logo.name}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 产品展示提示 */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 text-sm text-gray-600"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Scroll down to view product features
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>

      {/* 底部渐变 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent" />
    </section>
  )
}