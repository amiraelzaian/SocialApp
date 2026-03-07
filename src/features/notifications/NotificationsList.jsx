import styled from "styled-components";
import { useNotifications } from "./useNotifications";
import { useMarkAllAsRead } from "./useMarkAllAsRead";
import { useDeleteAllNotifications } from "./useDeleteAllNotifications";
import NotificationItem from "./NotificationItem";
import Spinner from "../../ui/Spinner";

const Container = styled.div`
  width: 95%;
  height: fit-content;
  min-height: 100px;
  border: 1px solid var(--color-grey-200);
  border-radius: 10px;
  box-shadow: var(--shadow-sm);
  margin: 10px auto;
  background: var(--color-grey-0);
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.6rem;
  border-bottom: 1px solid var(--color-grey-100);
`;

const Title = styled.h2`
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-grey-800);
`;

const UnreadText = styled.p`
  font-size: 1.2rem;
  color: var(--color-grey-500);
  margin-top: 0.2rem;
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
`;

const ActionBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: var(--color-brand-600);
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

const Empty = styled.p`
  text-align: center;
  color: var(--color-grey-400);
  font-size: 1.4rem;
  padding: 4rem 0;
`;

function NotificationsList() {
  const { notifications, isPending } = useNotifications();
  const { markAllAsRead, isPending: isMarkingAll } = useMarkAllAsRead();
  const { deleteAllNotifications, isPending: isDeletingAll } =
    useDeleteAllNotifications();

  if (isPending) return <Spinner />;

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return (
    <Container>
      <Header>
        <div>
          <Title>Notifications</Title>
          {unreadCount > 0 && (
            <UnreadText>You have {unreadCount} unread notifications</UnreadText>
          )}
        </div>
        {notifications.length > 0 && (
          <Actions>
            <ActionBtn
              onClick={markAllAsRead}
              disabled={isMarkingAll || unreadCount === 0}
            >
              Mark all as read
            </ActionBtn>
            <ActionBtn
              onClick={deleteAllNotifications}
              disabled={isDeletingAll}
            >
              Clear all
            </ActionBtn>
          </Actions>
        )}
      </Header>

      {notifications.length === 0 ? (
        <Empty>No notifications yet 🎉</Empty>
      ) : (
        notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))
      )}
    </Container>
  );
}

export default NotificationsList;
