/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#bf7d7d',
    sndBackground: '#d2a5a5',
    trdBackground: '#e6c8c8',
    fthBackground: '#f5e6e6',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#bf7d7d',
    sndBackground: '#965f5f',
    trdBackground: '#784b4b',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

// theme.ts

export const LIGHT_COLORS = {
  gradientStart: '#BF7D7D',      // rich brick-brown (from coat/clothing)
  gradientEnd:   '#e6c8c8',      // deep espresso brown (from equipment/shadows)
  cardBg:        'rgba(255,255,255,0.15)',  // translucent white overlay
  cardBorder:    '#d19494',      // reinforce that brick-brown border
  textPrimary:   '#FFFFFF',      // crisp white for headlines
  textSecondary: 'rgba(255,255,255,0.8)',   // soft white for subtext
  accent:        '#bf643d',      // warm clay highlight (20% lighter than #8C3D27)
  checks:        '#82f075'
}

export const DARK_COLORS = {
  gradientStart: '#8C3D27',      // swap for darkest brown at top
  gradientEnd:   '#BF7D7D',      // invert gradient for dark mode
  cardBg:        'rgba(0,0,0,0.3)',          // slightly heavier dark overlay
  cardBorder:    '#4B3B3B',      // near-black charcoal border
  textPrimary:   '#F2E1DA',      // warm off-white for dark background
  textSecondary: 'rgba(242,225,218,0.7)',   // lighter off-white for subtext
  accent:        '#A08070',      // a bit brighter than light-mode accent
  checks:        '#62a65a'
}
