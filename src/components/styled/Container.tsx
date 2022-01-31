import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    height: 100%;
    padding: 16px 24px;
    background-color: ${props => props.theme.colors.main.background};
`;

export default Container;
