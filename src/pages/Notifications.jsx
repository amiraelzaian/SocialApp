import styled from "styled-components";
import NotificationsList from "../features/notifications/NotificationsList";

const StyledDiv = styled.div`
  padding-bottom: 45px;
`;

function Notifications() {
  return (
    <StyledDiv>
      <NotificationsList />
    </StyledDiv>
  );
}

export default Notifications;
