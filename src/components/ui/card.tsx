import * as React from 'react'
import { cn } from '@/utils/cn'

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'default' | 'elevated' | 'outlined' | 'glass'
  }
>(({ className, variant = 'default', ...props }, ref) => {
  const variants = {
    default: "bg-white border border-gray-200 shadow-sm",
    elevated: "bg-white shadow-card hover:shadow-card-hover transition-shadow duration-300",
    outlined: "bg-white border-2 border-gray-100 hover:border-gray-200 transition-colors duration-200",
    glass: "bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg"
  }

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-xl text-gray-900 transition-all duration-300",
        variants[variant],
        className
      )}
      {...props}
    />
  )
})

Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))

CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  }
>(({ className, as: Component = 'h3', ...props }, ref) => (
  <Component
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight text-gray-900",
      className
    )}
    {...props}
  />
))

CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-gray-600 leading-relaxed", className)}
    {...props}
  />
))

CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))

CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))

CardFooter.displayName = "CardFooter"

// Metric Card - 专门用于仪表盘指标展示
const MetricCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    title?: string
    value?: string | number
    trend?: {
      value: number
      direction: 'up' | 'down'
    }
    icon?: React.ReactNode
    loading?: boolean
  }
>(({ className, title, value, trend, icon, loading = false, children, ...props }, ref) => (
  <Card
    ref={ref}
    variant="glass"
    className={cn(
      "relative overflow-hidden group hover:scale-105 transition-all duration-300",
      "before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary-600/5 before:to-purple-600/5",
      "before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
      className
    )}
    {...props}
  >
    <CardHeader className="pb-2">
      <div className="flex items-center justify-between">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        {icon && (
          <div className="text-gray-400 group-hover:text-primary-500 transition-colors duration-200">
            {icon}
          </div>
        )}
      </div>
    </CardHeader>
    
    <CardContent>
      {loading ? (
        <div className="space-y-3">
          <div className="h-8 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-100 rounded animate-pulse w-2/3" />
        </div>
      ) : (
        <>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {value}
          </div>
          
          {trend && (
            <div className={cn(
              "flex items-center gap-1 text-sm font-medium",
              trend.direction === 'up' ? 'text-green-600' : 'text-red-600'
            )}>
              <span className={cn(
                "inline-block w-0 h-0 border-l-[4px] border-r-[4px] border-l-transparent border-r-transparent",
                trend.direction === 'up' 
                  ? 'border-b-[6px] border-b-green-600' 
                  : 'border-t-[6px] border-t-red-600'
              )} />
              {trend.value}%
            </div>
          )}
          
          {children}
        </>
      )}
    </CardContent>
    
    {/* Decorative gradient overlay */}
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-600 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
  </Card>
))

MetricCard.displayName = "MetricCard"

export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent,
  MetricCard
}