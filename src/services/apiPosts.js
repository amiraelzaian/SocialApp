import { supabase } from "./supabase";

// we will handle this and add to and from to get handle pagination

export async function getPosts({ cursor, limit = 20 }) {
  let query = supabase
    .from("posts")
    .select(
      `
      *,
      users (
        id,
        username,
        full_name,
        avatar_url
      ),
      original_post:original_post_id (
        *,
        users (
          id,
          username,
          full_name,
          avatar_url
        )
      )
    `,
    )
    .order("created_at", { ascending: false })
    .limit(limit);

  if (cursor) {
    query = query.lt("created_at", cursor);
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
}

export async function getPostById(postId) {
  const { data: post, error } = await supabase
    .from("posts")
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
    .eq("id", postId)
    .single();

  if (error) throw new Error(error.message);

  return post;
}

export async function getPostsByUser(userId) {
  const { data: posts, error } = await supabase
    .from("posts")
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
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return posts;
}

export async function getPostsByHashtag(hashtag) {
  const { data: posts, error } = await supabase
    .from("posts")
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
    .contains("hashtags", [hashtag])
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return posts;
}

export async function createPost({ caption, imageUrl, hashtags }) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("posts")
    .insert([
      {
        user_id: user.id,
        caption,
        image_url: imageUrl,
        hashtags,
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

export async function updatePost(postId, { caption, hashtags }) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const { data: post, error } = await supabase
    .from("posts")
    .update({ caption, hashtags })
    .eq("id", postId)
    .eq("user_id", user.id)
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

  return post;
}

export async function deletePost(postId) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  // First, get the post to find the image URL
  const { data: post } = await supabase
    .from("posts")
    .select("image_url, user_id")
    .eq("id", postId)
    .single();

  // Check if user owns the post
  if (post?.user_id !== user.id) {
    throw new Error("You can only delete your own posts");
  }

  // Delete the post from database
  const { error } = await supabase.from("posts").delete().eq("id", postId);

  if (error) throw new Error(error.message);

  // Optional: Delete image from storage
  // Extract path from URL: https://...supabase.co/storage/v1/object/public/posts/user_id/post_id.jpg
  if (post?.image_url) {
    const urlParts = post.image_url.split("/posts/");
    if (urlParts[1]) {
      const imagePath = urlParts[1];
      await supabase.storage.from("posts").remove([imagePath]);
    }
  }
}

export async function getPostLikes(postId) {
  const { data, error } = await supabase
    .from("posts")
    .select("likes_count")
    .eq("id", postId)
    .single();

  if (error) throw new Error(error.message);
  return data?.likes_count || 0;
}

export async function getPostComments(postId) {
  const { data, error } = await supabase
    .from("posts")
    .select("comments_count")
    .eq("id", postId)
    .single();

  if (error) throw new Error(error.message);
  return data?.comments_count || 0;
}

export async function getPostShares(postId) {
  const { data, error } = await supabase
    .from("posts")
    .select("shares_count")
    .eq("id", postId)
    .single();

  if (error) throw new Error(error.message);
  return data?.shares_count || 0;
}
