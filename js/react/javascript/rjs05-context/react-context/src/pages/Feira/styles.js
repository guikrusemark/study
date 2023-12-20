import styled from 'styled-components';
const titleGray = '#464646';

export const Container = styled.main`
  min-height: 100vh;
  padding: 0 20px;
  @media(min-width: 768px) {
    margin: 0 auto;
    width: 50%;
  }
`;

export const Header = styled.header`
  > div {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    > h2, > h3 {
      color: ${titleGray};
    }
    h2 {
      font-size: 32px;
    }
    h3 {
      font-size: 26px;
    }
  }
  > p {
    color: #A3A3A3;
    font-size: 26px;
  }
`;

export const Lista = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 0;
  > h2 {
    color: ${titleGray};
    font-size: 32px;
    margin-top: 20px;
  }
`;