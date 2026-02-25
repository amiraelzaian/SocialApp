import styled from "styled-components";

const StyledAvatar = styled.img`
  width: ${(props) => (props.$page === "profile" ? "100%" : "3.2rem")};
  height: ${(props) => (props.$page === "profile" ? "100%" : "3.2rem")};
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  background-color: var(--color-grey-200);
`;

const AvatarFallback = styled.div`
  width: ${(props) => (props.$page === "profile" ? "100%" : "3.2rem")};
  height: ${(props) => (props.$page === "profile" ? "100%" : "3.2rem")};
  border-radius: 50%;
  background-color: var(--color-brand-600);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => (props.$page === "profile" ? "4rem" : "1.4rem")};
  font-weight: 700;
  flex-shrink: 0;
`;

function Avatar({ src, alt, name, page = null }) {
  const initials = name?.charAt(0)?.toUpperCase() || "?";

  if (src) {
    return <StyledAvatar src={src} alt={alt || name} $page={page} />;
  }

  return <AvatarFallback $page={page}>{initials}</AvatarFallback>;
}

export default Avatar;
