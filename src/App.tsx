import React from 'react';
// import { Route, BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import logo from './logo.svg';
import Terminal from './components/Terminal';
import Header from './components/Header';
import { ThemeContext } from './context/ThemeContext';
import { TerminalContext } from './context/TerminalContext';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Drawer from './components/Drawer';
import { theme as themes } from './theme';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    transition: all 0.5s;
  }
  #root {
    height: 100vh;
    overflow-y: hidden;
  }
`;

function App() {
  const { theme } = React.useContext(ThemeContext);
  const { setDefaultMessage } = React.useContext(TerminalContext);
  return (
    <ThemeProvider theme={themes[theme]}>
      <GlobalStyle />
      <Router> 
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/projects' element={<Projects />} />
        </Routes>
        <Drawer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
