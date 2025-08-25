'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/layout/container'
import { Menu, X, ChevronDown } from 'lucide-react'

const navigation = [
  {
    name: 'Products',
    href: '#products',
    children: [
      { name: 'Payments', href: '#payments' },
      { name: 'Financial Services', href: '#financial-services' },
      { name: 'API Integration', href: '#api' },
      { name: 'Mobile Payments', href: '#mobile' },
    ]
  },
  {
    name: 'Solutions',
    href: '#solutions',
    children: [
      { name: 'E-commerce', href: '#ecommerce' },
      { name: 'Subscriptions', href: '#subscription' },
      { name: 'Marketplaces', href: '#marketplace' },
      { name: 'Enterprise', href: '#enterprise' },
    ]
  },
  {
    name: 'Developers',
    href: '#developers',
    children: [
      { name: 'API Documentation', href: '#docs' },
      { name: 'Code Examples', href: '#examples' },
      { name: 'SDK Downloads', href: '#sdk' },
      { name: 'Developer Community', href: '#community' },
    ]
  },
  {
    name: 'Resources',
    href: '#resources',
    children: [
      { name: 'Help Center', href: '#help' },
      { name: 'Blog', href: '#blog' },
      { name: 'Case Studies', href: '#case-studies' },
      { name: 'Whitepapers', href: '#whitepapers' },
    ]
  },
  { name: 'Pricing', href: '#pricing' },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const { scrollY } = useScroll()
  
  const headerBackground = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.95)']
  )
  
  const headerBlur = useTransform(
    scrollY,
    [0, 100],
    ['blur(0px)', 'blur(10px)']
  )

  const headerShadow = useTransform(
    scrollY,
    [0, 100],
    ['0px 0px 0px rgba(0, 0, 0, 0)', '0px 4px 12px rgba(0, 0, 0, 0.1)']
  )

  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null)
    }
    
    if (activeDropdown) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [activeDropdown])

  return (
    <motion.header
      className="fixed top-0 w-full z-50"
      style={{
        backgroundColor: headerBackground,
        backdropFilter: headerBlur,
        boxShadow: headerShadow,
      }}
    >
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-primary-700 to-purple-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="text-xl font-bold text-gray-900">ModernPay</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item, index) => (
              <div key={item.name} className="relative">
                {item.children ? (
                  <button
                    className="flex items-center px-3 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors rounded-lg hover:bg-gray-50"
                    onClick={(e) => {
                      e.stopPropagation()
                      setActiveDropdown(activeDropdown === item.name ? null : item.name)
                    }}
                  >
                    {item.name}
                    <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${
                      activeDropdown === item.name ? 'rotate-180' : ''
                    }`} />
                  </button>
                ) : (
                  <motion.a
                    href={item.href}
                    className="px-3 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors rounded-lg hover:bg-gray-50 block"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {item.name}
                  </motion.a>
                )}

                {/* Dropdown Menu */}
                {item.children && activeDropdown === item.name && (
                  <motion.div
                    className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {item.children.map((child) => (
                      <a
                        key={child.name}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {child.name}
                      </a>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button size="sm" variant="gradient">
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            className="lg:hidden py-4 border-t border-gray-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="space-y-2">
              {navigation.map((item) => (
                <div key={item.name}>
                  <a
                    href={item.href}
                    className="block px-3 py-2 text-gray-700 hover:text-gray-900 font-medium rounded-lg hover:bg-gray-50"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                  {item.children && (
                    <div className="ml-4 space-y-1">
                      {item.children.map((child) => (
                        <a
                          key={child.name}
                          href={child.href}
                          className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-50"
                          onClick={() => setIsOpen(false)}
                        >
                          {child.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 space-y-2 border-t border-gray-200">
                <Button variant="ghost" className="w-full justify-start">
                  Sign In
                </Button>
                <Button className="w-full" variant="gradient">
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </Container>
    </motion.header>
  )
}