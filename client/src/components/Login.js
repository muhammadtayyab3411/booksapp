import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = res.json();

    console.log(res.status);
    if (res.status === 400 || !data) {
      window.alert(`Error while login status`);
    } else {
      navigate("/");
      // window.location.href = "/";
      window.location.reload(false);
      console.log("Login successfull");
    }
  };

  function changeEmail(e) {
    setEmail(e.target.value);
  }
  function changePassword(e) {
    setPassword(e.target.value);
  }
  return (
    <>
      <div className="container my-4 w-25">
        <h1 className="text-center">Login</h1>
        <form method="POST" action="" className="row g-3 my-3">
          <div className="col-12">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email"
              onChange={changeEmail}
              value={email}
              //   value={confirmPassword}
              //   onChange={changeConfirmPassword}
            />
          </div>
          <div className="col-12">
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Password"
              onChange={changePassword}
              value={password}
              //   value={confirmPassword}
              //   onChange={changeConfirmPassword}
            />
          </div>
          <small>
            Don't have an account?{" "}
            <Link to="/signup" className="text-decoration-none">
              Signup
            </Link>
          </small>
          <button
            className="btn btn-primary w-50 mx-auto"
            type="submit"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}
