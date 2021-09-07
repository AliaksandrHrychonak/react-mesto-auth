import "../index.css";
import React from "react";
import { Header } from "./Header";
import { Main } from "./Main";
import { Footer } from "./Footer";
import { EditAvatarPopup } from "./EditAvatarPopup";
import { AddPlacePopup } from "./AddPlacePopup";
import { EditProfilePopup } from "./EditProfilePopup";
import { ImagePopup } from "./ImagePopup";
import { DeleteCardPopup } from "./DeleteCardPopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/api";

export function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [isLoad, setIsLoad] = React.useState(false);
  const [cardToDelete, setCardToDelete] = React.useState(null);

  //API
  React.useEffect(() => {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.error(err);
      });
    api
      .getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.toggleLikeCard(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  };

  const handleCardDelete = (card) => {
    setIsLoad(false);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setCardToDelete(null);
        setIsLoad(true);
      });
  };

  const handleUpdateAvatar = (data) => {
    setIsLoad(true);
    api
      .setAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoad(false);
      });
  };

  const handleUpdateUser = (data) => {
    setIsLoad(true);
    api
      .setUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoad(false);
      });
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleEditAvatarClick = () => {
    setIsLoad(false);
    setEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsLoad(false);
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsLoad(false);
    setAddPlacePopupOpen(true);
  };

  const handleDeleteCardClick = (card) => {
    setIsLoad(false);
    setCardToDelete(card);
  };

  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
    setCardToDelete(null);
    setIsLoad(false);
  };

  const handleAddPlaceSubmit = (newCard) => {
    setIsLoad(true);
    api
      .postCard(newCard)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoad(false);
      });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteCardClick}
          cards={cards}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoad={isLoad}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoad={isLoad}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoad={isLoad}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <DeleteCardPopup
          title="Вы уверены?"
          name="CardDelete"
          card={cardToDelete}
          onClose={closeAllPopups}
          onClick={handleCardDelete}
          isLoad={isLoad}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
