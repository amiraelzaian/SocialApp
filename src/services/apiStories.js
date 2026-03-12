import { supabase } from "./supabase";

// ============================================
// HELPERS
// ============================================
export function subscribeToStories(onNewStory) {
  const channel = supabase
    .channel("stories")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "stories" },
      onNewStory,
    )
    .subscribe();

  return () => supabase.removeChannel(channel);
}
async function getViewedStoryIds(storyIds) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from("story_views")
    .select("story_id")
    .eq("viewer_id", user.id)
    .in("story_id", storyIds);

  return data?.map((v) => v.story_id) || [];
}

// ============================================
// GET STORIES
// ============================================

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
      users (id, username, full_name, avatar_url)
    `,
    )
    .gt("expires_at", new Date().toISOString())
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  //  1 DB call instead of N
  const storyIds = stories.map((s) => s.id);
  const viewedIds = await getViewedStoryIds(storyIds);
  const viewedSet = new Set(viewedIds);

  return stories.map((story) => ({
    ...story,
    hasViewed: viewedSet.has(story.id),
  }));
}

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
  followingIds.push(user.id); // include own stories

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

  //  1 DB call instead of N
  const storyIds = stories.map((s) => s.id);
  const viewedIds = await getViewedStoryIds(storyIds);
  const viewedSet = new Set(viewedIds);

  return stories.map((story) => ({
    ...story,
    hasViewed: viewedSet.has(story.id),
  }));
}

export async function getUserStories(userId) {
  const { data: stories, error } = await supabase
    .from("stories")
    .select(
      `
      *,
      users (id, username, full_name, avatar_url)
    `,
    )
    .eq("user_id", userId)
    .gt("expires_at", new Date().toISOString())
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);

  //  1 DB call instead of N
  const storyIds = stories.map((s) => s.id);
  const viewedIds = await getViewedStoryIds(storyIds);
  const viewedSet = new Set(viewedIds);

  // get view counts in one call too
  const { data: viewCounts } = await supabase
    .from("story_views")
    .select("story_id")
    .in("story_id", storyIds);

  const viewCountMap = {};
  viewCounts?.forEach((v) => {
    viewCountMap[v.story_id] = (viewCountMap[v.story_id] || 0) + 1;
  });

  return stories.map((story) => ({
    ...story,
    hasViewed: viewedSet.has(story.id),
    viewCount: viewCountMap[story.id] || 0,
  }));
}

// ============================================
// CREATE & DELETE STORIES
// ============================================

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
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      },
    ])
    .select(
      `
      *,
      users (id, username, full_name, avatar_url)
    `,
    )
    .single();

  if (error) throw new Error(error.message);
  return data;
}

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

export async function viewStory(storyId) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("story_views")
    .upsert([{ story_id: storyId, viewer_id: user.id }])
    .select()
    .single();

  if (error) {
    if (error.code === "23505") return; // already viewed — ignore
    throw new Error(error.message);
  }

  return data;
}

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

  const { data: viewers, error } = await supabase
    .from("story_views")
    .select(
      `
      *,
      users (id, username, full_name, avatar_url)
    `,
    )
    .eq("story_id", storyId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return viewers;
}

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

export async function getUnviewedStoriesCount() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return 0;

  const stories = await getStories();
  return stories.filter((story) => !story.hasViewed).length;
}

export async function hasActiveStories(userId) {
  const { count, error } = await supabase
    .from("stories")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .gt("expires_at", new Date().toISOString());

  if (error) throw new Error(error.message);
  return count > 0;
}
