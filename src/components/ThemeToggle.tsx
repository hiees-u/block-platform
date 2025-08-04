import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../store/themeSlice";
import { Sun, Moon } from "lucide-react";
import type { RootState } from "../store/store";

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const theme = useSelector((state : RootState) => state.theme.mode);

  return (
    <button onClick={() => dispatch(toggleTheme())} className="p-2">
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}
