// @ts-nocheck
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { isAuthenticated } from "../auth/index";

const Home = () => {
  let user;
  if (isAuthenticated()) {
    user = jwt_decode(isAuthenticated());
  }
  console.log(user);

  return (
    <div className="container">
      {!user ? (
        <>
          <h2 className="mt-5 mb-5">Not AUthorized</h2>
        </>
      ) : (
        <>
          <h2 className="mt-5 mb-5">Authorized</h2>
          <p className="">Hola {user.name}</p>
          <Link className="btn btn-raised btn-success mr-5" to={"/users"}>
            View all users
          </Link>
          <p className="">id {user.user}</p>
        </>
      )}
    </div>
  );
};

export default Home;
