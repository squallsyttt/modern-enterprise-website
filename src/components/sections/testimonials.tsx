'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/layout/container'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Star, 
  ArrowRight,
  TrendingUp,
  Users,
  Globe,
  Zap
} from 'lucide-react'

const testimonials = [
  {
    id: 1,
    company: 'TechFlow',
    logo: '🚀',
    industry: 'SaaS Platform',
    quote: 'After using ModernPay, our payment success rate increased by 23%, and customer conversion rate improved significantly.',
    author: 'Sarah Chen',
    position: 'Chief Technology Officer',
    metrics: {
      improvement: '23%',
      metric: 'Payment Success Rate Increase'
    },
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 2,
    company: 'GlobalMarket',
    logo: '🌐',
    industry: 'E-commerce Platform',
    quote: 'Global payments have become so simple, we can now easily enter new international markets.',
    author: 'James Rodriguez',
    position: 'Product Director',
    metrics: {
      improvement: '40+',
      metric: 'New Supported Countries'
    },
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    id: 3,
    company: 'StartupLab',
    logo: '💡',
    industry: 'Startup Company',
    quote: 'As a startup, ModernPay allows us to quickly launch payment features and focus on product development.',
    author: 'Emma Zhang',
    position: 'Founder',
    metrics: {
      improvement: '75%',
      metric: 'Development Time Saved'
    },
    gradient: 'from-purple-500 to-indigo-500'
  }
]

const caseStudies = [
  {
    company: 'Global AI Company',
    description: 'Startups powered by ModernPay can launch faster and scale with growth',
    results: [
      'Reduced payment processing costs by 30%',
      'Increased customer satisfaction by 45%',
      'Decreased fraud losses by 60%'
    ],
    category: 'enterprise'
  },
  {
    company: 'Category Trading Marketplace',
    description: 'Using low-code solutions to rapidly deploy multi-party payment systems',
    results: [
      'Completed payment integration in 7 days',
      'Support for 20+ payment methods',
      'Processing $10M+ annual transaction volume'
    ],
    category: 'marketplace'
  }
]

const useCases = [
  {
    title: 'Payment Links',
    subtitle: 'Low-code Payment Solutions',
    description: 'Launch payment features with low-code or no-code solutions to test your product ideas',
    icon: '🔗',
    features: ['No Programming Required', 'Rapid Deployment', 'Mobile Optimized'],
    cta: 'Try Payment Link'
  },
  {
    title: 'Billing',
    subtitle: 'Smart Subscription Billing',
    description: 'Provide usage-based billing methods, charging customers based on their usage',
    icon: '📊',
    features: ['Flexible Pricing', 'Automated Billing', 'Revenue Analytics'],
    cta: 'Explore Billing Solutions'
  }
]

export function Testimonials() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-100 to-gray-50">
      <Container>
        {/* Header Section */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Successful companies across industries are
            <span className="bg-gradient-to-r from-primary-700 to-purple-700 bg-clip-text text-transparent">
              achieving growth through ModernPay
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            From global AI companies to category trading marketplaces, successful companies across industries are achieving growth and expansion through ModernPay
          </p>
        </motion.div>

        {/* Customer Reviews */}
        <div className="grid gap-8 md:grid-cols-3 mb-20">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
                {/* Decorative Gradient */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-r ${testimonial.gradient} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-300`} />
                
                <CardContent className="p-6">
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  {/* Review Content */}
                  <blockquote className="text-gray-700 mb-6 leading-relaxed">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  
                  {/* Company Information */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{testimonial.logo}</span>
                        <div>
                          <div className="font-semibold text-gray-900">
                            {testimonial.company}
                          </div>
                          <div className="text-sm text-gray-600">
                            {testimonial.industry}
                          </div>
                        </div>
                      </div>
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">
                          {testimonial.author}
                        </div>
                        <div className="text-gray-600">
                          {testimonial.position}
                        </div>
                      </div>
                    </div>
                    
                    {/* Metrics */}
                    <div className="text-right">
                      <div className={`text-2xl font-bold bg-gradient-to-r ${testimonial.gradient} bg-clip-text text-transparent`}>
                        {testimonial.metrics.improvement}
                      </div>
                      <div className="text-xs text-gray-600">
                        {testimonial.metrics.metric}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Case Studies */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="grid gap-8 md:grid-cols-2">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.company}
                className="p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {study.company}
                </h3>
                <p className="text-gray-600 mb-6">
                  {study.description}
                </p>
                
                <div className="space-y-3">
                  {study.results.map((result, resultIndex) => (
                    <div key={resultIndex} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-sm text-gray-700">{result}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Use Cases */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Quick Start Solutions
          </h3>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            You can build API-based integrations yourself, or use our low-code or no-code solutions,
            simple to operate, easy to deploy, and powerful in functionality
          </p>

          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                className="p-8 rounded-2xl bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 group text-left"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{useCase.icon}</span>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900 mb-1">
                      {useCase.title}
                    </h4>
                    <div className="text-sm text-gray-800 font-semibold mb-3">
                      {useCase.subtitle}
                    </div>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {useCase.description}
                    </p>
                    
                    {/* Feature Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {useCase.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-3 py-1 bg-gray-800 text-white text-xs font-semibold rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    <Button variant="outline" className="group-hover:border-primary-300 group-hover:text-primary-700">
                      {useCase.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Metrics */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, value: '1M+', label: 'Active Merchants' },
              { icon: TrendingUp, value: '$100B+', label: 'Annual Transaction Volume' },
              { icon: Globe, value: '45+', label: 'Countries Covered' },
              { icon: Zap, value: '99.99%', label: 'System Stability' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <stat.icon className="w-8 h-8 text-primary-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}