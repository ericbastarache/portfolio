type ThemeObject = {
  [key: string]: {
    colors: {
      primary: string;
      secondary: string;
      danger: string;
      success: string;
      warning: string;
    },
    font: {
      size: 16,
      weight: 'normal',
      family: 'sans-serif'
    }
  }
}

export const theme: ThemeObject = {
  light: {
    colors: {
      primary: '#fff',
      secondary: '#000',
      danger: '#e2443a',
      success: '#22aa27',
      warning: '#e1a22b'
    },
    font: {
      size: 16,
      weight: 'normal',
      family: 'sans-serif'
    }
  },
  dark: {
    colors: {
      primary: '#000',
      secondary: '#fff',
      danger: '#e2443a',
      success: '#22aa27',
      warning: '#e1a22b'
    },
    font: {
      size: 16,
      weight: 'normal',
      family: 'sans-serif'
    }
  }
};

export default theme;
