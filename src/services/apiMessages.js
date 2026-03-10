import { supabase } from "./supabase";
import { getCurrentUser } from "../utils/helpers";

// ─── Get all conversations for current user ──────────────────────────────────
export async function getConversations() {
  const user = await getCurrentUser();
  console.log("my id", user.id);
  // Limit fetch for performance — avoids loading entire messages table
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
    .order("created_at", { ascending: false })
    .limit(200); // ✅ Limit to avoid fetching entire table

  if (error) throw new Error(error.message);

  // Group messages by conversation partner
  const conversationsMap = new Map();

  messages?.forEach((message) => {
    const otherUser =
      message.sender_id === user.id ? message.receiver : message.sender;

    const otherUserId = otherUser.id;

    if (!conversationsMap.has(otherUserId)) {
      conversationsMap.set(otherUserId, {
        otherUser,
        lastMessage: message.content,
        lastMessageTime: message.created_at,
        isRead: message.is_read,
        unreadCount: 0,
      });
    }

    // Count unread messages sent TO current user
    if (message.receiver_id === user.id && !message.is_read) {
      conversationsMap.get(otherUserId).unreadCount++;
    }
  });

  return Array.from(conversationsMap.values());
}

// ─── Get all messages with a specific user ───────────────────────────────────
export async function getMessages(otherUserId) {
  const user = await getCurrentUser();

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

// ─── Send a message ──────────────────────────────────────────────────────────
export async function sendMessage(receiverId, content) {
  const user = await getCurrentUser();

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

// ─── Mark a single message as read ──────────────────────────────────────────
export async function markAsRead(messageId) {
  const user = await getCurrentUser();

  // ✅ No .select().single() — we don't need the return value
  const { error } = await supabase
    .from("messages")
    .update({ is_read: true })
    .eq("id", messageId)
    .eq("receiver_id", user.id);

  if (error) throw new Error(error.message);
}

// ─── Mark entire conversation as read ───────────────────────────────────────
export async function markConversationAsRead(otherUserId) {
  const user = await getCurrentUser();

  const { error } = await supabase
    .from("messages")
    .update({ is_read: true })
    .eq("sender_id", otherUserId)
    .eq("receiver_id", user.id)
    .eq("is_read", false);

  if (error) throw new Error(error.message);
}

// ─── Get total unread messages count ───────────────────────────────────────
export async function getUnreadCount() {
  const user = await getCurrentUser();

  const { count, error } = await supabase
    .from("messages")
    .select("*", { count: "exact", head: true })
    .eq("receiver_id", user.id)
    .eq("is_read", false);

  if (error) throw new Error(error.message);

  return count || 0;
}

// ─── Delete a single message (sender only) ──────────────────────────────────
export async function deleteMessage(messageId) {
  const user = await getCurrentUser();

  const { error } = await supabase
    .from("messages")
    .delete()
    .eq("id", messageId)
    .eq("sender_id", user.id); // ✅ Only sender can delete

  if (error) throw new Error(error.message);
}

// ─── Delete entire conversation ──────────────────────────────────────────────
export async function deleteConversation(otherUserId) {
  const user = await getCurrentUser();

  const { error } = await supabase
    .from("messages")
    .delete()
    .or(
      `and(sender_id.eq.${user.id},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${user.id})`,
    );

  if (error) throw new Error(error.message);
}

// ─── Real-time subscription for new messages ────────────────────────────────
/**
 * Call this once when chat opens. Returns unsubscribe function.
 *
 * Usage:
 *   const unsubscribe = subscribeToMessages(userId, (newMessage) => {
 *     setMessages((prev) => [...prev, newMessage]);
 *   });
 *   // On cleanup: unsubscribe();
 */
export async function subscribeToMessages(onNewMessage) {
  const user = await getCurrentUser();
  console.log("subscribing for user:", user.id); // ← does this log?

  const channel = supabase
    .channel(`realtime:messages:${user.id}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `receiver_id=eq.${user.id}`,
      },
      (payload) => {
        console.log("new message received:", payload); // ← does this log?
        onNewMessage(payload.new);
      },
    )
    .subscribe((status) => {
      console.log("subscription status:", status); // ← what does this say?
    });

  return () => supabase.removeChannel(channel);
}
