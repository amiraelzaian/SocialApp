import styled from "styled-components";

const Form = styled.form`
  width: ${({ $isMobile }) => ($isMobile ? "90%" : "440px")};
  height: ${({ $isMobile }) => ($isMobile ? "98%" : "auto")};
  padding: ${({ $isMobile }) => ($isMobile ? "40px 24px" : "40px 36px")};
  margin: 20px auto;
  border-radius: ${({ $isMobile }) => ($isMobile ? "10px" : "20px")};
  border: ${({ $isMobile }) =>
    $isMobile ? "none" : "1px solid var(--color-grey-100)"};
  background-color: var(--color-grey-0);
  box-shadow: 0 8px 40px rgba(168, 85, 247, 0.12);
  display: flex;
  flex-direction: column;
  gap: 4px;
  animation: fadeIn 0.25s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default Form;
