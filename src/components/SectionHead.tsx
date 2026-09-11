import type { ReactNode } from 'react'

export function SectionHead({
  kicker,
  title,
  children,
  dark = false,
}: {
  kicker: string
  title: string
  children?: ReactNode
  dark?: boolean
}) {
  return (
    <div className="mb-11 max-w-[560px]">
      <div className="mb-2 text-sm font-semibold text-water-text">{kicker}</div>
      <h2 className={`text-[28px] leading-[1.15] sm:text-[38px] ${dark ? 'text-white' : ''}`}>{title}</h2>
      {children && (
        <p className={`mt-3 max-w-[480px] text-base ${dark ? 'text-[#C4CDC5]' : 'text-moss'}`}>{children}</p>
      )}
    </div>
  )
}
