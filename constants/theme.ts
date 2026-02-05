
export const Palette = {
  black: '#140000',
  white: '#FFFCEB',
  orangeDark: '#D74304',
  orangeLight: '#FF985C',
  green: '#00661D',
};

export const Colors = {
  light: {
    text: Palette.black,
    background: Palette.white,
    tint: Palette.orangeDark,
    icon: Palette.orangeDark,
    tabIconDefault: '#9BA1A6',
    tabIconSelected: Palette.orangeDark,
    primary: Palette.orangeDark,
    secondary: Palette.orangeLight,
    success: Palette.green,
  },
  dark: {
    text: Palette.white,
    background: Palette.black,
    tint: Palette.orangeLight,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: Palette.orangeLight,
    primary: Palette.orangeLight,
    secondary: Palette.orangeDark,
    success: Palette.green,
  },
};

export const FontsFamilies = {
  title: 'Unbounded_700Bold',
  titleRegular: 'Unbounded_400Regular',
  body: 'Fustat_400Regular',
  bodyBold: 'Fustat_700Bold',
};

export const Spacings = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 40,
};

export const FontSizes = {
  title: 34,
  subtitle: 20,
  body: 16,
  caption: 14,
  small: 12,
};

export const BorderRadius = {
  s: 8,
  m: 12,
  l: 16,
  full: 9999,
};
