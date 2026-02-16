import { supabase } from "./supabase";

// get all notification for a user
export async function getNotifications() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data: notifications, error } = await supabase
    .from("notifications")
    .select(
      `
      *,
      actor:actor_id (
        id,
        username,
        full_name,
        avatar_url
      ),
      posts (
        id,
        caption,
        image_url
      )
    `,
    )
    .eq("recipient_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return notifications;
}

// mark notification as read
export async function markAsRead(notificationId) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("notifications")
    .update({ is_read: true })
    .eq("id", notificationId)
    .eq("recipient_id", user.id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

// makr all notificaitons to read

export async function markAllAsRead() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase
    .from("notifications")
    .update({ is_read: true })
    .eq("recipient_id", user.id)
    .eq("is_read", false);

  if (error) throw new Error(error.message);
}

// delete notification

export async function deleteNotification(notificationId) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase
    .from("notifications")
    .delete()
    .eq("id", notificationId)
    .eq("recipient_id", user.id);

  if (error) throw new Error(error.message);
}

// delete all notification
export async function deleteAllNotifications() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase
    .from("notifications")
    .delete()
    .eq("recipient_id", user.id);

  if (error) throw new Error(error.message);
}

// get unread count of notifications
export async function getUnreadCount() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { count, error } = await supabase
    .from("notifications")
    .select("*", { count: "exact", head: true })
    .eq("recipient_id", user.id)
    .eq("is_read", false);

  if (error) throw new Error(error.message);
  return count || 0;
}
