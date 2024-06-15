import { Link, Outlet, useOutletContext } from "react-router-dom";
import "./Navbar.style.scss";
import useAuth from "../../providers/useAuth";

const Navbar = () => {
  const { logout } = useAuth();

  return (
    <>
      <nav className="navbar">
        <h1 className="navbar__branding">Tic Tac Toe</h1>
        <ul className="navbar__links">
          <Link className="navbar__link" to=".">
            Home
          </Link>
          <Link className="navbar__link" to="upload-picture">
            Avatar
          </Link>
          <a className="navbar__link" onClick={logout}>
            Sign out
          </a>
        </ul>
      </nav>
      <Outlet context={useOutletContext()} />
    </>
  );
};
export default Navbar;
