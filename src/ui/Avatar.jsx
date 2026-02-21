import styled from "styled-components";

const StyledAvatar = styled.img`
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  background-color: var(--color-grey-200);
`;

const AvatarFallback = styled.div`
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  background-color: var(--color-brand-600);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 700;
  flex-shrink: 0;
`;

function Avatar({ src, alt, name }) {
  const initials = name?.charAt(0)?.toUpperCase() || "?";

  if (src) {
    return <StyledAvatar src={src} alt={alt || name} />;
  }

  return <AvatarFallback>{initials}</AvatarFallback>;
}

export default Avatar;
