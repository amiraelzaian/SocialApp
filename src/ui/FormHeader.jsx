import { FaInstagram } from "react-icons/fa";
import styled from "styled-components";
import Logo from "./Logo";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-bottom: 28px;
  text-align: center;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 65px;
  height: 65px;
  border-radius: 18px;
  background: var(--gradient-primary);
  margin-bottom: 4px;
  box-shadow: 0 8px 24px rgba(168, 85, 247, 0.35);
`;

const Title = styled.h2`
  font-size: 2.25rem;
  font-weight: 700;
  background: var(--gradient-primary);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
`;

const P = styled.p`
  color: var(--color-grey-500);
  font-size: 15px;
  margin: 0;
`;

function FormHeader({ type = "signup" }) {
  return (
    <StyledContainer>
      <IconWrapper>
        <FaInstagram size={35} color="white" />
      </IconWrapper>
      <Title>{type === "login" ? "Welcome Back" : "Join VibeHub"}</Title>
      <P>
        {type === "login"
          ? "Sign in to continue to VibeHub"
          : "Create account and join us"}
      </P>
    </StyledContainer>
  );
}

export default FormHeader;
