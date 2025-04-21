import { ReactNode } from 'react'

interface SectionTitleProps {
  title: string
  subtitle?: string
  children?: ReactNode
}

export function SectionTitle({ title, subtitle, children }: SectionTitleProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
      <div>
        <h2 className="text-3xl font-bold text-amber-400">{title}</h2>
        {subtitle && (
          <p className="text-lg text-gray-400 mt-2">{subtitle}</p>
        )}
      </div>
      {children && (
        <div className="flex-shrink-0">
          {children}
        </div>
      )}
    </div>
  )
}