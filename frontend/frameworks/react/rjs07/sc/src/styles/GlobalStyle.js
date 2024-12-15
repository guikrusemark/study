import "@fontsource/poppins/200.css";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Poppins', sans-serif;
  }

  body {
    font-size: 1.2rem;
    margin: 0;
    padding: 0;
  }
`;

export default GlobalStyle;
