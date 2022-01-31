import React from 'react';
import styled from 'styled-components';

const Screen = styled.div`
    display: block;
    position: relative;
    background-color: inherit;
    width: 100%;
    height: auto;
`;

const Window: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Screen>
            <div>{ children }</div>
        </Screen>
    );
}

export default Window;
