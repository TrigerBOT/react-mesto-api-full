import React from 'react';
import close from '../images/closeic.svg';

function CloseButton(props) {
  return (
    <img className="button popup__close"
         onClick={props.closeHandler}
         src={close}
         alt="Закрыть"
    />
  );
}

export default CloseButton;