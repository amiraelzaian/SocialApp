import Hashtag from "../features/posts/Hashtag";

export const parseCaption = (text) => {
  if (!text) return null;

  const parts = text.split(/(#\w+)/g);
  return parts.map((part, i) => {
    if (part.startsWith("#")) {
      return <Hashtag key={i}>{part}</Hashtag>;
    }
    return <span key={i}>{part}</span>;
  });
};
