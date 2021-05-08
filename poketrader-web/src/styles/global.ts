import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #e6e6e6;
  }

  body, input, button {
    font: 16px Overpass, sans-serif;
  }

  #root {
    max-width: 960px;
    margin: 0 auto;
    padding: 40px 20px;
  }

  button {
    cursor: pointer;
  }

  * {
    scrollbar-width: thin;
    scrollbar-color: blue orange;
  }

  /* Works on Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 5px;
  }

  *::-webkit-scrollbar-track {
    background: none;
  }

  *::-webkit-scrollbar-thumb {
    background-color: #767676;
    border-radius: 20px;
  }
`;
