import { NavLink, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../auth/index";

const Header = () => {
  let navigate = useNavigate();

  const signOut = (next: any) => {
    if (typeof window !== "undefined") localStorage.removeItem("suprime-jwt");
    next();
    return fetch(`${process.env.REACT_APP_API_URL}/signout`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="">
      <ul
        style={{ display: "flex", justifyContent: "space-around" }}
        className="nav nav-tabs bg-primary"
      >
        <li className="">
          <NavLink
            style={({ isActive }) => {
              return {
                color: isActive ? "Yellow" : "white",
              };
            }}
            className="nav-link"
            to="/"
          >
            Home
          </NavLink>
        </li>
        {!isAuthenticated() ? (
          <>
            <li className="nav-item">
              <NavLink
                style={({ isActive }) => {
                  return {
                    color: isActive ? "Yellow" : "white",
                  };
                }}
                className="nav-link"
                to="/signin"
              >
                Sign In
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                style={({ isActive }) => {
                  return {
                    color: isActive ? "Yellow" : "white",
                  };
                }}
                className="nav-link"
                to="/signup"
              >
                Sign up
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <NavLink
                style={({ isActive }) => {
                  return {
                    color: isActive ? "Yellow" : "white",
                  };
                }}
                className="nav-link"
                to="/users"
              >
                Users
              </NavLink>
            </li>
            <li className="nav-item">
              <span
                className="nav-link"
                style={{ cursor: "pointer" }}
                onClick={() => signOut(() => navigate("/"))}
              >
                Sign Out
              </span>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Header;
