// ----------------------------------------------------------------------

export const themeConfig = {
  /** **************************************
   * Base
   *************************************** */
  defaultMode: 'light',
  modeStorageKey: 'theme-mode',
  direction: 'ltr',
  classesPrefix: 'minimal',
  /** **************************************
   * Css variables
   *************************************** */
  cssVariables: {
    cssVarPrefix: '',
    colorSchemeSelector: 'data-color-scheme',
  },
  /** **************************************
   * Typography
   *************************************** */
  fontFamily: {
    primary: 'Public Sans Variable',
    secondary: 'Barlow',
  },
  /** **************************************
   * Palette
   *************************************** */
  palette: {
    primary: {
      lighter: '#E3F2FD',
      light: '#90CAF9',
      main: '#2196F3',
      dark: '#1976D2',
      darker: '#0D47A1',
      contrastText: '#FFFFFF',
    },
    secondary: {
      lighter: '#EDE7F6',
      light: '#B39DDB',
      main: '#673AB7',
      dark: '#5E35B1',
      darker: '#4527A0',
      contrastText: '#FFFFFF',
    },
    info: {
      lighter: '#D0F2FF',
      light: '#74CAFF',
      main: '#1890FF',
      dark: '#0C53B7',
      darker: '#04297A',
      contrastText: '#FFFFFF',
    },
    success: {
      lighter: '#E9FCDA',
      light: '#A8E08D',
      main: '#54D62C',
      dark: '#229A16',
      darker: '#08660D',
      contrastText: '#FFFFFF',
    },
    warning: {
      lighter: '#FFF7CD',
      light: '#FFD78C',
      main: '#FFC107',
      dark: '#B78103',
      darker: '#7A4F01',
      contrastText: '#1C252E',
    },
    error: {
      lighter: '#FFE7D9',
      light: '#FFA480',
      main: '#FF4842',
      dark: '#B72136',
      darker: '#7A0C2E',
      contrastText: '#FFFFFF',
    },
    grey: {
      50: '#FCFDFD',
      100: '#F9FAFB',
      200: '#F4F6F8',
      300: '#DFE3E8',
      400: '#C4CDD5',
      500: '#919EAB',
      600: '#637381',
      700: '#454F5B',
      800: '#1C252E',
      900: '#141A21',
    },
    common: {
      black: '#000000',
      white: '#FFFFFF',
    },
  },
};
