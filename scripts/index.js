const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close');

const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_name');
const jobInput = document.querySelector('.popup__input_job');
const saveButton = document.querySelector('.popup__save');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const popupAdd = document.querySelector('.popup__add');
const popupOpenAddButton = document.querySelector('.profile__add-botton');
const popupCloseAddButton = document.querySelector('.popup__close-add');
const titleInput = document.querySelector('.popup__input_title');
const linkInput = document.querySelector('.popup__input_link');
const formAddElement = document.querySelector('.popup__add-form');
const saveAddButton = document.querySelector('.popup__add-save');

const cardLikeButton = document.querySelector('.card__like');

const popupBigImage = document.querySelector('.popup__big-image');
const popupBigImageClose = document.querySelector('.popup__close-big-image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

function popupToggle () { // функция замены открытия и закрытия попапа 
    popup.classList.toggle('popup_opened');
}

function popupOpened (evt) { // функция открытия попапа и добавление "имя" и "о себе" с html разметки в форму
    evt.preventDefault();
    popup.classList.toggle('popup_opened');

    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function formSubmitHandler (evt) { // функция сохранения попапа и передача "имя" и "о себе" с формы в html разметку
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
}

const initialCards = [ // Массив шесть карточек «из коробки»
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 

function addCard () {
    const htmlCards = initialCards
    .map(getCard)
    cardsContainer.append(...htmlCards);
}

const templateCard = document.querySelector('.template');
const cardsContainer = document.querySelector('.cards');

function getCard (item) {
    const newCard = templateCard.content.cloneNode (true);
    const cardTitle = newCard.querySelector('.card__title');
    const cardPhoto = newCard.querySelector('.card__photo');
    cardTitle.textContent = item.name;
    cardPhoto.src = item.link;
    cardPhoto.alt = item.name;
    
    newCard.querySelector('.card__like').addEventListener('click', function (evt) { // функция добавления лайка
      evt.target.classList.toggle('card__like_active');
    });

    const removeButton = newCard.querySelector('.card__delete'); // кнопка удаление карточки
    removeButton.addEventListener('click', cardUserDelete); // слушатель удаления карточки

    const popupBigImageOpen = newCard.querySelector('.card__popup-image'); // кнопка открытия попапа картинки
    popupBigImageOpen.addEventListener('click', popupBigImageAdd); // слушатель открытия попапа картинки
    
    function popupBigImageAdd () { // функция открытия попапа картинки
      popupBigImage.classList.toggle('popup_opened');
      popupImage.src = cardPhoto.src;
      popupImage.alt = cardPhoto.alt;
      popupCaption.textContent = cardTitle.textContent;
    }

    return newCard;
}

addCard();
// --------------------------------------------------------------

function popupAddToggle () { // функция замены открытия и закрытия попапа добавления карточки
    popupAdd.classList.toggle('popup_opened');
}

function cardAddUser (evt) { // функция добавления карточки пользователя с помощью ввода названия и ссылки
  evt.preventDefault();
  const cardTitleUser = titleInput.value;
  const cardLinkUser = linkInput.value;
  const cardUser = getCard ({name: cardTitleUser, link: cardLinkUser});
  cardsContainer.prepend(cardUser);

  titleInput.value = '';
  linkInput.value = '';
}

function cardUserDelete (evt) {  // функция удаления карточки
  const eventTarget = evt.target;
  const targetCard = eventTarget.closest('.card');

  targetCard.remove();
}

function popupBigImageRemove () { // функция закрытия попапа картинки
  popupBigImage.classList.toggle('popup_opened');
}

popupBigImageClose.addEventListener('click', popupBigImageRemove); // слушатель закрытия попапа картинки

// слушатели попапа добавления карточек
popupOpenAddButton.addEventListener('click', popupAddToggle);
popupCloseAddButton.addEventListener('click', popupAddToggle);
saveAddButton.addEventListener('click', popupAddToggle);
formAddElement.addEventListener('submit', cardAddUser); 

// слушатели попапа редактирования профиля
popupOpenButton.addEventListener('click', popupOpened);
popupCloseButton.addEventListener('click', popupToggle);
saveButton.addEventListener('click', popupToggle);
formElement.addEventListener('submit', formSubmitHandler); 

