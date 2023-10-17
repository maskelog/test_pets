import React, { useState } from "react";

import styles from "./Login.module.css";

const LoginComponent = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  // 이메일 유효성 검사 함수
  const validateEmail = (email) => {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      setError("Invalid email format.");
      return;
    }
    if (!password) {
      setError("Password is not entered.");
      return;
    } // existing login code...        if (res.status === 422) {            setError('Email or password does not match.');
    return;
  }; // handle success...    }

  const login = async () => {
    // 이메일 및 비밀번호 유효성 검사
    if (!email || !validateEmail(email)) {
      setError("올바른 이메일 형식을 입력해주세요.");
      return;
    }

    if (!password) {
      setError("비밀번호를 입력해주세요.");
      return;
    }

    // API 호출
    try {
      const res = await fetch("https://api.mandarin.weniv.co.kr/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: { email, password } }),
      });

      const data = await res.json();

      if (data.status === 422) {
        setError(data.message); // 서버에서 받은 에러 메시지를 설정
      }
    } catch (err) {
      console.error(err);
    }
  };

  const socialLogin = (platform) => {
    switch (platform) {
      case "google":
        console.log("Google login not implemented yet.");

        // TODO: Implement Google login here
        break;

      case "facebook":
        console.log("Facebook login not implemented yet.");

        // TODO: Implement Facebook login here
        break;

      case "naver":
        console.log("Naver login not implemented yet.");

        // TODO: Implement Naver login here
        break;

      case "kakao":
        console.log("Kakao login not implemented yet.");

        // TODO: Implement Kakao login here
        break;

      default:
        console.error("Unknown platform:", platform);
    }
  };

  return (
    // <main className={styles.loginEmail}>
    <main className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h1>로그인</h1>
        <section className={styles.loginEmailContainer}>
          <form>
            <div className={styles.inputContainer}>
              <label htmlFor="">이메일</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(""); // 이메일을 입력할 때마다 에러 메시지를 초기화
                }}
              />
            </div>
            <div
              className={`${styles.inputContainer} ${styles.inputContainerPw}`}
            >
              <label htmlFor="">비밀번호</label>
              <input
                type="password"
                id="pw"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(""); // 비밀번호를 입력할 때마다 에러 메시지를 초기화
                }}
              />
            </div>
            {(email === "" || password === "") &&
              (email !== "" || password !== "") && (
                <div className={styles.error}>
                  이메일 또는 비밀번호를 입력해주세요.
                </div>
              )}
            {/* 다른 에러 메시지를 표시 */}
            {error && <div className={styles.error}>{error}</div>}{" "}
            {/* 에러 메시지를 표시 */}
            <button
              id="login-btn"
              className={`${styles.initButton} ${styles.lButton} ${styles.disabledButton} ${styles.loginBtn} ${styles.customButton}`}
              type="button"
              onClick={login} // login 함수가 클릭될 때 호출됩니다.
            >
              로그인
            </button>
            <button
              className={`${styles.joinEmailBtn} ${styles.customButton}`}
              type="button"
            >
              이메일로 회원가입
            </button>
          </form>
        </section>
        <section>
          <p className={styles.sectionLine}>또는</p>
          <button
            onClick={() => socialLogin("google")}
            className={`${styles.googleConnect} ${styles.customButton}`}
          >
            <span>구글 계정으로 로그인</span>
          </button>
          <button
            onClick={() => socialLogin("facebook")}
            className={`${styles.facebookConnect} ${styles.customButton}`}
          >
            <span>페이스북 계정으로 로그인</span>
          </button>
          <button
            onClick={() => socialLogin("naver")}
            className={`${styles.naverConnect} ${styles.customButton}`}
          >
            <span>네이버 계정으로 로그인</span>
          </button>
          <button
            onClick={() => socialLogin("kakao")}
            className={`${styles.kakaoConnect} ${styles.customButton}`}
          >
            <span>카카오톡 계정으로 로그인</span>
          </button>
        </section>
      </div>
    </main>
  );
};

export default LoginComponent;
