import { useState } from "react";
import { useCookies } from "react-cookie";

const Auth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const apiUrl =
    import.meta.env.VITE_SERVERURL || "https://test-api.onedieta.ru/todo-app";
  const [error, setError] = useState(null);
  const [isLogin, setIslogin] = useState(true);
  const [email, setEmail] = useState(null);
  const [name, setName] = useState("User");
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const viewLogin = (status) => {
    setError(null);
    setIslogin(status);
  };

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      setError("Подтвердите пароль");
      return;
    }
    const response = await fetch(`${apiUrl}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (data.detail) {
      setError(data.detail);
    } else {
      setCookie("Email", data.email);
      setCookie("Token", data.token);
      setCookie("Name", data.name);

      window.location.reload();
    }
    console.log(data);
  };
  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <form>
          <h2>{isLogin ? "Войти" : "Зарегистрироваться"}</h2>
          {!isLogin && (
            <input
              type="name"
              placeholder="Имя"
              onChange={(e) => setName(e.target.value)}
              required
              value={name}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
            value={email}
          />
          <input
            type="password"
            name=""
            id=""
            placeholder="Пароль"
            onChange={(e) => setPassword(e.target.value)}
            required
            value={password}
          />
          {!isLogin && (
            <input
              type="password"
              name=""
              id=""
              placeholder="Подтвердите пароль"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              value={confirmPassword}
            />
          )}
          <input
            type="submit"
            className="create"
            disabled={(!password && !email) || !name}
            onClick={(e) => handleSubmit(e, isLogin ? "login" : "signup")}
          />
          {error && <p className="error-auth">{error}</p>}
        </form>
        <div className="auth-options">
          <button
            onClick={() => viewLogin(false)}
            style={{
              backgroundColor: !isLogin
                ? "rgb(255, 255, 255)"
                : "rgb(188, 188, 188)",
            }}
          >
            Регистрация
          </button>
          <button
            onClick={() => viewLogin(true)}
            style={{
              backgroundColor: isLogin
                ? "rgb(255, 255, 255)"
                : "rgb(188, 188, 188)",
            }}
          >
            Вход
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
