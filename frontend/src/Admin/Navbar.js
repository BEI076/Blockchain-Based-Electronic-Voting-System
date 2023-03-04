import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div class="navbar">
      <ul>
        <li>
          {" "}
          {/* <a href="./manage.html">Manage</a>{" "} */}
          <Link to={`/manage`} className="nav-link">
            Manage
          </Link>
        </li>
        <li>
          {/* <a href="./register.html">Register</a>{" "} */}
          <Link to={`/register`} className="nav-link">
            Register
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default Navbar;
