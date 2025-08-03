import { Link } from "react-router-dom";
import PATHS from '../routers/paths'

function Navbar() {
  return (
    <nav className="p-4 bg-gray-100 flex gap-4">
      <Link to={PATHS.HOME}>Home</Link>
      <Link to={PATHS.ABOUT}>About</Link>
      <Link to={PATHS.POSTS}>Post</Link>
    </nav>
  );
}

export default Navbar;
