import PopupWithForm from './PopupWithForm';
import React , {useState}  from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
export default function EditProfilePopup({ isOpen, onClose,onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName]= useState('');
  const [about, setAbout]=useState('');
  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name: name,
      about: about,
    });
    
    
  }
  function handleChange(evt){
    evt.target.name === 'name'
    ? setName(evt.target.value)
    : setAbout(evt.target.value);
  }
  React.useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser]);
    return (
        <PopupWithForm
          title="Редактировать профиль"
          name="edit-profile"
          buttonName="Сохранить"
          isOpen={isOpen}
          onClose={onClose}
         onSubmit={handleSubmit}
        >
          
            <input
              id="name-input"
              type="text"
              name="name"
              value={name || ''}
              className="popup__input"
              placeholder="Ваше имя"
              required
              minLength="2"
              maxLength="40"
              onChange={handleChange}
      
            />
            <span
              id="name-input-error"
              className="popup__input-error"
            ></span>
  
       
            <input
              id="about-input"
              type="text"
              name="about"
              value={about || ''}
              className="popup__input"
              placeholder="О себе"
              required
              minLength="2"
              maxLength="200"
             onChange={handleChange}
           
            />
            <span
              id="about-input-error"
              className="popup__input-error"
            ></span>
        </PopupWithForm>)
}