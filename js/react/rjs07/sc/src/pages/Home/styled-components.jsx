import { styled } from "styled-components";

const StyledTitle = styled.h1`
  max-width: calc(100% - 128px);
  margin: 0 auto;
  color: #222;
  font-size: 3rem;
  text-align: center;
  padding: 32px 0;
  border-bottom: 4px solid #222;
`;

const StyledArticle = styled.article`
  padding: 32px 64px;
  line-height: 1.5rem;
  font-size: 1.2rem;
  text-align: justify;
`;

export { StyledTitle, StyledArticle }
