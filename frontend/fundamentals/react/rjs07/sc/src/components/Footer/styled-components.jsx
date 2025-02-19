import { styled } from "styled-components";

const StyledFooter = styled.footer`
  background-color: #191919;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin: 0 auto;

  .logo {
    padding: 16px 0;

    img {
      width: 300px;
    }
  }
`;

const StyledNav = styled.nav`
  padding: 16px;

  ul {
    padding: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    list-style: none;

    li {
      a {
        box-sizing: border-box;
        width: 120px;
        border-radius: 4px;
        color: #ffd562;
        padding: 16px;
        text-decoration: none;
        font-weight: 400;
        font-size: 1rem;

        &:hover {
          background-color: #ccad0032;
        }
      }
    }
  }
`;

export { StyledFooter, StyledNav };
