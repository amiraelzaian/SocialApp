//get all posts {home feed}
export async function getPosts() {}
//get single post
export async function getPostById(postId) {}
// getposts by specific user
export async function getPostByUser(userId) {}
//get posts with specific hashtag
export async function getPostsByHashtag(hastag) {}
export async function createPost({ caption, imageUrl, hashtags }) {}
export async function updatePost(postId, { caption, hashtags }) {}
export async function deletePost(postId) {}
