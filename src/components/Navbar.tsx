import { Link, useLocation } from "react-router-dom";
// import { Dialog } from "./ui/dialog.tsx";

import ThemeToggle from './ThemeToggle.tsx';
import PATHS from '@/routers/paths';
import { Menu } from "lucide-react";

function Navbar() {
  const location = useLocation();

  const linkClass = (path: string) => {
    const current = location.pathname;
    const isActive = current === path;
    return `px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-200 ${
      isActive ? "bg-gray-300 dark:bg-gray-300 font-semibold" : ""
    }`;
  };

  return (
    <nav className="p-4 bg-gray-100 flex gap-4 dark:text-black justify-between">
      <div className="hidden sm:flex flex gap-4">
        <Link to={PATHS.HOME} className={linkClass(PATHS.HOME)}>Home</Link>
        <Link to={PATHS.ABOUT} className={linkClass(PATHS.ABOUT)}>About</Link>
        <Link to={PATHS.POSTS} className={linkClass(PATHS.POSTS)}>Post</Link>
      </div>
      <div className="sm:flex hidden">
        <ThemeToggle />
      </div>
      <div className="sm:hidden block">
        <Menu size={24} />
      </div>
    </nav>
  );
}

export default Navbar;
