import styled from "styled-components";

const P = styled.p`
  color: var(--color-grey-500);
  font-size: 13px;
`;

function NotificationCount({ numOfNotificaitons }) {
  return (
    <>
      {numOfNotificaitons > 0}{" "}
      <P>You have {numOfNotificaitons} unread notifications</P>
    </>
  );
}

export default NotificationCount;
