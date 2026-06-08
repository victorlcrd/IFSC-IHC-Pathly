import type { SVGProps } from 'react'

export type IconProps = SVGProps<SVGSVGElement> & {
  size?: number
}

function iconProps(size: number, props: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    ...props,
  }
}

export function IconGrid({ size = 16, ...props }: IconProps) {
  return (
    <svg {...iconProps(size, props)}>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  )
}

export function IconBook({ size = 16, ...props }: IconProps) {
  return (
    <svg {...iconProps(size, props)}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  )
}

export function IconTrophy({ size = 16, ...props }: IconProps) {
  return (
    <svg {...iconProps(size, props)}>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  )
}

export function IconFlag({ size = 16, ...props }: IconProps) {
  return (
    <svg {...iconProps(size, props)}>
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  )
}

export function IconUser({ size = 16, ...props }: IconProps) {
  return (
    <svg {...iconProps(size, props)}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

export function IconUsers({ size = 16, ...props }: IconProps) {
  return (
    <svg {...iconProps(size, props)}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

export function IconStar({ size = 22, ...props }: IconProps) {
  return (
    <svg {...iconProps(size, props)}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

export function IconFlame({ size = 22, ...props }: IconProps) {
  return (
    <svg {...iconProps(size, props)}>
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  )
}

export function IconCrown({ size = 22, ...props }: IconProps) {
  return (
    <svg {...iconProps(size, props)}>
      <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" />
    </svg>
  )
}

export function IconCheckCircle({ size = 16, ...props }: IconProps) {
  return (
    <svg {...iconProps(size, props)}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}

export function IconCircle({ size = 16, ...props }: IconProps) {
  return (
    <svg {...iconProps(size, props)}>
      <circle cx="12" cy="12" r="10" />
    </svg>
  )
}

export function IconPlay({ size = 28, ...props }: IconProps) {
  return (
    <svg {...iconProps(size, props)}>
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" />
    </svg>
  )
}

export function IconList({ size = 20, ...props }: IconProps) {
  return (
    <svg {...iconProps(size, props)}>
      <path d="M3 3h18v4H3z" />
      <path d="M3 10h18v4H3z" />
      <path d="M3 17h18v4H3z" />
    </svg>
  )
}

export function IconLock({ size = 18, ...props }: IconProps) {
  return (
    <svg {...iconProps(size, { strokeWidth: 2.2, ...props })}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

export function IconCode({ size = 28, ...props }: IconProps) {
  return (
    <svg {...iconProps(size, props)}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
}

export function IconZap({ size = 28, ...props }: IconProps) {
  return (
    <svg {...iconProps(size, props)}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
}
