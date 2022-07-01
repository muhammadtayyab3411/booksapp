import React from "react";
import { Link } from "react-router-dom";

function Navbar(props) {
  let style;
  let btnStyle;
  if (props.isValidUser === true) {
    console.log("inside true", props.isValidUser);
    style = {
      display: "none",
    };
    btnStyle = {
      display: "flex",
      visibility: "visible",
    };
  } else {
    console.log(props.isValidUser, "inside navbar testing");
    style = { display: "block" };
    btnStyle = { display: "none !important", visibility: "hidden" };
  }

  const logoutUser = async () => {
    const res = await fetch("http://localhost:8000/logout", {
      credentials: "include",
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 201) {
      window.location.href = "/login";
    } else {
      console.log("Error while logout");
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg text-white navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/showbooks">
            {props.title}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/showbooks"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/addbook">
                  Add Book
                </Link>
              </li>
              <li className="nav-item" style={style}>
                <Link className="nav-link" to="/signup">
                  Sign Up
                </Link>
              </li>
              <li className="nav-item" style={style}>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            </ul>
            <div className="dropdown" style={btnStyle}>
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                // style={btnStyle}
              >
                <i className="fa fa-user" style={{ marginRight: "4px" }}></i>{" "}
                {props.userData ? props.userData : "no user found"}
              </button>
              <ul
                className="dropdown-menu dropdown-menu-dark"
                aria-labelledby="dropdownMenuButton2"
                style={{ width: "100%", textAlign: "center" }}
              >
                <li>
                  <a
                    className="dropdown-item active"
                    href="/login"
                    onClick={logoutUser}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
            {/* <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form> */}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
