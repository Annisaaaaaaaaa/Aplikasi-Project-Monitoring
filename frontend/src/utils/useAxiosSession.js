import axios from "axios";
import jwt_decode from "jwt-decode";
import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";

const baseURL = "http://127.0.0.1:8000/api";

const useAxios = () => {
  const { authTokens, setUser, setAuthTokens } = useContext(AuthContext);

  useEffect(() => {
    const handleUserActivity = () => {
      localStorage.setItem("lastActivity", Date.now());
    };

    document.addEventListener("mousemove", handleUserActivity);
    document.addEventListener("keydown", handleUserActivity);

    return () => {
      document.removeEventListener("mousemove", handleUserActivity);
      document.removeEventListener("keydown", handleUserActivity);
    };
  }, []);

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authTokens?.access}` }
  });

  axiosInstance.interceptors.request.use(async req => {
    const user = jwt_decode(authTokens.access);
    const currentTime = Math.floor(Date.now() / 1000);

    // Hitung waktu timeout menggunakan waktu kadaluarsa token dari backend
    const tokenExpiration = user.exp - user.iat;
    const logoutTime = user.iat + tokenExpiration;

    // Jika waktu sekarang sudah melebihi waktu kadaluarsa token, lakukan refresh token
    if (currentTime > logoutTime) {
      const response = await axios.post(`${baseURL}/token/refresh/`, {
        refresh: authTokens.refresh
      });
      localStorage.setItem("authTokens", JSON.stringify(response.data));
      localStorage.setItem("authTokens", JSON.stringify(response.data));

      setAuthTokens(response.data);
      setUser(jwt_decode(response.data.access));

      req.headers.Authorization = `Bearer ${response.data.access}`;
    }

    return req;
  });

  const lastActivity = localStorage.getItem("lastActivity");
  const timeout = 1000 * (authTokens?.accessExpiration - authTokens?.accessCreation); // in milliseconds
  if (lastActivity && Date.now() - lastActivity > timeout) {
    localStorage.removeItem("authTokens");
    // Redirect ke halaman login
    window.location.href = "/login";
  }

  return axiosInstance;
};

export default useAxios;
