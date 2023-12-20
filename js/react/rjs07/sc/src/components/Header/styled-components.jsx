import { styled } from "styled-components";

import { AccountBox } from '@mui/icons-material';

const StyledHeader = styled.header`
  background-color: #191919;
  padding: 0px 64px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  /* width: calc(100% - 128px);
  position: fixed; */

  img {
    cursor: pointer;
    width: 200px;
    padding: 0 16px;
  }
`;

const StyledNav = styled.nav`
  ul {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    list-style: none;

    li {
      min-width: 90px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      color: #ffd562;
      padding: 16px 16px;
      text-decoration: none;
      font-weight: 600;
      line-height: 16px;
      font-size: 1rem;
    }

    li:last-child {
      min-width: 36px;
    }

    li:not(:last-child) {
      &:hover {
        background-color: #ccad0032;
      }
    }
  }
`;

const StyledLogin = styled(AccountBox)`
  font-size: 2rem;
  cursor: pointer;
`;

export {
  StyledHeader,
  StyledNav,
  StyledLogin
};
