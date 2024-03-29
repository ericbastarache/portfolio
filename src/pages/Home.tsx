import React from 'react';
import styled from 'styled-components';
import Portal from '../components/Portal';
import Container from '../components/styled/Container';
import RefElement from '../components/styled/RefElement';
import { TerminalContext } from '../context/TerminalContext';

const Heading = styled.h1`
  display: flex;
  justify-content: center;
  text-align: center;
  margin-bottom: 24px;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  color: ${props => props.theme.colors.main.secondary};
`;

const Blurb = styled.p`
  color: ${props => props.theme.colors.main.secondary};
  display: flex;
  justify-content: center;
  margin: 24px auto;
  width: 950px;
  font-size: ${props => props.theme.font.size}px;
`;

const Home = () => {
  const mountingRef = React.useRef<HTMLDivElement | null>(null);
  const { showTerminal, setDefaultMessage } = React.useContext(TerminalContext);  

  React.useEffect(() => {
    try {
      const defaultMessage = window.sessionStorage.getItem('defaultMessage');
      if (!defaultMessage) {
        setDefaultMessage(true);
        window.sessionStorage.setItem('defaultMessage', JSON.stringify(false));
      }
    } catch (err) {
      console.error(err);
    }
  }, [setDefaultMessage]);

  return (
    <Container>
      <Heading>Welcome to my portfolio</Heading>
        <Blurb>My name is Eric and I'm a Senior Front End Engineer currently located in Toronto, Ontario. My focus is on creating performant applications with React, while sometimes dabbling in other frameworks / languages. When I'm not developing web applications, I'm travelling the world, spending my time outdoors, playing guitar, or learning something new.<br /><br />Note: My entire portfolio can be navigated using the terminal below. Try using the help command to get a full list of all available commands. If you ever minimize the terminal, the icon at the bottom of the screen can be used to restore it.</Blurb>
        <RefElement ref={mountingRef}></RefElement>
        {showTerminal && (
          <Portal domNode={mountingRef} />
        )}
    </Container>
  );
};

export default Home;
