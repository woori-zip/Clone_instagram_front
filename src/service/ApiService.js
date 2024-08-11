import axios from "axios";
import { API_BASE_URL } from "../axios";

const ACCESS_TOKEN = "access";
const REFRESH_TOKEN_COOKIE = "refresh";

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 쿠키를 포함한 요청 허용
});

// 요청 인터셉터 설정: 각 요청에 `access` 토큰을 `access` 헤더에 추가
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (token && config.url !== "/signup" && config.url !== "/login") {
    config.headers["access"] = token; // `access` 토큰을 `access` 헤더에 추가
  }
  return config;
});

// 응답 인터셉터 설정: `401 Unauthorized`가 발생하면 `refresh` 토큰으로 갱신 요청
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        // `refresh` 토큰은 쿠키에 있으므로 `withCredentials: true`로 자동 전송
        const response = await axios.post(`${API_BASE_URL}/reissue`, null, {
          withCredentials: true, // 쿠키 포함
        });

        if (response.status === 200) {
          const newAccessToken = response.headers["access"];
          // `refresh` 토큰은 자동으로 쿠키로 설정됨

          // 새로 발급받은 `access` 토큰 저장
          if (newAccessToken) {
            localStorage.setItem(ACCESS_TOKEN, newAccessToken);
            originalRequest.headers["access"] = newAccessToken; // 원래 요청에 새로운 `access` 토큰 추가
          }

          // 원래 요청 재시도
          return axiosInstance(originalRequest);
        }
      } catch (e) {
        console.error("토큰 재발급 실패", e);

        // 여기에서 e.response.status를 사용해 400 상태를 확인하고 토큰을 삭제
        if (e.response && e.response.status === 400) {
          // 리프레시 토큰이 만료된 경우
          localStorage.removeItem(ACCESS_TOKEN);
          document.cookie = `${REFRESH_TOKEN_COOKIE}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
          window.location.href = "/accounts/login";
        }
      }
    }

    return Promise.reject(error);
  }
);

// 쿠키에서 이름에 해당하는 값을 가져오는 함수
function getCookie(name) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  if (match) return match[2];
  return null;
}

// API 호출 함수
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

// 로그인 함수
export const signin = async (userDTO) => {
  try {
    const response = await axiosInstance.post("/login", userDTO);
    console.log("응답 헤더:", response.headers);

    const accessToken = response.headers["access"];
    const refreshToken = getCookie(REFRESH_TOKEN_COOKIE); // 서버에서 Set-Cookie로 저장된 쿠키 가져오기

    if (response.status === 200) {
      if (accessToken) {
        localStorage.setItem(ACCESS_TOKEN, accessToken);
        console.log("액세스 토큰 설정됨:", accessToken);
        window.location.href = "/";
      } else {
        console.error("응답에 토큰이 없습니다.");
      }
    } else {
      alert("로그인 실패");
    }
  } catch (error) {
    console.error("로그인 실패:", error);
    alert(
      "로그인 실패: " + (error?.response?.data?.message || "알 수 없는 오류")
    );
  }
};

// 로그아웃 함수
export const signout = async () => {
  try {
    const response = await axiosInstance.post("/logout");
    if (response.status === 200) {
      localStorage.removeItem(ACCESS_TOKEN);
      document.cookie = `${REFRESH_TOKEN_COOKIE}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
      window.location.href = "/accounts/login";
    } else {
      console.error("로그아웃 실패: 서버에서 성공적으로 처리되지 않음");
      alert("로그아웃 실패: 다시 시도해 주세요.");
    }
  } catch (error) {
    console.error("로그아웃 실패:", error);
    alert("로그아웃 실패: 서버에서 오류가 발생했습니다.");
    // 로그아웃 실패 시에도 토큰을 제거하고 리디렉션을 시도합니다.
    localStorage.removeItem(ACCESS_TOKEN);
    document.cookie = `${REFRESH_TOKEN_COOKIE}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    window.location.href = "/accounts/login";
  }
};

// 회원가입 함수
export const signup = async (userDTO) => {
  try {
    return await call("/signup", "POST", userDTO);
  } catch (error) {
    console.error("회원가입 실패:", error);
  }
};

// 이메일 중복 확인 함수
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

// 전화번호 중복 확인 함수
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

// 사용자 이름 중복 확인 함수
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

// 로그인 상태 확인 함수
export const isLoggedIn = () => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  console.log("로그인 상태:", !!token, "토큰:", token);
  return !!token;
};

// 사용자 정보 가져오기 함수
export const getUserInfo = async () => {
  try {
    return await call("/api/users/profile", "GET", null);
  } catch (error) {
    console.error("사용자 정보 가져오기 실패:", error);
  }
};
