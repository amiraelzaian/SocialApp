import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledDiv = styled.div`
  width: ${({ $isMobile }) => ($isMobile ? "90%" : "440px")};
  height: fit-content;
  padding: 20px;
  margin: 20px auto;
  border-radius: ${({ $isMobile }) => ($isMobile ? "10px" : "20px")};
  border: ${({ $isMobile }) =>
    $isMobile ? "none" : "1px solid var(--color-grey-100)"};
  background-color: var(--color-grey-0);
  box-shadow: 0 8px 40px rgba(168, 85, 247, 0.12);
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

const P = styled.p`
  color: var(--color-grey-600);
  font-size: 16px;
`;

const StyledLink = styled(Link)`
  color: #0a0aeb;

  font-size: 16px;
`;

function FormTail({ to, $isMobile }) {
  return (
    <StyledDiv $isMobile={$isMobile}>
      <P>
        {to === "signup"
          ? "Don't have an account?"
          : "Already have an account?"}
      </P>

      <StyledLink to={to}>
        {to === "/signup" ? "Sign Up" : "Sign In"}
      </StyledLink>
    </StyledDiv>
  );
}

export default FormTail;
