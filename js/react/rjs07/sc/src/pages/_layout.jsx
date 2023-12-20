import { styled } from "styled-components";
import { Outlet } from "react-router-dom";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const StyledBody = styled.div`
  background: linear-gradient(160deg, #000000BB 1%, #FFD562AA 100%);
  width: 100%;
`;

const StyledMain = styled.main`
  padding: 64px;
`;

const StyledMainContent = styled.div`
  min-height: 50vh;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #EEE;
  border-radius: 4px;
  padding: 16px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

export default function Layout() {
  return (
    <>
      <StyledBody>
        <Header />
        <StyledMain>
          <StyledMainContent>
            <Outlet />
          </StyledMainContent>
        </StyledMain>
        <Footer />
      </StyledBody>
    </>
  )
}
