import { createContext, useContext } from "react";
import { useScreenSize } from "../hooks/useScreenSize";

const screenSizeContext = createContext();

function ScreenProvider({ children }) {
  const { isMobile } = useScreenSize();

  return (
    <screenSizeContext.Provider value={{ isMobile }}>
      {children}
    </screenSizeContext.Provider>
  );
}

function useScreen() {
  const context = useContext(screenSizeContext);
  if (context === undefined)
    throw new Error("context is used outside its provider");
  return context;
}
export { useScreen, ScreenProvider };
