import PopupWithForm from './PopupWithForm';
export default function ConfirmDeleteCardPopup({isOpen, onClose}){
    return (
        <PopupWithForm
          title="Вы уверены?"
          name="confirmation"   
          isOpen={isOpen}
          onClose={onClose}
         
        >
        </PopupWithForm>
      );
}