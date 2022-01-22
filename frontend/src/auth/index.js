export const authenticate = (jwt, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(jwt));
    next();
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }

  if (localStorage.getItem("suprime-jwt")) {
    return JSON.parse(localStorage.getItem("suprime-jwt"));
  } else {
    return false;
  }
};
