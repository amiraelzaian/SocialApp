import { supabase } from "./supabase";

// ============================================
// GET STORIES
// ============================================

// Get all active stories (all users - for explore)
export async function getAllActiveStories() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data: stories, error } = await supabase
    .from("stories")
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
    .gt("expires_at", new Date().toISOString())
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  // Add view status for each story
  const storiesWithViewStatus = await Promise.all(
    stories.map(async (story) => {
      const viewed = await hasViewedStory(story.id);
      return { ...story, hasViewed: viewed };
    }),
  );

  return storiesWithViewStatus;
}

// Get stories from users you follow (for home feed)
export async function getStories() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  // Step 1: Get users you follow
  const { data: following } = await supabase
    .from("follows")
    .select("following_id")
    .eq("follower_id", user.id);

  const followingIds = following?.map((f) => f.following_id) || [];

  // Add your own ID to see your stories
  followingIds.push(user.id);

  // Step 2: Get stories from those users
  const { data: stories, error } = await supabase
    .from("stories")
    .select(
      `
      *,
      users (id, username, full_name, avatar_url)
    `,
    )
    .in("user_id", followingIds)
    .gt("expires_at", new Date().toISOString())
    .order("user_id")
    .order("created_at");

  if (error) throw new Error(error.message);

  // Add view status
  const storiesWithViewStatus = await Promise.all(
    stories.map(async (story) => {
      const viewed = await hasViewedStory(story.id);
      return { ...story, hasViewed: viewed };
    }),
  );

  return storiesWithViewStatus;
}

// Get stories from a specific user
export async function getUserStories(userId) {
  const { data: stories, error } = await supabase
    .from("stories")
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
    .gt("expires_at", new Date().toISOString())
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);

  // Add view status
  const storiesWithViewStatus = await Promise.all(
    stories.map(async (story) => {
      const viewed = await hasViewedStory(story.id);
      const viewCount = await getStoryViewCount(story.id);
      return { ...story, hasViewed: viewed, viewCount };
    }),
  );

  return storiesWithViewStatus;
}

// ============================================
// CREATE & DELETE STORIES
// ============================================

// Create a new story
export async function createStory({ imageUrl, caption }) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("stories")
    .insert([
      {
        user_id: user.id,
        image_url: imageUrl,
        caption,
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

// Delete a story (only your own)
export async function deleteStory(storyId) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase
    .from("stories")
    .delete()
    .eq("id", storyId)
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);
}

// ============================================
// STORY VIEWS
// ============================================

// Mark a story as viewed
export async function viewStory(storyId) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("story_views")
    .insert([
      {
        story_id: storyId,
        viewer_id: user.id,
      },
    ])
    .select()
    .single();

  if (error) {
    // Ignore duplicate error (already viewed)
    if (error.code === "23505") return;
    throw new Error(error.message);
  }

  return data;
}

// Get who viewed a story (only for your own stories)
export async function getStoryViewers(storyId) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  // Check if this is your story
  const { data: story } = await supabase
    .from("stories")
    .select("user_id")
    .eq("id", storyId)
    .single();

  if (story?.user_id !== user.id) {
    throw new Error("You can only see viewers of your own stories");
  }

  // Get all viewers
  const { data: viewers, error } = await supabase
    .from("story_views")
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
    .eq("story_id", storyId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return viewers;
}

// Check if current user has viewed a story
export async function hasViewedStory(storyId) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return false;

  const { data, error } = await supabase
    .from("story_views")
    .select("id")
    .eq("story_id", storyId)
    .eq("viewer_id", user.id)
    .single();

  if (error && error.code !== "PGRST116") {
    throw new Error(error.message);
  }

  return !!data;
}

// Get view count for a story
export async function getStoryViewCount(storyId) {
  const { count, error } = await supabase
    .from("story_views")
    .select("*", { count: "exact", head: true })
    .eq("story_id", storyId);

  if (error) throw new Error(error.message);
  return count || 0;
}

// ============================================
// STORY STATUS
// ============================================

// Get count of unviewed stories from users you follow
export async function getUnviewedStoriesCount() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return 0;

  // Get all active stories from users you follow
  const stories = await getStories();

  // Count unviewed ones
  const unviewedCount = stories.filter((story) => !story.hasViewed).length;

  return unviewedCount;
}

// Check if a user has active stories
export async function hasActiveStories(userId) {
  const { count, error } = await supabase
    .from("stories")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .gt("expires_at", new Date().toISOString());

  if (error) throw new Error(error.message);
  return count > 0;
}

// // Delete expired stories (cleanup - run with cron job)
// export async function deleteExpiredStories() {
//   const { error } = await supabase
//     .from("stories")
//     .delete()
//     .lt("expires_at", new Date().toISOString());

//   if (error) throw new Error(error.message);
// }
