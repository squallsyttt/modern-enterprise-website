import { Header } from '@/components/layout/header'
import { Hero } from '@/components/sections/hero'
import { Features } from '@/components/sections/features'
import { Dashboard } from '@/components/dashboard/dashboard'
import { Testimonials } from '@/components/sections/testimonials'
import { Footer } from '@/components/layout/footer'

export default function Home() {
  return (
    <>
      {/* 导航栏 */}
      <Header />
      
      <main className="min-h-screen">
        {/* Hero 区域 */}
        <Hero />
        
        {/* 产品功能展示 */}
        <Features />
        
        {/* 仪表盘展示区域 */}
        <section id="dashboard" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 mb-16">
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Real-time Business
                <span className="bg-gradient-to-r from-primary-700 to-purple-700 bg-clip-text text-transparent">
                  Data Insights
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Experience a modern data dashboard that tracks business metrics in real-time, supports keyboard shortcuts, and multi-dimensional data visualization.
                This showcases the business insight capabilities we provide to our clients.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm">
                💡 Tip: Press <kbd className="px-2 py-1 bg-white rounded text-xs">?</kbd> to view keyboard shortcuts
              </div>
            </div>
          </div>
          <Dashboard />
        </section>

        {/* 客户案例和评价 */}
        <Testimonials />
      </main>
      
      {/* 页脚 */}
      <Footer />
    </>
  )
}