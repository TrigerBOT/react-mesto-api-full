export default function ImagePopup({card, isOpen,onClose}){
  return(  
  <section className={`popup ${isOpen && 'popup_opened'}`} data-type="img">
    <div className="popup__overlay"></div>
    <div className="popup__cont">
        <button type="button" className="popup__close" onClick={onClose}></button>
        <img src={card.link} alt={card.name} className="popup__img" />
        <p className="popup__text">{card.name}</p>
    </div>
</section>)
}