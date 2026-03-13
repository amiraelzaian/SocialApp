import { supabase } from "./supabase";

// apiPresence.js
export async function updateOnlineStatus(isOnline) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return; // ✅ return silently instead of throwing

  const { error } = await supabase // ✅ removed .select().single()
    .from("users")
    .update({
      is_online: isOnline,
      last_seen: new Date().toISOString(),
    })
    .eq("id", user.id);

  if (error) console.error("updateOnlineStatus error:", error.message); // ✅ don't throw
}

// Track user activity (heartbeat)
export async function trackPresence() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const { error } = await supabase
    .from("users")
    .update({
      is_online: true,
      last_seen: new Date().toISOString(),
    })
    .eq("id", user.id);

  if (error) console.error("Presence update failed:", error.message);
}

//  Get list of online users
export async function getOnlineUsers() {
  const { data: users, error } = await supabase
    .from("users")
    .select("id, username, full_name, avatar_url, is_online, last_seen")
    .eq("is_online", true)
    .order("last_seen", { ascending: false });

  if (error) throw new Error(error.message);
  return users;
}

//  Get user's online status
export async function getUserStatus(userId) {
  const { data, error } = await supabase
    .from("users")
    .select("is_online, last_seen")
    .eq("id", userId)
    .single();

  if (error) throw new Error(error.message);
  return data;
}
