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
  max-width: 340px;
  line-height: 1.6;
`;

function CheckEmail() {
  return (
    <Container>
      <Emoji>📧</Emoji>
      <Title>Check your email!</Title>
      <Message>
        We sent a confirmation link to your email. Please confirm your account
        to start using VibeHub.
      </Message>
    </Container>
  );
}

export default CheckEmail;
