type ThemeObject = {
  [key: string]: {
    colors: {
      main: {
        background: string;
        primary: string;
        secondary: string;
      };
      accents: {
        red: string;
        lightBlue: string;
        blue: string;
      };
      danger: string;
      success: string;
      warning: string;
    },
    font: {
      size: number;
      weight: string;
      family: string;
    }
  }
}

export const theme: ThemeObject = {
  light: {
    colors: {
      main: {
        background: '#fff',
        primary: '#fafaff',
        secondary: '#32292f',
      },
      accents: {
        red: '#b56576',
        lightBlue: '#4f86c8',
        blue: '#1768ac'
      },
      danger: '#FC5B57',
      success: '#57C038',
      warning: '#E5BF3C'
    },
    font: {
      size: 20,
      weight: 'normal',
      family: 'sans-serif'
    }
  },
  dark: {
    colors: {
      main: {
        background: '#161111',
        primary: '#32292f',
        secondary: '#fafaff',
      },
      accents: {
        red: '#b56576',
        lightBlue: '#4f86c8',
        blue: '#1768ac'
      },
      danger: '#FC5B57',
      success: '#57C038',
      warning: '#E5BF3C'
    },
    font: {
      size: 20,
      weight: 'normal',
      family: 'sans-serif'
    }
  }
};

export default theme;
