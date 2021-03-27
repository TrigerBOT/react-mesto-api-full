import React, { useState,useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

function Register({ registration, setRegin, registered }) {
  const [dataUser, setDataUser] = useState({
    password: "",
    email: "",
  });

  const history = useHistory();
  function handleChange(e) {
    const { name, value } = e.target;
    setDataUser({ ...dataUser, [name]: value });
  }

  useEffect(() => {
    if (registered) {
      history.push("/sign-in");
      setRegin(false);
    }
  }, [registered]);

  function handleSubmit(e) {
    e.preventDefault();
    registration(dataUser.password, dataUser.email);
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
            <h2 className="register__title">Регистрация</h2>
            <input
              onChange={handleChange}
              className="register__input"
              type="email"
              name="email"
              placeholder="Email"
              value={dataUser.email}
            ></input>
            <input
              onChange={handleChange}
              className="register__input"
              type="password"
              name="password"
              placeholder="Пароль"
              value={dataUser.password}
            ></input>
          </div>
          <div className="register_type_button-container">
            <button className="register__button">Зарегистрироваться</button>
            <Link to={"/sign-in"} className="register__login">
              Уже зарегистрированы? Войти
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
