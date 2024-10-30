import { useMediaQuery } from 'react-responsive'

// Same as tailwind's responsive. See https://tailwindcss.com/docs/responsive-design
export const responsiveConfig = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
}

export const useResponsive = (config?: Partial<typeof responsiveConfig>) => ({
  isSm: useMediaQuery({ minWidth: config?.sm || responsiveConfig.sm }),
  isMd: useMediaQuery({ minWidth: config?.md || responsiveConfig.md }),
  isLg: useMediaQuery({ minWidth: config?.lg || responsiveConfig.lg }),
  isXl: useMediaQuery({ minWidth: config?.xl || responsiveConfig.xl }),
  is2Xl: useMediaQuery({ minWidth: config?.xxl || responsiveConfig.xxl }),

  isMaxSm: useMediaQuery({ maxWidth: config?.sm || responsiveConfig.sm }),
  isMaxMd: useMediaQuery({ maxWidth: config?.md || responsiveConfig.md }),
  isMaxLg: useMediaQuery({ maxWidth: config?.lg || responsiveConfig.lg }),
  isMaxXl: useMediaQuery({ maxWidth: config?.xl || responsiveConfig.xl }),
  isMax2Xl: useMediaQuery({ maxWidth: config?.xxl || responsiveConfig.xxl }),
})
