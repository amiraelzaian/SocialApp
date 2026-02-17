import { useLocation } from "react-router-dom";

export function useGetPage() {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);
  const lastSegment = segments[0];

  const pageNames = {
    messages: "Messages",
    notifications: "Notifications",
    discover: "Discover",
    profile: "Profile",
  };

  const nameOfPage = pageNames[lastSegment] || "Home";

  return { nameOfPage };
}
