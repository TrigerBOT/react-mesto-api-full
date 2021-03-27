import React from "react"

function DonePopup({ doneRegMessage, onClose }) {

    return (
        <div className={`popup popup ${doneRegMessage && "popup_opened"}`}>
            <ul className="popup__lists">
                <li className="popup__register_done"></li>
                <li className="popup__register__title">Вы успешно зарегистрировались!</li>
                <button onClick={onClose} className="popup__close" type="button"></button>
            </ul>
        </div>
    )
}

export default DonePopup