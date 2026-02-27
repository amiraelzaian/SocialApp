import styled from "styled-components";
import DiscoverCardHeader from "./DiscoverCardHeader";
import DiscoverCardBody from "./DiscoverCardBody";
import DiscoverCardTail from "./DiscoverCardTail";

const Card = styled.div`
  width: 95%;
  min-height: 200px;
  height: fit-content;
  background-color: var(--color-grey-50);
  border: 2px solid var(--color-grey-200);
  border-radius: 10px;
  box-shadow: var(--shadow-sm);
  padding: 5px;
  margin: auto;
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

function DiscoverUserCard({ data = null }) {
  console.log(data);
  return (
    <Card>
      <DiscoverCardHeader />
      <DiscoverCardBody />
      <DiscoverCardTail />
    </Card>
  );
}

export default DiscoverUserCard;
