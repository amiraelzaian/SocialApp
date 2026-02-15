import { supabase } from "./supabase";

// we will handle this and add to and from to handle pagination
export async function getUsers(searchQuery) {
  let query = supabase.from("users").select("*").range(0, 14); // First 15 users

  // If search query provided, filter by name or username
  if (searchQuery) {
    query = query.or(
      `full_name.ilike.%${searchQuery}%,username.ilike.%${searchQuery}%`,
    );
  }

  const { data: users, error } = await query;

  if (error) throw new Error(error.message);
  return users;
}

export async function getUserProfile(userId) {
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw new Error(error.message);
  return user;
}

export async function searchUsers(query) {
  const { data: users, error } = await supabase
    .from("users")
    .select("*")
    .or(`full_name.ilike.%${query}%,username.ilike.%${query}%`);

  if (error) throw new Error(error.message);
  return users;
}

export async function getSuggestedUsers() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  // Get users that current user is NOT following
  const { data: users, error } = await supabase
    .from("users")
    .select("*")
    .neq("id", user.id)
    .limit(10);

  if (error) throw new Error(error.message);

  // Filter out users you already follow
  const { data: following } = await supabase
    .from("follows")
    .select("following_id")
    .eq("follower_id", user.id);

  const followingIds = following?.map((f) => f.following_id) || [];
  const suggestedUsers = users.filter((u) => !followingIds.includes(u.id));

  return suggestedUsers.slice(0, 10);
}

export async function updateProfile({
  fullName,
  bio,
  avatarUrl,
  coverUrl,
  location,
  website,
}) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data: updatedUser, error } = await supabase
    .from("users")
    .update({
      full_name: fullName,
      bio,
      avatar_url: avatarUrl,
      cover_url: coverUrl,
      location,
      website,
    })
    .eq("id", user.id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return updatedUser;
}

export async function followUser(userId) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("follows")
    .insert([
      {
        follower_id: user.id,
        following_id: userId,
      },
    ])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function unfollowUser(userId) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase
    .from("follows")
    .delete()
    .eq("follower_id", user.id)
    .eq("following_id", userId);

  if (error) throw new Error(error.message);
}

export async function getFollowers(userId) {
  const { data, error } = await supabase
    .from("follows")
    .select(
      `
      follower_id,
      users!follows_follower_id_fkey (
        id,
        username,
        full_name,
        avatar_url
      )
    `,
    )
    .eq("following_id", userId);

  if (error) throw new Error(error.message);

  // Return just the user objects
  return data.map((item) => item.users);
}

export async function getFollowing(userId) {
  const { data, error } = await supabase
    .from("follows")
    .select(
      `
      following_id,
      users!follows_following_id_fkey (
        id,
        username,
        full_name,
        avatar_url
      )
    `,
    )
    .eq("follower_id", userId);

  if (error) throw new Error(error.message);

  // Return just the user objects
  return data.map((item) => item.users);
}

export async function isFollowing(userId) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return false;

  const { data, error } = await supabase
    .from("follows")
    .select("id")
    .eq("follower_id", user.id)
    .eq("following_id", userId)
    .single();

  if (error && error.code !== "PGRST116") throw new Error(error.message);

  return !!data;
}

export async function getFollowerCount(userId) {
  const { count, error } = await supabase
    .from("follows")
    .select("*", { count: "exact", head: true })
    .eq("following_id", userId);

  if (error) throw new Error(error.message);
  return count || 0;
}

export async function getFollowingCount(userId) {
  const { count, error } = await supabase
    .from("follows")
    .select("*", { count: "exact", head: true })
    .eq("follower_id", userId);

  if (error) throw new Error(error.message);
  return count || 0;
}
