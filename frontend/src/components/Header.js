import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../images/logo.svg";
function Header(props) {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Место." />
      {props.loggedIn ? (
        <div className="header__exit">
          <p className="header__email">{props.email}</p>
          <Link
            className="header__link header__link_logged"
            to="/sign-in"
            onClick={props.onSignOut}
          >
            Выйти
          </Link>
        </div>
      ) : (
        <Link
          className="header__link"
          to={currentPath.search("/sign-up") ? "/sign-up" : "/sign-in"}
        >
          {currentPath.search("/sign-up") ? "Регистрация" : "Войти"}
        </Link>
      )}
    </header>
  );
}

export default Header;
