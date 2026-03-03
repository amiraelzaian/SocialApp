import Modal from "../../ui/Modal";
import { useUser } from "../authentication/useUser";
import styled from "styled-components";
import { useScreen } from "../../context/ScreenSizeContext";
import { useFollowingsUsers } from "./useFollowingsUsers";
import Spinner from "../../ui/Spinner";
import Avatar from "../../ui/Avatar";
import Button from "../../ui/Button";
import { HiMiniUserMinus, HiMiniUserPlus } from "react-icons/hi2";

import FollowingItem from "./FollowingItem";
import { Link } from "react-router-dom";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: ${({ $isMobile }) =>
    $isMobile ? "1.6rem 1.2rem" : "2rem 2.4rem 2.4rem"};
  background-color: var(--color-grey-50);
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const P = styled.p`
  color: var(--color-grey-600);
  font-size: 15px;
  margin: 0;
`;

const Title = styled.h3`
  font-size: 17px;
  font-weight: 700;
  color: var(--color-grey-800);
  margin: 0;
`;

// Per-row follow button with its own hook

function FollowingsModal({ setShowModal, profileId }) {
  const { user } = useUser();
  const { isMobile } = useScreen();
  const { FollowingsUsers, isPending } = useFollowingsUsers(
    profileId || user.id,
  );

  return (
    <Modal onClose={() => setShowModal(false)}>
      <StyledContainer $isMobile={isMobile}>
        <Title>Following</Title>
        {isPending && <Spinner />}
        {!isPending && (!FollowingsUsers || FollowingsUsers.length === 0) && (
          <P>Not following anyone yet.</P>
        )}
        {!isPending && FollowingsUsers?.length > 0 && (
          <List>
            {FollowingsUsers.map((followedUser) => (
              <FollowingItem
                key={followedUser.id}
                followedUser={followedUser}
                currentUserId={user.id}
              />
            ))}
          </List>
        )}
      </StyledContainer>
    </Modal>
  );
}

export default FollowingsModal;
