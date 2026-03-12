import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  background-color: var(--color-grey-50);
`;

const Emoji = styled.p`
  font-size: 64px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: var(--color-grey-800);
`;

const Message = styled.p`
  font-size: 15px;
  color: var(--color-grey-500);
  text-align: center;
  max-width: 300px;
`;

const Button = styled.button`
  padding: 10px 28px;
  border-radius: 20px;
  border: none;
  background-color: var(--color-brand-600);
  color: white;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: var(--color-brand-700);
  }
`;

function ErrorFallBack() {
  return (
    <Container>
      <Emoji>😵</Emoji>
      <Title>Oops! Something went wrong</Title>
      <Message>
        An unexpected error occurred. Please try again or go back home.
      </Message>
      <Button onClick={() => window.location.replace("/")}>Go back home</Button>
    </Container>
  );
}

export default ErrorFallBack;
