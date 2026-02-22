import { supabase } from "./supabase";

// Repost a post
export async function repostPost(postId) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("posts")
    .insert([
      {
        user_id: user.id,
        is_repost: true,
        original_post_id: postId,
      },
    ])
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      throw new Error("You already reposted this post");
    }
    throw new Error(error.message);
  }

  return data;
}

// Undo a repost
export async function undoRepost(postId) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase
    .from("posts")
    .delete()
    .eq("user_id", user.id)
    .eq("original_post_id", postId)
    .eq("is_repost", true);

  if (error) throw new Error(error.message);
}

// Check if current user already reposted a post
export async function isPostReposted(postId) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return false;

  const { data, error } = await supabase
    .from("posts")
    .select("id")
    .eq("user_id", user.id)
    .eq("original_post_id", postId)
    .eq("is_repost", true)
    .maybeSingle();

  if (error && error.code !== "PGRST116") {
    throw new Error(error.message);
  }

  return !!data;
}

// Get repost count for a post
export async function getRepostCount(postId) {
  const { data, error } = await supabase
    .from("posts")
    .select("repost_count")
    .eq("id", postId)
    .single();

  if (error) throw new Error(error.message);
  return data?.repost_count || 0;
}
