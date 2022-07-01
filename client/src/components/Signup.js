import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function changeName(e) {
    setName(e.target.value);
  }
  function changeEmail(e) {
    setEmail(e.target.value);
  }
  function changePassword(e) {
    setPassword(e.target.value);
  }
  function changeConfirmPassword(e) {
    setConfirmPassword(e.target.value);
  }

  async function handleSignUp(e) {
    e.preventDefault();
    const res = await fetch("/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        confirm_password: confirmPassword,
      }),
    });

    // const data = await res.json();

    if (res.status === 400) {
      window.alert("Validation Error");
    } else if (res.status === 201) {
      window.alert("Signup successfull");
    }
  }
  return (
    <>
      <div className="container w-50 my-4">
        <h1 className="text-center">Create an Account</h1>
        <form action="" className="row g-3 my-3">
          <div className="col-md-6">
            <label htmlFor="inputName4" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="inputName4"
              name="name"
              value={name}
              onChange={changeName}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="inputEmail4"
              name="email"
              value={email}
              onChange={changeEmail}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputPassword" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              name="password"
              value={password}
              onChange={changePassword}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputConfirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="inputConfirmPassword"
              name="confirm_password"
              value={confirmPassword}
              onChange={changeConfirmPassword}
            />
          </div>
          <small>
            Already have an account?{" "}
            <Link to="/login" className="text-decoration-none">
              login
            </Link>
          </small>
          <button
            className="btn btn-primary w-25 mx-auto"
            type="submit"
            onClick={handleSignUp}
          >
            Sign up
          </button>
        </form>
      </div>
    </>
  );
}
