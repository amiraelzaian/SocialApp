export async function getUsers() {}
export async function getUserProfile(userId) {}
//search users by name/username
export async function SearchUsers(query) {}
//get recommended users to follow
export async function getSuggestedUsers() {}
export async function updateProfile({
  fullName,
  bio,
  avatarUrl,
  coverUrl,
  location,
  website,
}) {}
export async function followUser(userId) {}
export async function unfollowUser(useId) {}
export async function getFollowers(userId) {}
export async function getFollowing(userId) {}
export async function isFloowing(userId) {}
export async function getFollowersCount(userId) {}
export async function getFollowingCount(userId) {}
