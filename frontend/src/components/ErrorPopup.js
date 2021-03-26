import React from "react";

function ErrorPopup({ registerMessage, onClose, closeOver }) {
  return (
    <div className={`popup popup ${registerMessage && "popup_opened"}`}>
      <ul className="popup__lists">
        <li className="popup__register_error"></li>
        <li className="popup__register__title">
          Что-то пошло не так!Попробуйте ещё раз.
        </li>
        <button
          onClick={onClose}
          className="popup__close"
          type="button"
        ></button>
      </ul>
    </div>
  );
}

export default ErrorPopup;
