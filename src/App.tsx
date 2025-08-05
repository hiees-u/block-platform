import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "@/pages/HomePage";
import PostPage from "@/pages/PostPage";
import NotFoundPage from "./pages/NotFoundPage";
import PATHS from "@/routers/paths";
import Navbar from "@/components/Navbar.tsx";
import type { RootState } from "@/store/store.ts";

function App() {
  const theme = useSelector((state: RootState) => state.theme.mode);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className={'min-h-screen dark:bg-black text-black dark:text-white'}>
      <Navbar />
      <div className={`container p-4 mx-auto`}>
        <Routes>
          <Route path={PATHS.HOME} element={<HomePage />} />
          <Route path={PATHS.POSTS} element={<PostPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
