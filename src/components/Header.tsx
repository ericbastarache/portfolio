import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledNav = styled.nav`
  background-color: ${props => props.theme.colors.main.primary};
  color: ${props => props.theme.colors.main.secondary};
`;

const NavigationMenu = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const NavigationItem = styled.li`
  display: flex;
  padding: 16px;
`;

const NavigationLink = styled(Link)`
  display: flex;
  color: ${props => props.theme.colors.accents.blue};
  font-weight: bold;
  text-decoration: none;
`;


const Header = () => {
  return (
    <StyledNav>
      <NavigationMenu>
        <NavigationItem>
          <NavigationLink to='/'>Home</NavigationLink>
        </NavigationItem>
        <NavigationItem>
        <NavigationLink to='/projects'>Projects</NavigationLink>
        </NavigationItem>
      </NavigationMenu>
    </StyledNav>
  );
};

export default Header;
