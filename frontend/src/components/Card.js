import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
export default function Card( {card,onCardClick,onLikeClick,onDeleteClick}){
  const currentUser = React.useContext(CurrentUserContext);
  console.log(card);
// Определяем, являемся ли мы владельцем текущей карточки
const isOwn = (card.owner === currentUser._id);

// Создаём переменную, которую после зададим в `className` для кнопки удаления
const cardDeleteButtonClassName = (
  `card__delete-button ${isOwn ? 'card__delete' : 'card__delete_hidden'}`
);
// Определяем, есть ли у карточки лайк, поставленный текущим пользователем
let isLiked=false;
if(card.likes.length > 0){
 isLiked = card.likes.some(i => i === currentUser._id);
}

// Создаём переменную, которую после зададим в `className` для кнопки лайка
const cardLikeButtonClassName =(`${!isLiked ? 'card__like' : 'card__liked'}`);
    return(    
  <div className="card" >
    <img src={card.link} alt={card.name} className="card__photo" onClick={onCardClick.bind(null,card)} />
        
        <button
          className={cardDeleteButtonClassName} onClick={onDeleteClick.bind(null,card)}
         />
     
    <div className="card__text">
        <h3 className="card__title">{card.name}</h3>
      <div className="card__likearea">
            <button className={cardLikeButtonClassName} onClick={onLikeClick.bind(card)}></button>
          <p className="card__counter">{card.likes.length}</p>    
      </div>
    </div>
</div>
)
}