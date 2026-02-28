import styled from "styled-components";
import DiscoverCardHeader from "./DiscoverCardHeader";
import DiscoverCardBody from "./DiscoverCardBody";
import DiscoverCardTail from "./DiscoverCardTail";
import { useNavigate } from "react-router-dom";

const Card = styled.div`
  width: 97%;
  /* min-height: 200px;
  height: fit-content; */
  height: 350px;
  background-color: var(--color-grey-50);
  border: 2px solid var(--color-grey-200);
  border-radius: 10px;
  box-shadow: var(--shadow-sm);
  padding: 5px;
  margin: 0 auto 10px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

function DiscoverUserCard({ data = null }) {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`/discover/${data?.id}`)}>
      <DiscoverCardHeader data={data} />
      <DiscoverCardBody data={data} />
      <DiscoverCardTail data={data} />
    </Card>
  );
}

export default DiscoverUserCard;
