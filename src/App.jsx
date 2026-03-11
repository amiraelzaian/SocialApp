// App.jsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ScreenProvider } from "./context/ScreenSizeContext.jsx";
import { DarkModeProvider } from "./context/ThemeContext.jsx/";
import { SearchProvider } from "./context/SearchContext.jsx";
import { lazy } from "react";

import GlobalStyles from "./styles/GolobalStyles";

import ProtectedRoutes from "./ui/ProtectedRoutes.jsx";
import AppLayout from "./ui/AppLayout";

const Home = lazy(() => import("./pages/Home"));
const Discover = lazy(() => import("./pages/Discover"));
const Messages = lazy(() => import("./pages/Messages"));
const Profile = lazy(() => import("./pages/Profile"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Notifications = lazy(() => import("./pages/Notifications"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const PostDetails = lazy(() => import("./pages/PostDetails"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />

      <ScreenProvider>
        <SearchProvider>
          <DarkModeProvider>
            <BrowserRouter>
              <Routes>
                <Route
                  element={
                    <ProtectedRoutes>
                      <AppLayout />
                    </ProtectedRoutes>
                  }
                >
                  <Route path="/" element={<Home />} />
                  <Route path="/posts/:postId" element={<PostDetails />} />
                  <Route path="/:id" element={<Home />} />
                  <Route path="/discover" element={<Discover />} />
                  <Route path="discover/:id" element={<Profile />} />
                  <Route path="/messages" element={<Messages />} />
                  <Route path="/messages/:chatId" element={<Messages />} />
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/profile/:id" element={<Profile />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster
                position="top-center"
                gutter={12}
                containerStyle={{ margin: "8px" }}
                toastOptions={{
                  success: {
                    duration: 3000,
                  },
                  error: {
                    duration: 5000,
                  },
                  style: {
                    fontSize: "16px",
                    maxWidth: "500px",
                    padding: "16px 24px",
                    backgroundColor: "var(--color-grey-0)",
                    color: "var(--color-grey-700)",
                  },
                }}
              />
            </BrowserRouter>
          </DarkModeProvider>
        </SearchProvider>
      </ScreenProvider>
    </QueryClientProvider>
  );
}

export default App;
