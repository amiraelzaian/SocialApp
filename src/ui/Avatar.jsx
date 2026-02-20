import styled from "styled-components";

const Styledavatar = styled.img`
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 50%;
  object-fit: cover;
`;

function Avatar({ image = "https://i.pravatar.cc/150" }) {
  return <Styledavatar src={image} alt={image} />;
}

export default Avatar;
