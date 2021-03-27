export default function PopupWithForm({name,children,isOpen ,onClose,onSubmit,...props}){
   
    return (
        <section className={`popup popup_type_${props.name} ${isOpen && 'popup_opened'}`} >
             <div className="popup__overlay"></div>
        <form className="popup__form" method="PATCH" action="#" id="form__edit" name={props.name} noValidate onSubmit={onSubmit}>
            <button type="button" className="popup__close" onClick={onClose}></button>
            <h2 className="popup__title">Редактировать профиль</h2>
             {children}
            <button type="submit" className="popup__submit" value=""></button>
        </form>
        </section>
    )
}