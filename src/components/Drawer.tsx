import React from 'react';
import Terminal from '../components/Terminal';
import styled from "styled-components";
import Portal from '../components/Portal';
import TerminalIcon from '../icons/terminal.png'; 
import { TerminalContext } from '../context/TerminalContext';
import useTerminal from '../hooks/useTerminal';

const DrawerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 10px;
  right: 10px;
  z-index: 1;
  position: absolute;
  width: 50px;
  height: 50px;
`;

const DrawerIcon = styled.img`
  width: 100%;
  height: auto;
  cursor: pointer;
`;


const Drawer = () => {
  const { showTerminal, showTerminalAfterMinimize } = React.useContext(TerminalContext);
  return (
    <React.Fragment>
      <DrawerContainer onClick={showTerminalAfterMinimize}>
        <DrawerIcon src={TerminalIcon} />
      </DrawerContainer>
    </React.Fragment>
  );
};

export default Drawer;
