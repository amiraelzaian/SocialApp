import styled from "styled-components";

const Image = styled.img`
  width: 100%;
  max-height: 60rem;
  object-fit: cover;
  display: block;
  border-radius: 5px;
`;

function PostCardImage({ post }) {
  return <Image src={post.image_url} alt={post.caption || "Post"} />;
}

export default PostCardImage;
