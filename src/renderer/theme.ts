import chroma from 'chroma-js'

export const defaultTheme = {
  colors: {
    body: '#fefefe',
    border: '#eeeeee',
    dogear: '#aaaaaa',
    dogearHover: chroma('#aaaaaa').darken(0.75).hex(),
    header: '#f2f2f3',
    headerHover: chroma('#f2f2f3').darken(0.75).hex(),
  },
} as const

export type Theme = typeof defaultTheme

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  interface DefaultTheme extends Theme {}
}
