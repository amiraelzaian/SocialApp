import { supabase } from "./supabase";

//  Get all conversations for current user
export async function getConversations() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  // Get all messages where user is sender OR receiver
  const { data: messages, error } = await supabase
    .from("messages")
    .select(
      `
      *,
      sender:sender_id (
        id,
        username,
        full_name,
        avatar_url,
        is_online
      ),
      receiver:receiver_id (
        id,
        username,
        full_name,
        avatar_url,
        is_online
      )
    `,
    )
    .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  // Group messages by conversation partner
  const conversationsMap = new Map();

  messages?.forEach((message) => {
    // Determine who the "other person" is
    const otherUser =
      message.sender_id === user.id ? message.receiver : message.sender;

    const otherUserId = otherUser.id;

    // If this conversation doesn't exist yet, or this message is newer
    if (!conversationsMap.has(otherUserId)) {
      conversationsMap.set(otherUserId, {
        otherUser,
        lastMessage: message.content,
        lastMessageTime: message.created_at,
        isRead: message.is_read,
        unreadCount: 0,
      });
    }

    // Count unread messages (messages sent TO current user that aren't read)
    if (message.receiver_id === user.id && !message.is_read) {
      conversationsMap.get(otherUserId).unreadCount++;
    }
  });

  // Convert Map to array
  return Array.from(conversationsMap.values());
}

// ✅ Get all messages with a specific user (conversation history)
export async function getMessages(otherUserId) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data: messages, error } = await supabase
    .from("messages")
    .select(
      `
      *,
      sender:sender_id (
        id,
        username,
        full_name,
        avatar_url
      )
    `,
    )
    .or(
      `and(sender_id.eq.${user.id},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${user.id})`,
    )
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);

  return messages;
}

//  Send a message
export async function sendMessage(receiverId, content) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data: message, error } = await supabase
    .from("messages")
    .insert([
      {
        sender_id: user.id,
        receiver_id: receiverId,
        content,
        is_read: false,
      },
    ])
    .select(
      `
      *,
      sender:sender_id (
        id,
        username,
        full_name,
        avatar_url
      )
    `,
    )
    .single();

  if (error) throw new Error(error.message);

  return message;
}

//  Mark a single message as read
export async function markAsRead(messageId) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("messages")
    .update({ is_read: true })
    .eq("id", messageId)
    .eq("receiver_id", user.id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function markConversationAsRead(otherUserId) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  // Mark all messages FROM otherUserId TO current user as read
  const { error } = await supabase
    .from("messages")
    .update({ is_read: true })
    .eq("sender_id", otherUserId)
    .eq("receiver_id", user.id)
    .eq("is_read", false);

  if (error) throw new Error(error.message);
}

//  Get total unread messages count
export async function getUnreadCount() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { count, error } = await supabase
    .from("messages")
    .select("*", { count: "exact", head: true })
    .eq("receiver_id", user.id)
    .eq("is_read", false);

  if (error) throw new Error(error.message);

  return count || 0;
}

// Delete a single message (only sender can delete)
export async function deleteMessage(messageId) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase
    .from("messages")
    .delete()
    .eq("id", messageId)
    .eq("sender_id", user.id);

  if (error) throw new Error(error.message);
}

//  Delete entire conversation with a user
export async function deleteConversation(otherUserId) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  // Delete all messages between current user and other user
  const { error } = await supabase
    .from("messages")
    .delete()
    .or(
      `and(sender_id.eq.${user.id},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${user.id})`,
    );

  if (error) throw new Error(error.message);
}
