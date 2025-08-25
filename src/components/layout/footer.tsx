'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/layout/container'
import { Button } from '@/components/ui/button'
import { 
  ArrowRight,
  Github,
  Twitter,
  Linkedin,
  Mail,
  MapPin,
  Phone
} from 'lucide-react'

const footerLinks = {
  products: {
    title: 'Products',
    links: [
      { name: 'Payment Processing', href: '#payments' },
      { name: 'Billing System', href: '#billing' },
      { name: 'Platform Integration', href: '#connect' },
      { name: 'Enterprise Services', href: '#corporate' },
      { name: 'Payment Links', href: '#payment-links' },
      { name: 'Terminal', href: '#terminal' },
    ]
  },
  solutions: {
    title: 'Solutions',
    links: [
      { name: 'E-commerce Platform', href: '#ecommerce' },
      { name: 'Subscription Services', href: '#subscription' },
      { name: 'Marketplace Platform', href: '#marketplace' },
      { name: 'Mobile Applications', href: '#mobile-apps' },
      { name: 'Global Business', href: '#global' },
      { name: 'Startups', href: '#startups' },
    ]
  },
  developers: {
    title: 'Developers',
    links: [
      { name: 'API Documentation', href: '#api-docs' },
      { name: 'Code Samples', href: '#code-samples' },
      { name: 'SDK Downloads', href: '#sdks' },
      { name: 'Webhook', href: '#webhooks' },
      { name: 'Testing Tools', href: '#testing' },
      { name: 'Developer Forum', href: '#forum' },
    ]
  },
  resources: {
    title: 'Resources',
    links: [
      { name: 'Help Center', href: '#support' },
      { name: 'Blog', href: '#blog' },
      { name: 'Case Studies', href: '#case-studies' },
      { name: 'Whitepapers', href: '#whitepapers' },
      { name: 'Webinars', href: '#webinars' },
      { name: 'Status Page', href: '#status' },
    ]
  },
  company: {
    title: 'Company',
    links: [
      { name: 'About Us', href: '#about' },
      { name: 'Careers', href: '#careers' },
      { name: 'Press Center', href: '#press' },
      { name: 'Investor Relations', href: '#investors' },
      { name: 'Partners', href: '#partners' },
      { name: 'Contact Us', href: '#contact' },
    ]
  },
  legal: {
    title: 'Legal',
    links: [
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
      { name: 'Compliance', href: '#compliance' },
      { name: 'Cookie Policy', href: '#cookies' },
      { name: 'Security', href: '#security' },
      { name: '许可证', href: '#licenses' },
    ]
  }
}

const socialLinks = [
  { name: 'GitHub', icon: Github, href: '#github' },
  { name: 'Twitter', icon: Twitter, href: '#twitter' },
  { name: 'LinkedIn', icon: Linkedin, href: '#linkedin' },
]

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* CTA 区域 */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-purple-600">
        <Container>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to get started?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Unified per-transaction pricing with no hidden fees. Set up and operate your account in 10 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="group">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="ghost" className="text-white border-white hover:bg-white hover:text-primary-600">
                Contact Sales Team
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* 主要内容 */}
      <div className="py-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            {/* 公司信息 */}
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {/* Logo */}
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-purple-700 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">M</span>
                  </div>
                  <span className="text-xl font-bold">ModernPay</span>
                </div>

                <p className="text-gray-400 mb-6 leading-relaxed">
                  ModernPay is committed to making money movement as simple, programmable, and borderless as data transmission.
                  Our team and offices are distributed globally, serving companies of all sizes around the world.
                </p>

                {/* 联系信息 */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span>International Finance Centre, Central, Hong Kong</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <Phone className="w-4 h-4" />
                    <span>+852 3001 5005</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <Mail className="w-4 h-4" />
                    <span>hello@modernpay.com</span>
                  </div>
                </div>

                {/* 社交媒体 */}
                <div className="flex items-center gap-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* 链接网格 */}
            <div className="lg:col-span-8">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {Object.entries(footerLinks).map(([key, section], index) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <h3 className="font-semibold text-white mb-4">
                      {section.title}
                    </h3>
                    <ul className="space-y-3">
                      {section.links.map((link) => (
                        <li key={link.name}>
                          <a
                            href={link.href}
                            className="text-gray-400 hover:text-white transition-colors text-sm"
                          >
                            {link.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* 底部信息 */}
      <div className="border-t border-gray-800">
        <Container>
          <motion.div
            className="py-8 flex flex-col md:flex-row justify-between items-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-sm text-gray-400">
              © 2024 ModernPay Inc. All rights reserved.
            </div>
            
            <div className="flex items-center gap-6">
              <select className="bg-gray-800 text-gray-400 text-sm border border-gray-700 rounded px-3 py-1 focus:outline-none focus:border-primary-500">
                <option value="zh-CN">🇨🇳 简体中文</option>
                <option value="zh-HK">🇭🇰 繁體中文</option>
                <option value="en-US">🇺🇸 English</option>
                <option value="ja-JP">🇯🇵 日本語</option>
              </select>
              
              <div className="text-sm text-gray-400">
                香港金融管理局监管 (牌照号码: SVF0001)
              </div>
            </div>
          </motion.div>
        </Container>
      </div>
    </footer>
  )
}