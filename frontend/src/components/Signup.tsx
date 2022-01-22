import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { signUp } from "../auth";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const user = { name, email, password };
    fetch("http://localhost:5000/api/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setError("");
          setSuccess(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="container">
        <h2 className="mt-5 mb-5">Sign up</h2>

        <div
          className="alert alert-primary"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
        <div
          className="alert alert-info"
          style={{ display: success ? "" : "none" }}
        >
          New account is successfully created. Please{" "}
          <Link to="/signin"> sign in </Link>
        </div>

        <form onSubmit={handleSubmit} className="">
          <div className="form-group">
            <label htmlFor="name" className="text-muted">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="text-muted">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="text-muted">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />
          </div>
          <button className="btn btn-raised btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
