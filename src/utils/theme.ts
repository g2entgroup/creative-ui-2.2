import { extendTheme } from '@chakra-ui/react'

const fonts = { mono: `'Menlo', monospace` }

const breakpoints = {
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
}

const theme = extendTheme({
  components: {
    Modal: {
      variants: {
        colorScheme: 'blackAlpha',
      },
    },
  },
  colors: {
    black: '#16161D',
  },
  fonts,
  breakpoints,
})

export default {
  ...theme,
  colors: {
    ...theme.colors,
    dark: { 100: '#CBD5E0' },
    light: { 100: '#f4f5f9' },
    primary: { 100: '#EC407A' },
    secondary: { 100: '#FFCA7F' },
    dm: {
      100: '#707070',
      200: '#595959',
      300: '#414141',
      400: '#2a2a2a',
      500: '#121212',
    },
    brand: {
      200: '#FFCC80',
      300: '#FF8A65',
      400: '#EC407A',
      500: '#E5395',
      600: '#D32F2F',
      700: '#FBC02D',
    },
  },
  // icons: {
  //     ...theme.icons,
  //     ...customIcons,
  // },
}

export const color1 = { light: 'dark.100', dark: 'white' }
export const color2 = { light: '#777', dark: 'light.100' }
export const color3 = { light: '#555', dark: 'light.100' }
export const bgColor1 = { light: 'light.100', dark: 'dm.400' }
export const bgColor2 = { light: 'secondary.100', dark: 'dm.100' }
export const bgColor3 = { light: 'dark.100', dark: 'dm.400' }
export const bgColor4 = { light: 'primary.100', dark: 'dm.500' }
export const bgColor5 = { light: 'secondary.100', dark: 'dm.100' }
export const bgColor6 = { light: 'dark.100', dark: 'primary.100' }
export const bgColor7 = { light: 'light.100', dark: 'dm.200' }
export const bgColor8 = { light: 'secondary.100', dark: 'dm.300' }
