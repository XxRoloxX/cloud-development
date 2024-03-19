import { Link } from "react-router-dom";
import "./Navbar.style.scss";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="navbar__branding">Tic Tac Toe</h1>
      <ul className="navbar__links">
        <li className="navbar__link">
          <Link to=".">Home</Link>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
