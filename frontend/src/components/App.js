import React, { useState, useEffect } from "react";

import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";
import Header from "./Header";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Main from "./Main";

import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeleteCardPopup from "./ConfirmDeleteCardPopup";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import * as Auth from "../utils/auth";
import DonePopup from "./DonePopup";
import ErrorPopup from "./ErrorPopup";
import api from "../utils/api";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [
    isConfirmDeleteCardPopupOpen,
    setConfirmDeleteCardPopupOpen,
  ] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [registerMessage, setRegisterMessage] = useState(false);
  const [doneRegMessage, setDoneMessage] = useState(false);
  const [registered, setRegin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    setConfirmDeleteCardPopupOpen(false);
    setRegisterMessage(false);
    setDoneMessage(false);
  }
  const history = useHistory();

 
  React.useEffect(() => {
    if(loggedIn){
    api
      .getInitialsCards()
      .then((cards) => {
        setCards(cards);
      })

      .catch((err) => {
        console.log(err + " карточки");
      });}
  }, [loggedIn]);
  console.log(currentUser);
  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      Auth.getContent(jwt)
        .then((res) => {
          console.log("getme");
          setLoggedIn(true);
          setCurrentUser(res.data);
          setEmail(res.data.email);
          return true;
        })
        .catch((err) => console.log(err));
    }
  }, []);

  function authorize(password, email) {
    Auth.authorize(password, email)
      .then((data) => {
        console.log(data + "auth");
        if (data) {
          Auth.getContent(data.jwt)
        .then((res) => {
          console.log("getme");
          setLoggedIn(true);
          setCurrentUser(res.data);
          setEmail(res.data.email);
          console.log(currentUser)
          return true;
            
            })
            .catch((err) => console.log(err));
          setLoggedIn(true);
        } else {
          openPopupError();
        }
      })
      .catch((err) => console.log(err));
  }

  function register(password, email) {
    Auth.register(password, email)
      .then((res) => {
        console.log(res);
        if (res) {
          openPopupDone();
          setRegin(true);
        } else {
          openPopupError();
        }
      })
      .catch((err) => console.log(err));
  }
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
        const newCards = cards.map((c) => (c._id === card._id ? newCard.data : c));
        // Обновляем стейт
        setCards(newCards);
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }
  function handleAddPlace(card) {
    api
      .postCard(card)
      .then((newCard) => {
        setCards([newCard.data, ...cards]);
        closeAllPopups();
      })
      .catch((err) =>
        console.log(`Ошибка при добавлении новой карточки: ${err}`)
      );
  }
  function handleCardDelete(cardToDelete) {
    api
      .removeCard(cardToDelete._id)
      .then(() => setCards(cards.filter((card) => card !== cardToDelete)))
      .catch((err) => console.log(`Ошибка: ${err}`));
  }
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  function handleUpdateUser(userData) {
    api
      .editUserInfo(userData)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }
  function handleUpdateAvatar(newAvatar) {
    api
      .editAvatar(newAvatar)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setImagePopupOpen(true);
    setSelectedCard(card);
  }

  //14 спринт новые данные,функции (структориз  овать позже)

  function openPopupError() {
    setRegisterMessage(true);
  }

  function openPopupDone() {
    setDoneMessage(true);
  }

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    setCurrentUser({});
    setEmail("");
    console.log('dsa')
  }
  function handleLogin() {
    setLoggedIn(true);
  }
  

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <BrowserRouter>
        <Header email={email} loggedIn={loggedIn} onSignOut={handleSignOut} />
        <Switch>
          <Route path="/sign-up">
            {loggedIn ? (
              <Redirect to="/" />
            ) : (
              <Register
                registration={register}
                setRegin={setRegin}
                registered={registered}
              />
            )}
          </Route>
          <Route path="/sign-in">
            {loggedIn ? (
              <Redirect to="/" />
            ) : (
              <Login
                handleLogin={handleLogin}
                handleEmail={setEmail}
                loggedIn={loggedIn}
                authorize={authorize}
                openPopupError={openPopupError}
              />
            )}
          </Route>

          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onAddPlace={handleAddPlaceClick}
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onLikeClick={handleCardLike}
            onDeleteClick={handleCardDelete}
            cards={cards}
          />
          
        </Switch>
      </BrowserRouter>
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlace}
      />
      <ConfirmDeleteCardPopup
        isOpen={isConfirmDeleteCardPopupOpen}
        onClose={closeAllPopups}
      />
      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
      />
      <ErrorPopup onClose={closeAllPopups} registerMessage={registerMessage} />
      <DonePopup onClose={closeAllPopups} doneRegMessage={doneRegMessage} />
    </CurrentUserContext.Provider>
  );
}

export default App;
