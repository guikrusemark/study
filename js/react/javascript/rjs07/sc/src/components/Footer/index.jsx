import {
  StyledFooter,
  StyledNav,
} from "./styled-components";

export default function Footer() {
  return (
    <StyledFooter>
      <a href="/" className="logo">
        <img src="assets/icons/logo_horizontal_transparente.png"
          alt="logo canil krusemark" />
      </a>
      <StyledNav>
        <ul>
          <li><a href="/">HOME</a></li>
          <li><a href="/about">SOBRE</a></li>
          <li><a href="/">CONTATO</a></li>
        </ul>
      </StyledNav>
    </StyledFooter>
  );
}
