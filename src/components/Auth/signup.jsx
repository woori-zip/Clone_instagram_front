import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/auth.module.css";
import {
  signup,
  checkEmailExists,
  checkPhoneExists,
  checkUserIdExists,
} from "../../service/ApiService";
import NotInterestedIcon from "@mui/icons-material/NotInterested";

function SignUp() {
  const [form, setForm] = useState({
    contact: "",
    email: "",
    phone: "",
    name: "",
    userId: "",
    password: "",
  });

  const [isInvalidContact, setIsInvalidContact] = useState(false);
  const [isInvalidUserId, setIsInvalidUserId] = useState(false);
  const [isEmailOrPhoneExists, setIsEmailOrPhoneExists] = useState(false);
  const [isUserIdExists, setIsUserIdExists] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showInvalidIcon, setShowInvalidIcon] = useState({
    contact: false,
    userId: false,
  });

  const [debounceTimeout, setDebounceTimeout] = useState(null);

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(01[016789])(\d{3,4})(\d{4})$/;
    const userIdRegex = /^[a-zA-Z0-9._]+$/;

    const isContactValid =
      emailRegex.test(form.contact) || phoneRegex.test(form.contact);
    const isUserIdValid =
      userIdRegex.test(form.userId) &&
      !emailRegex.test(form.userId) &&
      !phoneRegex.test(form.userId);
    const isFormFilled = form.name && form.password;

    setIsInvalidContact(!isContactValid && form.contact !== "");
    setIsInvalidUserId(!isUserIdValid && form.userId !== "");

    setIsFormValid(
      isContactValid &&
        isUserIdValid &&
        isFormFilled &&
        !isInvalidContact &&
        !isInvalidUserId &&
        !isEmailOrPhoneExists &&
        !isUserIdExists
    );
  }, [
    form,
    isInvalidContact,
    isInvalidUserId,
    isEmailOrPhoneExists,
    isUserIdExists,
  ]);

  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeoutId = setTimeout(() => {
      if (form.contact) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const type = emailRegex.test(form.contact) ? "email" : "phone";
        const checkFunction =
          type === "email" ? checkEmailExists : checkPhoneExists;
        checkFunction(form.contact).then((exists) => {
          setIsEmailOrPhoneExists(exists);
          setShowInvalidIcon((prev) => ({ ...prev, contact: exists }));
        });
      }
      if (form.userId) {
        checkUserIdExists(form.userId).then((exists) => {
          setIsUserIdExists(exists);
          setShowInvalidIcon((prev) => ({ ...prev, userId: exists }));
        });
      }
    }, 1000);

    setDebounceTimeout(timeoutId);

    return () => clearTimeout(timeoutId);
  }, [form.contact, form.userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "contact") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^(01[016789])(\d{3,4})(\d{4})$/;
      setForm((prevForm) => ({
        ...prevForm,
        contact: value,
        email: emailRegex.test(value) ? value : "",
        phone: phoneRegex.test(value) ? value : "",
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isInvalidUserId) {
      setErrorMessage(
        "사용자 이름에는 문자, 숫자, 밑줄 및 마침표만 사용할 수 있습니다."
      );
      return;
    }
    if (isInvalidContact) {
      setErrorMessage("유효한 이메일 주소나 전화번호를 입력해주세요.");
      return;
    }
    signup(form)
      .then((response) => {
        window.location.href = "/accounts/login";
      })
      .catch((error) => {
        setErrorMessage("회원가입 실패");
      });
  };

  return (
    <div className={`${styles.container} ${styles.mt20}`}>
      <div className={styles.formContainer}>
        <form noValidate onSubmit={handleSubmit}>
          <h1 className={styles.heading}>Instagram</h1>
          <p className={`${styles.textMuted} ${styles.mb20}`}>
            친구들의 사진과 동영상을 보려면 가입하세요.
          </p>

          <button className={`${styles.btn} ${styles.bgBlue} ${styles.mb20}`}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
              alt="Facebook logo"
              style={{ width: "20px", marginRight: "8px" }}
            />
            Facebook으로 로그인
          </button>

          <div className={styles.orSeparator}>
            <div className={styles.line}></div>
            <span>또는</span>
            <div className={styles.line}></div>
          </div>

          <div className={styles.inputWrapper}>
            <input
              className={styles.input}
              type="text"
              placeholder="휴대폰 번호 또는 이메일 주소"
              name="contact"
              value={form.contact}
              onChange={handleChange}
            />
            {showInvalidIcon.contact && (
              <NotInterestedIcon className={styles.invalidIcon} />
            )}
          </div>
          <input
            className={styles.input}
            type="text"
            placeholder="성명"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <div className={styles.inputWrapper}>
            <input
              className={`${styles.input} ${
                isInvalidUserId || isUserIdExists ? styles.invalid : ""
              }`}
              type="text"
              placeholder="사용자 이름"
              name="userId"
              value={form.userId}
              onChange={handleChange}
            />
            {showInvalidIcon.userId && (
              <NotInterestedIcon className={styles.invalidIcon} />
            )}
          </div>
          <input
            className={styles.input}
            type="password"
            placeholder="비밀번호"
            name="password"
            value={form.password}
            onChange={handleChange}
          />

          {errorMessage && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}

          <button
            className={`${styles.btn} ${styles.mb10} ${
              isFormValid ? styles.active : styles.inactive
            }`}
            type="submit"
            disabled={!isFormValid}
          >
            가입
          </button>
        </form>
      </div>

      <div className={`${styles.container} ${styles.mt20}`}>
        <div className={`${styles.formContainer}`}>
          계정이 있으신가요?{" "}
          <Link to="/accounts/login" className={styles.link}>
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
