import axios from "axios";
import { API_BASE_URL } from "../axios";

const ACCESS_TOKEN = "ACCESS_TOKEN";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//토큰 인증이 필요한 페이지 헤더에 토큰값 저장 ex)마이페이지, 메인페이지
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (token && config.url !== "/signup" && config.url !== "/login") {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    const token = response.headers["authorization"];
    if (token) {
      localStorage.setItem(ACCESS_TOKEN, token.split(" ")[1]);
    }
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem(ACCESS_TOKEN);
      window.location.href = "/accounts/login";
    }
    return Promise.reject(error);
  }
);

export const call = async (api, method, request) => {
  const config = {
    url: api,
    method: method,
    data: request,
  };

  try {
    const response = await axiosInstance(config);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const signin = async (userDTO) => {
  try {
    const response = await axiosInstance.post("/login", userDTO);
    window.location.href = "/";
  } catch (error) {
    console.error("로그인 실패:", error);
    alert("로그인 실패");
  }
};

export const signout = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  window.location.href = "/accounts/login";
};

export const signup = async (userDTO) => {
  try {
    return await call("/signup", "POST", userDTO);
  } catch (error) {
    console.error("회원가입 실패:", error);
  }
};

export const checkEmailExists = async (email) => {
  try {
    const response = await axiosInstance.get(
      `/api/users/check-email?email=${email}`
    );
    return response.data;
  } catch (error) {
    console.error("이메일 중복 검사 실패:", error);
    return false;
  }
};

export const checkPhoneExists = async (phone) => {
  try {
    const response = await axiosInstance.get(
      `/api/users/check-phone?phone=${phone}`
    );
    return response.data;
  } catch (error) {
    console.error("전화번호 중복 검사 실패:", error);
    return false;
  }
};

export const checkUserIdExists = async (userId) => {
  try {
    const response = await axiosInstance.get(
      `/api/users/check-userid?userId=${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("사용자 이름 중복 검사 실패:", error);
    return false;
  }
};

// 로그인 상태 확인
export const isLoggedIn = () => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  return !!token; // 토큰이 있으면 true, 없으면 false 반환
};
