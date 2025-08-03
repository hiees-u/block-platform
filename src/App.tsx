import { Routes, Route } from "react-router-dom"

import HomePage from "./pages/HomePage"
import PostPage from "./pages/PostPage"
import AboutPage from "./pages/AboutPage"
import PATHS from './routers/paths'
import Navbar from "./components/Navbar.tsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path={PATHS.HOME} element={<HomePage/>}/>
        <Route path={PATHS.POSTS} element={<PostPage/>}/>
        <Route path={PATHS.ABOUT} element={<AboutPage/>}/>
      </Routes>
    </>
  )
}

export default App
