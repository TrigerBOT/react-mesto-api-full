import PopupWithForm from './PopupWithForm';
import React, { useState } from 'react';
export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
 
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  function handleChange(e) {
    e.target.name === 'name' ? setName(e.target.value) : setLink(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="addCard"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >

      <input
       
        id="place-input"
        type="text"
        name="name"
        className="popup__input"
        placeholder="Название"
        minLength="1"
        maxLength="30"
        value={name || ''}
        onChange={handleChange}
        required
      />
      <span id="place-input-error" className="popup__input-error"></span>

      <input
      
        id="url-input"
        type="url"
        name="link"
        value={link || ''}
        className="popup__input"
        placeholder="Ссылка на картинку"
        onChange={handleChange}
        required
      />
      <span id="url-input-error" className="popup__input-error"></span>

    </PopupWithForm>
  );
}