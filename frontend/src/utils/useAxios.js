import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const baseURL = "http://127.0.0.1:8000/api";

const useAxios = () => {
  const { authTokens, setUser, setAuthTokens } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authTokens?.access}` }
  });

  axiosInstance.interceptors.request.use(async req => {
    const user = jwt_decode(authTokens.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) return req;

    try {
      const response = await axios.post(`${baseURL}/token/refresh/`, {
        refresh: authTokens.refresh
      });
      localStorage.setItem("authTokens", JSON.stringify(response.data));
      setAuthTokens(response.data);
      setUser(jwt_decode(response.data.access));
      
      req.headers.Authorization = `Bearer ${response.data.access}`;
      return req;
    } catch (error) {
      // Tangani error refresh token
      console.error("Error refreshing token:", error);
      // Redirect ke halaman /unauthorized jika error 401
      if (error.response && error.response.status === 401) {
        window.location.href = '/unauthorized';
      }
      throw error;
    }
  });

  return axiosInstance;
};

export default useAxios;
