// @ts-nocheck
import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { isAuthenticated } from "../auth/index";

const User = () => {
  const [data, setData] = useState([]);
  // let navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/all", {
      method: "GET",
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

  return (
    <div className="container">
      <h2 className="mt-5 mb-5">Users</h2>

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
      <div className="row mt-4 "></div>
    </div>
  );
};

export default User;
