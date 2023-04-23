import {extendTheme} from 'native-base';
import {colors} from './colors';
import {typography} from './typography';

export const theme = extendTheme({
  colors: colors,
  typography: typography,
  fontConfig: {
    Montserrat: {
      100: {
        normal: 'Montserrat-Light',
        italic: 'Montserrat-LightItalic',
      },
      200: {
        normal: 'Montserrat-Light',
        italic: 'Montserrat-LightItalic',
      },
      300: {
        normal: 'Montserrat-Light',
        italic: 'Montserrat-LightItalic',
      },
      400: {
        normal: 'Montserrat-Regular',
        italic: 'Montserrat-Italic',
      },
      500: {
        normal: 'Montserrat-Medium',
        italic: 'Montserrat-MediumItalic',
      },
      600: {
        normal: 'Montserrat-Medium',
        italic: 'Montserrat-MediumItalic',
      },
      700: {
        normal: 'Montserrat-Bold',
        italic: 'Montserrat-BoldItalic',
      },
      800: {
        normal: 'Montserrat-Bold',
        italic: 'Montserrat-BoldItalic',
      },
      900: {
        normal: 'Montserrat-Bold',
        italic: 'Montserrat-BoldItalic',
      },
    },
  },
  fonts: {
    heading: 'Montserrat-Bold',
    body: 'Montserrat-Regular',
    mono: 'Montserrat-Regular',
  },
  opacity: {
    0: 0,
    5: 0.05,
    10: 0.1,
    20: 0.2,
    25: 0.25,
    30: 0.3,
    40: 0.4,
    50: 0.5,
    60: 0.6,
    70: 0.7,
    75: 0.75,
    80: 0.8,
    90: 0.9,
    95: 0.95,
    100: 1,
  },

  config: {
    //initialColorMode: 'dark',
    useSystemColorMode: true,
  },
});

// TS Config, so custom variants (for example) are allowed/known
type CustomThemeType = typeof theme;

declare module 'native-base' {
  interface ICustomTheme extends CustomThemeType {}
}
