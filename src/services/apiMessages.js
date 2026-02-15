//get all conversations for current user
export async function getConversations() {}
//get messages with specific user
export async function getMessages(otherUserId) {}
//send a message
export async function sendMessage(receiverId, content) {}
// mark message as red
export async function markAsRead(messageId) {}
// mark all messages inconversation as read
export async function markConversationAsRead(userId) {}
// get total unread messages count
export async function getUnreadCount() {}
// delete a message
export async function deleteMessage(messageId) {}
//delete conversation
export async function deleteConversation(userId) {}
