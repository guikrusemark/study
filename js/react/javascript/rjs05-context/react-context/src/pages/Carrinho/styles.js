import { FormControl, IconButton } from '@material-ui/core';
import styled from 'styled-components';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
const titleGray = '#464646';

export const Container = styled.main`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 100vh;
  padding: 20px;
  position: relative;
  @media(min-width: 768px) {
    margin: 0 auto;
    width: 50%;
  }
  h2 {
    color: ${titleGray};
    font-size: 32px;
  }
`;

export const Voltar = styled(IconButton).attrs({
  children: <ArrowBackIcon />
})`
  left: 20px;
  position: absolute;
  top: 15px;
`

export const TotalContainer = styled.section`
  margin-top: 20px;
  > div {
    align-items: center;
    display: flex;
    gap: 20px;
    justify-content: space-between;
    h2 {
      color: ${titleGray};
      font-size: 32px;
    }
    span {
      font-size: 30px;
    }
  }
`

export const PagamentoContainer = styled(FormControl)`
  width: 100%;
`