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

const Projects = () => {
  const { showTerminal, setDefaultMessage } = React.useContext(TerminalContext);
  const mountingRef = React.useRef<HTMLDivElement | null>(null);
  
  React.useEffect(() => {
    try {
      const defaultMessage = window.sessionStorage.getItem('defaultMessage');
      if (defaultMessage) {
        setDefaultMessage(false)
      }
    } catch (err) {
      console.error(err);
    }
  }, [setDefaultMessage]);

  return (
      <Container>
        <Heading>Projects</Heading>
        <RefElement style={{ width: 'auto', height: 'auto' }} ref={mountingRef}>
        </RefElement>
        <Blurb>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris pharetra ex non efficitur tristique. Donec et sapien lacus. Suspendisse egestas euismod sagittis. Vestibulum sem justo, ornare in ligula sit amet, ullamcorper tristique ipsum. Nullam dui erat, luctus eget scelerisque a, bibendum vel ex. Aliquam sagittis pretium massa, quis aliquam nunc ullamcorper at. Sed fringilla maximus turpis, vestibulum accumsan urna efficitur vitae. Aenean non lacus a est venenatis volutpat id a orci. Aliquam erat volutpat. Ut bibendum sem vitae purus bibendum, a imperdiet ligula rutrum. Pellentesque malesuada dui quis sem varius vehicula.</Blurb>
        {showTerminal && (
          <Portal domNode={mountingRef} />
        )}
      </Container>
  );
};

export default Projects;
