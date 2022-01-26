// @ts-nocheck
import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { isAuthenticated } from "../auth/index";
import { useNavigate } from "react-router-dom";

const User = () => {
  const [data, setData] = useState([]);

  let navigate = useNavigate();

  let user;
  if (isAuthenticated()) {
    //@ts-ignore
    user = jwt_decode(isAuthenticated());
  }

  useEffect(() => {
    fetch("http://localhost:5000/api/all", {
      method: "GET",
      headers: new Headers({
        Authorization: user ? localStorage.getItem("suprime-jwt") : "",
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data.allUser);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!user) {
    navigate("/signin");
  }

  return (
    <div className="container">
      <h2 className="mt-5 mb-5">Users</h2>

      {user ? (
        <div className="">
          {data.map((user, i) => (
            <div
              key={i}
              className="row mt-4 px-5"
              style={{
                background: "#ccc",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p className="">Name: {user.name}</p>
              <p className="mt-2">Email: {user.email}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Please login to see users</p>
      )}

      <div className="row mt-4 "></div>
    </div>
  );
};

export default User;
