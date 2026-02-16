import { supabase } from "../supabaseClient";

// =============================
// Upload user avatar
// Bucket: avatars
// =============================
export async function uploadAvatar(userId, file) {
  const fileExt = file.name.split(".").pop();
  const filePath = `${userId}/avatar.${fileExt}`;

  const { error } = await supabase.storage
    .from("avatars")
    .upload(filePath, file, { upsert: true });

  if (error) throw error;

  return filePath;
}

// =============================
// Upload cover photo
// Bucket: covers
// =============================
export async function uploadCover(userId, file) {
  const fileExt = file.name.split(".").pop();
  const filePath = `${userId}/cover.${fileExt}`;

  const { error } = await supabase.storage
    .from("covers")
    .upload(filePath, file, { upsert: true });

  if (error) throw error;

  return filePath;
}

// =============================
// Upload post image
// Bucket: posters
// =============================
export async function uploadPostImage(userId, postId, file) {
  const fileExt = file.name.split(".").pop();
  const filePath = `${userId}/${postId}.${fileExt}`;

  const { error } = await supabase.storage
    .from("posters")
    .upload(filePath, file);

  if (error) throw error;

  return filePath;
}

// =============================
// Upload story image
// Bucket: stories
// =============================
export async function uploadStoryImage(userId, storyId, file) {
  const fileExt = file.name.split(".").pop();
  const filePath = `${userId}/${storyId}.${fileExt}`;

  const { error } = await supabase.storage
    .from("stories")
    .upload(filePath, file);

  if (error) throw error;

  return filePath;
}

// =============================
// Delete image from storage
// =============================
export async function deleteImage(bucket, path) {
  const { error } = await supabase.storage.from(bucket).remove([path]);

  if (error) throw error;

  return true;
}

// =============================
// display Url
// =============================
export function getPublicUrl(bucket, path) {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);

  return data.publicUrl;
}
