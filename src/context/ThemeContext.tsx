import React from 'react';
import { theme as Theme } from '../theme';

export interface ThemeContextInterface {
  theme: string;
  switchTheme: any;
};

const ThemeContext = React.createContext<ThemeContextInterface>({} as ThemeContextInterface);

const ThemeContextProvider: React.FC<{children: React.ReactNode}>  = ({ children }) => {
  const [theme, setTheme] = React.useState<string>("light");

  const switchTheme = (theme: string)  => setTheme(theme);

  return (
    <ThemeContext.Provider value={{ switchTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export {
  ThemeContextProvider,
  ThemeContext
}
