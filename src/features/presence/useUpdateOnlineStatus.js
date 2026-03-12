import { useEffect } from "react";
import { trackPresence, updateOnlineStatus } from "../../services/apiPresence";

export function useUpdateOnlineStatus() {
  useEffect(() => {
    //1- mark online when mount :)
    updateOnlineStatus(true);

    //2- handle tab switch

    function handleVisibilityChange() {
      if (document.visibilityState === "visible") {
        updateOnlineStatus(true); // in tab
      } else {
        updateOnlineStatus(false); //not in tab
      }
    }
    //3- handle tab close
    function handleBeforeUnload() {
      updateOnlineStatus(false);
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);

    //4- heatbeat every 30s
    const interval = setInterval(trackPresence, 30000);

    //5- cleanup :)
    return () => {
      updateOnlineStatus(false);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      clearInterval(interval);
    };
  }, []);
}
