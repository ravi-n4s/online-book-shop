const isLoggedIn = () => {
  return localStorage.getItem("token") ? true : false;
};

const getToken = () => {
  return localStorage.getItem("token");
};

const clearToken = () => {
  localStorage.removeItem("token");
};

export { isLoggedIn, clearToken, getToken };
