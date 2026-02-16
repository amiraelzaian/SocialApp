import { supabase } from "./supabase";

//  Like a post
export async function likePost(postId) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  // Just insert into likes table - trigger handles the count!
  const { data, error } = await supabase
    .from("likes")
    .insert([
      {
        user_id: user.id,
        post_id: postId,
      },
    ])
    .select()
    .single();

  if (error) {
    // Handle unique constraint error (already liked)
    if (error.code === "23505") {
      throw new Error("You already liked this post");
    }
    throw new Error(error.message);
  }

  return data;
}

//unlike a post // minus like_count for post by 1
export async function unlikePost(postId) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase
    .from("likes")
    .delete()
    .eq("user_id", user.id)
    .eq("post_id", postId);

  if (error) throw new Error(error.message);
}

// Get all likes for a post (with user info)
export async function getPostLikes(postId) {
  const { data: likes, error } = await supabase
    .from("likes")
    .select(
      `
      *,
      users (
        id,
        username,
        full_name,
        avatar_url
      )
    `,
    )
    .eq("post_id", postId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return likes;
}

//  Check if current user liked a post
export async function isPostLiked(postId) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return false;

  const { data, error } = await supabase
    .from("likes")
    .select("id")
    .eq("user_id", user.id)
    .eq("post_id", postId)
    .single();

  if (error && error.code !== "PGRST116") {
    throw new Error(error.message);
  }

  return !!data;
}

// get like count for post
export async function getLikeCount(postId) {
  const { data, error } = await supabase
    .from("posts")
    .select("likes_count")
    .eq("id", postId)
    .single();

  if (error) throw new Error(error.message);
  return data?.likes_count || 0;
}
