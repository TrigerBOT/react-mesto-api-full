import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
export default function Main({ onEditAvatar,
    onEditProfile,
    onAddPlace, cards, onCardClick,onLikeClick,onDeleteClick }) {

    const currentUser = React.useContext(CurrentUserContext);


    return (
        <div className="main">
            <section className="profile">
                <div className="profile__avatar">
                    <img src={currentUser.avatar} alt="фото профиля" className="profile__photo" />
                    <div className="profile__avatar_over">
                        <button className="profile__overlay" onClick={onEditAvatar} />
                    </div>
                </div>
                <div className="profile__info">
                    <div className="profile__title">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button type="button" className="profile__edit-button" onClick={onEditProfile} />
                    </div>
                    <p className="profile__about">{currentUser.about}</p>
                </div>
                <button type="button" className="profile__add-button" onClick={onAddPlace}> </button>
            </section>
            <section className="cards">

                {cards.map((card) => (

                    <Card
                        key={card._id}
                        card={card}
                        onCardClick={onCardClick}
                        onLikeClick={onLikeClick}
                        onDeleteClick={onDeleteClick}
                    />
                ))}
            </section>
        </div>);
}