import { Link } from "react-router-dom";
import "./Navbar.style.scss";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="navbar__branding">Tic Tac Toe</h1>
      <ul className="navbar__links">
        <Link className="navbar__link" to=".">
          Home
        </Link>
        <Link className="navbar__link" to="login">
          Login
        </Link>
      </ul>
    </nav>
  );
};
export default Navbar;
