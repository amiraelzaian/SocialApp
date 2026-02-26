export function timeAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr)) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  return `${Math.floor(diff / 86400)}d`;
}

export function dateConverter(value) {
  const date = new Date(value).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    day: "numeric",
  });
  return date;
}
