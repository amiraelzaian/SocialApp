// get all notification for a account
export async function getNotifications(userId) {}
//mark notification as read
export async function markAsRead(notificationId) {}
// mark all notifications as read
export async function markAllAsRead(userId) {}
//delete a notifiaction for user ( user delete for himself)
export async function deleteNotificaiton({ notificationId, userId }) {}
// get unread notifications count for a user (appear for each user for his account)
export async function getUnreadCount(userId) {}
// create notification (automated)
export async function createNotification({
  recipientId,
  actorId,
  type,
  postId,
  message,
}) {}
