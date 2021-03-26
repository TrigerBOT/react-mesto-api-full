
import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';
export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  const inputRef = useRef('');
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({avatar:inputRef.current.value} );
  }
  React.useEffect(() => {
    inputRef.current.value = '';
  }, [isOpen]);
  return (
    <PopupWithForm
      title="Обновить аватар"
      name="change-avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >

      <input
        ref={inputRef}
        id="avatar-input"
        type="url"
        name="avatar"
        className="popup__input"
        placeholder="Ссылка на аватар"
        required
        noValidate
      />

      <span id="avatar-input-error" className="popup__input-error"></span>

    </PopupWithForm>
  );
}