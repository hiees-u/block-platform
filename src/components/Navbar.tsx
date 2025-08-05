import { Link, useLocation } from "react-router-dom";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./ui/dialog.tsx";

import ThemeToggle from "./ThemeToggle.tsx";
import PATHS from "@/routers/paths";
import { Menu } from "lucide-react";

function Navbar() {
  const location = useLocation();

  const linkClass = (path: string) => {
    const current = location.pathname;
    const isActive = current === path;
    return `px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-200 ${
      isActive ? "bg-gray-300 dark:bg-gray-300 font-semibold text-white" : ""
    }`;
  };

  return (
    <nav className="p-4 bg-gray-100 flex gap-4 dark:text-black justify-between">
      <div className="hidden sm:flex flex gap-4">
        <Link to={PATHS.HOME} className={linkClass(PATHS.HOME)}>
          Home
        </Link>
        <Link to={PATHS.ABOUT} className={linkClass(PATHS.ABOUT)}>
          About
        </Link>
        <Link to={PATHS.POSTS} className={linkClass(PATHS.POSTS)}>
          Post
        </Link>
      </div>
      <div className="sm:flex hidden">
        <ThemeToggle />
      </div>
      <div className="block sm:hidden">
        <Dialog>
          <DialogTrigger asChild>
            <button aria-label="Open menu">
              <Menu size={24} />
            </button>
          </DialogTrigger>

          <DialogContent className="pointer-events-auto h-screen w-1/2 left-0 translate-x-0 transform -translate-y-1/2 sm:max-w-sm max-w-xs">
            <div>
              <DialogHeader className="h-fit">
                <DialogTitle className="text-lg flex items-center justify-between dark:text-white">
                  Menu
                  <ThemeToggle />
                </DialogTitle>
              </DialogHeader>

              <DialogDescription className="flex flex-col gap-2">
                <DialogClose asChild>
                  <Link to={PATHS.HOME} className={linkClass(PATHS.HOME) + ' text-center'}>
                    Home
                  </Link>
                </DialogClose>
                <DialogClose asChild>
                  <Link to={PATHS.ABOUT} className={linkClass(PATHS.ABOUT) + ' text-center'}>
                    About
                  </Link>
                </DialogClose>
                <DialogClose asChild>
                  <Link to={PATHS.POSTS} className={linkClass(PATHS.POSTS) + ' text-center'}>
                    Post
                  </Link>
                </DialogClose>
              </DialogDescription>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </nav>
  );
}

export default Navbar;
