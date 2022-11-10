import { extendTheme } from '@chakra-ui/react'


const fonts = {
  body: 'system-ui, sans-serif',
  heading: 'Conthrax, system-ui, sans-serif',
  mono: 'Menlo, monospace',
}

const breakpoints = {
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
}

const colors = {
  pink: {
    50: '#FDE8EF',
    100: '#F9BED2',
    200: '#F494B5',
    300: '#F06B98',
    400: '#EC417B',
    500: '#E8175D',
    600: '#BA124B',
    700: '#8B0E38',
    800: '#5D0925',
    900: '#2E0513',
  },
  blue: {
    50: '#EFF1F6',
    100: '#D2D8E4',
    200: '#B5BFD3',
    300: '#98A6C2',
    400: '#7C8DB1',
    500: '#5F75A0',
    600: '#4C5D80',
    700: '#394660',
    800: '#262F40',
    900: '#131720',
  },
  purple: {
    50: '#EEF0F7',
    100: '#CED6E8',
    200: '#AFBBDA',
    300: '#90A0CB',
    400: '#7186BC',
    500: '#516BAE',
    600: '#41568B',
    700: '#314068',
    800: '#212B45',
    900: '#101523',
  },
  orange: {
    50: '#FDEDE8',
    100: '#F9CDBE',
    200: '#F5AD94',
    300: '#F18D6A',
    400: '#ED6D40',
    500: '#E94D16',
    600: '#BA3E12',
    700: '#8C2E0D',
    800: '#5D1F09',
    900: '#2F0F04',
  },
  yellow: {
    50: '#FEF5E6',
    100: '#FCE3BA',
    200: '#FBD18E',
    300: '#F9BF62',
    400: '#F7AD36',
    500: '#F59B0A',
    600: '#C47C08',
    700: '#935D06',
    800: '#623E04',
    900: '#311F02',
  },
  brand: {
    200: '#FFCC80',
    300: '#FF8A65',
    400: '#EC407A',
    500: '#E5395',
    600: '#D32F2F',
    700: '#FBC02D',
  },
}

const fontSizes = {
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
  '6xl': '3.75rem',
  '7xl': '4.5rem',
  '8xl': '6rem',
  '9xl': '8rem',
}

const fontWeights = {
  hairline: 100,
  thin: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
}

const lineHeights = {
  normal: 'normal',
  none: 1,
  shorter: 1.25,
  short: 1.375,
  base: 1.5,
  tall: 1.625,
  taller: '2',
  '3': '.75rem',
  '4': '1rem',
  '5': '1.25rem',
  '6': '1.5rem',
  '7': '1.75rem',
  '8': '2rem',
  '9': '2.25rem',
  '10': '2.5rem',
}

const letterSpacings = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
}

const spacing = {
  space: {
    px: '1px',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem',
  },
}

const sizes = {
  sizes: {
    ...spacing.space,
    max: 'max-content',
    min: 'min-content',
    full: '100%',
    '3xs': '14rem',
    '2xs': '16rem',
    xs: '20rem',
    sm: '24rem',
    md: '28rem',
    lg: '32rem',
    xl: '36rem',
    '2xl': '42rem',
    '3xl': '48rem',
    '4xl': '56rem',
    '5xl': '64rem',
    '6xl': '72rem',
    '7xl': '80rem',
    '8xl': '90rem',
    container: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  },
}

const borderRadius = {
  radii: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
}

const theme = extendTheme({
  colors,
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacings,
  spacing,
  breakpoints,
  sizes,
  borderRadius,
  config: {
    useSystemColorMode: true,
  },
})

export default theme
