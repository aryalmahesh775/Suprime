import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/index";

const Home = () => {
  return (
    <div className="container">
      {!isAuthenticated() ? (
        <>
          <h2 className="mt-5 mb-5">Not AUthorized</h2>
        </>
      ) : (
        <>
          <h2 className="mt-5 mb-5">Authorized</h2>
          <Link className="btn btn-raised btn-success mr-5" to={"/users"}>
            View all users
          </Link>
        </>
      )}
    </div>
  );
};

export default Home;
