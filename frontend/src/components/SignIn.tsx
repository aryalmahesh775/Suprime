import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    const user = { email, password };
    fetch("http://localhost:5000/api/signin", {
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
          setLoading(false);
          setError(data.error);
        } else {
          setLoading(false);
          //   authenticate && redirect
          if (typeof window !== "undefined") {
            // localStorage.setItem("suprime-jwt", JSON.stringify(data.token));
            localStorage.setItem("suprime-jwt", data.token);
          }
          setRedirect(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // signIn(user);
  };

  if (redirect) {
    navigate("/");
  }

  return (
    <div>
      <div className="container">
        {loading && <div className="jumbotron text-center">loading...</div>}
        <div className="">
          <h2 className="mt-5 mb-5">Sign In</h2>

          <div
            className="alert alert-primary"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>

          <form onSubmit={handleSubmit} className="">
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
    </div>
  );
};

export default Signin;
