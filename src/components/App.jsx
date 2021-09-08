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
import { Login } from "./Login";
import { Register } from "./Register";
import { Route, Redirect, Switch, useHistory } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import * as auth from "../utils/auth";
import { InfoTooltip } from "./InfoTooltip"

export function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [isLoad, setIsLoad] = React.useState(false);
  const [cardToDelete, setCardToDelete] = React.useState(null);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const history = useHistory();
  const [userData, setUserData] = React.useState({});
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

  React.useEffect(() => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt'); 
      console.log(jwt);
      auth.getToken(jwt)
      .then((res) => {
        if (res) {
          setUserData(res.data)
          console.log(res.data);
          console.log(jwt);
          handleLogIn();
          history.push('/');
        }
      })
    }
}, [history]);

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

  const handleLogIn = () => {
    setLoggedIn(true);
  };
  const handleLogOut = () => {
    setLoggedIn(true);
  };
  const handleTooltipOpen = () => {
    setIsInfoTooltipPopupOpen(true);
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
    setIsInfoTooltipPopupOpen(false);
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
        <Header
          userData = {userData}
          handleLogOut={handleLogOut}
        />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            loggedIn={loggedIn}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteCardClick}
            cards={cards}
          />

          <Route path="/sign-in">
            <Login handleLogIn={handleLogIn} handleTooltipOpen={handleTooltipOpen}/>
          </Route>

          <Route path="/sign-up">
            <Register />
          </Route>

          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>

        </Switch>
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
        <InfoTooltip
          loggedIn={loggedIn}
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
        ></InfoTooltip>
      </div>
    </CurrentUserContext.Provider>
  );
}
