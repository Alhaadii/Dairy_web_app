import { useLocation, Link } from "react-router-dom";
import Avatar from "react-avatar";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
} from "../utils/LocalStorage";
export const Nav = () => {
  const { pathname } = useLocation();
  return (
    <nav className="navbar navbar-expand-sm navbar-dark primary ">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item title fs-4">
              <Link
                to="/"
                className={pathname === "/" ? "active nav-link " : "nav-link"}
              >
                Personal Diary
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            {getFromLocalStorage("userInfo") ? (
              <>
                <li className="nav-item">
                  <div className="flex justify-content-start align-items-center nav-link">
                    <Avatar
                      name={getFromLocalStorage("userInfo")?.name}
                      size="25"
                      round={true}
                      textSizeRatio="25px"
                      className="mb-1 me-1"
                    />
                    <span> {getFromLocalStorage("userInfo")?.name} </span>
                  </div>
                </li>
                <li className="nav-item">
                  <Link
                    onClick={() => removeFromLocalStorage("userInfo")}
                    to="/login"
                    className="nav-link"
                  >
                    Logout
                  </Link>
                </li>{" "}
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    to="/register"
                    className={
                      pathname === "/register" ? "active nav-link" : "nav-link"
                    }
                  >
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/login"
                    className={
                      pathname === "/login" ? "active nav-link" : "nav-link"
                    }
                  >
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
