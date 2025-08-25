'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  CreditCard, 
  Globe, 
  Shield, 
  Zap,
  Users,
  Code,
  BarChart3,
  ArrowRight
} from 'lucide-react'

const features = [
  {
    id: 'payments',
    icon: CreditCard,
    title: 'Global Payment Processing',
    description: 'Increase authorization rates, offer local payment methods to boost conversion, and reduce fraud using AI',
    features: [
      'Support for 135+ currencies',
      'Local payment method optimization',
      'AI-powered fraud detection',
      'Real-time risk assessment',
      'One-click refund processing'
    ],
    gradient: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    cta: {
      text: 'Learn About Payments',
      href: '#payments-detail'
    }
  },
  {
    id: 'billing',
    icon: BarChart3,
    title: 'Smart Billing System',
    description: 'Manage fixed rates, usage-based and hybrid pricing models to minimize customer churn',
    features: [
      'Flexible pricing models',
      'Automated invoice generation',
      'Subscription management', 
      'Revenue recognition',
      'Tax compliance handling'
    ],
    gradient: 'bg-gradient-to-r from-green-500 to-emerald-500',
    cta: {
      text: 'Explore Billing Solutions',
      href: '#billing-detail'
    }
  },
  {
    id: 'connect',
    icon: Globe,
    title: 'Platform Integration',
    description: 'Integrate payment functionality into your platform or marketplace for end-to-end payment experience',
    features: [
      'Marketplace platform support',
      'Split payments and fund allocation',
      'KYC/KYB compliance',
      'Merchant onboarding management',
      'Real-time settlement'
    ],
    gradient: 'bg-gradient-to-r from-purple-500 to-indigo-500',
    cta: {
      text: 'Learn Platform Solutions',
      href: '#connect-detail'
    }
  },
  {
    id: 'corporate',
    icon: Shield,
    title: 'Enterprise Financial Services',
    description: 'Launch, manage and scale business card programs with no setup fees',
    features: [
      'Corporate credit card issuance',
      'Expense management system',
      'Real-time spending controls',
      'Financial reporting analytics',
      'Compliance monitoring'
    ],
    gradient: 'bg-gradient-to-r from-orange-500 to-red-500',
    cta: {
      text: 'Explore Enterprise Services',
      href: '#corporate-detail'
    }
  }
]

const stats = [
  {
    value: '13,000+',
    label: 'API Requests/sec',
    description: 'Peak processing capacity'
  },
  {
    value: '45+',
    label: 'Local Acquiring Countries', 
    description: 'Global coverage'
  },
  {
    value: '135+',
    label: 'Currencies & Payment Methods',
    description: 'Localization support'
  },
  {
    value: '99.99%',
    label: 'System Availability',
    description: 'Enterprise-grade stability'
  }
]

export function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <Container>
        {/* 标题部分 */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Use a fully integrated
            <span className="bg-gradient-to-r from-primary-700 to-purple-700 bg-clip-text text-transparent">
              AI-Powered Platform
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Help reduce costs, increase revenue and operate your business more efficiently. Let ModernPay handle all payment-related operations,
            assist you in managing revenue operations, and help launch new business models.
          </p>
        </motion.div>

        {/* 统计数据 */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                {stat.value}
              </div>
              <div className="font-semibold text-gray-900 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-gray-600">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 功能卡片网格 */}
        <div className="grid gap-8 md:grid-cols-2">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="h-full"
            >
              <Card className="h-full bg-gradient-to-br from-gray-50 to-gray-100/50 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
                {/* 背景装饰 */}
                <div className={`absolute top-0 right-0 w-32 h-32 ${feature.gradient} opacity-10 rounded-full blur-3xl group-hover:opacity-20 transition-opacity duration-300 -translate-y-8 translate-x-8`} />
                
                <CardHeader className="pb-4">
                  <div className={`w-14 h-14 rounded-xl ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </CardTitle>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  {/* 功能列表 */}
                  <ul className="space-y-3 mb-6">
                    {feature.features.map((item, itemIndex) => (
                      <motion.li
                        key={itemIndex}
                        className="flex items-start gap-3 text-sm text-gray-700"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + itemIndex * 0.05 }}
                      >
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-primary-600 to-purple-600 rounded-full mt-2 flex-shrink-0" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  {/* CTA 按钮 */}
                  <Button
                    variant="outline"
                    className="group/btn w-full group-hover:border-primary-300 group-hover:text-primary-700"
                  >
                    {feature.cta.text}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* 开发者工具部分 */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="max-w-3xl mx-auto mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Built for Developers
            </h3>
            <p className="text-lg text-gray-600">
              Save engineering time with integrated payment functionality. From React, PHP, to .NET and iOS,
              we provide everything that adapts to client and server libraries.
            </p>
          </div>

          {/* 开发者功能 */}
          <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
            {[
              {
                icon: Code,
                title: 'Rich SDKs',
                description: 'Official SDKs for all major programming languages'
              },
              {
                icon: Zap,
                title: 'Webhook Support',
                description: 'Real-time event notifications and status updates'
              },
              {
                icon: Users,
                title: 'Developer Community',
                description: 'Active developer community and technical support'
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                className="p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
              >
                <item.icon className="w-8 h-8 text-primary-600 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <Button
            size="lg"
            variant="outline"
            className="mt-8"
          >
            View API Documentation
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </Container>
    </section>
  )
}