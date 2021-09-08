import React from 'react';

export const InfoTooltip = (props) => {
  return (
    <div className={`popup ${ props.isOpen ? "popup_opened" : " " }` }>
      <div className="popup__container">
        <button
        className="popup__button-close"
        type="button"
        name="Close"
        aria-label="Закрыть"
        onClick={props.onClose}
        ></button>
        <div className={`popup__image-tooltip ${ props.loggedIn ? "popup__image-tooltip_type_done": "popup__image-tooltip_type_not" }`}></div>
        <h1 className="popup__title popup__title_theme_tooltip">{props.loggedIn ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h1>
      </div>
    </div>
  );
}
