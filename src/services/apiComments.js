import { supabase } from "./supabase";

export async function getComments(postId) {
  const { data: comments, error } = await supabase
    .from("comments")
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
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  return comments;
}

// Return with user info
export async function createComment(postId, content) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("comments")
    .insert([
      {
        content,
        post_id: postId,
        user_id: user.id,
      },
    ])
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
    .single();

  if (error) throw new Error(error.message);
  return data;
}

//update comment
export async function updateComment(commentId, content) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("comments")
    .update({ content })
    .eq("id", commentId)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function deleteComment(commentId) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);
}

// get count of comment
export async function getCommentCount(postId) {
  const { count, error } = await supabase
    .from("comments")
    .select("*", { count: "exact", head: true })
    .eq("post_id", postId);

  if (error) throw new Error(error.message);
  return count || 0;
}

//  Get comments by user (for profile)
export async function getCommentsByUser(userId) {
  const { data: comments, error } = await supabase
    .from("comments")
    .select(
      `
      *,
      posts (
        id,
        caption,
        image_url
      )
    `,
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return comments;
}

//  Check if current user commented on a post (optional)
export async function hasUserCommented(postId) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return false;

  const { count, error } = await supabase
    .from("comments")
    .select("*", { count: "exact", head: true })
    .eq("post_id", postId)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);
  return count > 0;
}
