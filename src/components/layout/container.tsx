import React from 'react'
import { cn } from '@/utils/cn'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  as?: keyof React.JSX.IntrinsicElements
}

const containerSizes = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl', 
  lg: 'max-w-7xl',
  xl: 'max-w-screen-2xl',
  full: 'max-w-none'
}

export function Container({ 
  children, 
  className, 
  size = 'lg',
  as: Component = 'div'
}: ContainerProps) {
  return (
    <Component className={cn(
      'mx-auto px-4 sm:px-6 lg:px-8',
      containerSizes[size],
      className
    )}>
      {children}
    </Component>
  )
}

// 特殊的 Dashboard Container
export function DashboardContainer({ 
  children, 
  className 
}: { 
  children: React.ReactNode 
  className?: string 
}) {
  return (
    <div className={cn(
      'min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 lg:p-8',
      className
    )}>
      <Container size="xl" className="space-y-8">
        {children}
      </Container>
    </div>
  )
}