import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import styled from 'styled-components';

const StyledApp = styled(App)`
    background-color: #001936;
    width: 100vw;
    font-family: Helvetica Neue, sans-serif;
    font-size: 16px;
`;

ReactDOM.render(
    <React.StrictMode>
        <StyledApp />
    </React.StrictMode>,
    document.getElementById('root')
);
