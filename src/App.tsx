import React from 'react';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import logo from './logo.svg';
import Terminal from './components/Terminal';
import { ThemeContextProvider, ThemeContext } from './context/ThemeContext';
import Home from './pages/Home';
import { theme as themes } from './theme';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    transition: all 0.5s;
  }
  #root {
    height: 100%;
  }
`;

function App() {
  const { theme } = React.useContext(ThemeContext);
  return (
    <ThemeProvider theme={themes[theme]}>
      <div style={{ height: '100%' }}>
        <GlobalStyle />
        <Home>
          <Terminal />
        </Home>
      </div>
    </ThemeProvider>
  );
}

export default App;
