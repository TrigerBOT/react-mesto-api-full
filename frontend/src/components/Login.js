import React, { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";

function Login({ loggedIn, authorize }) {
  const [dataLogin, setDataLogin] = useState({
    password: "",
    email: "",
  });

  const history = useHistory();

  useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [loggedIn]);

  function handleChange(e) {
    const { name, value } = e.target;
    setDataLogin({ ...dataLogin, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    authorize(dataLogin.password, dataLogin.email);
    setDataLogin({ password: "", email: "" });
  }

  return (
    <div className="register">
      <div className="register__container">
        <form
          onSubmit={handleSubmit}
          action="#"
          id="form_reset"
          className="register__form"
          name
          noValidate
        >
          <div>
            <h2 className="register__title">Вход</h2>
            <input
              onChange={handleChange}
              className="register__input"
              type="email"
              name="email"
              placeholder="Email"
              value={dataLogin.email}
              required
            ></input>
            <input
              onChange={handleChange}
              className="register__input"
              type="password"
              name="password"
              placeholder="Пароль"
              value={dataLogin.password}
              required
            ></input>
          </div>
          <div className="register_type_button-container">
            <button type="submit" className="register__button">
              Войти
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
