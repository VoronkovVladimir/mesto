const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupEditProfileOpenBtn = document.querySelector('.profile__edit-button');
const popupEditProfileCloseBtn = document.querySelector('.popup__close');

const formElEditProfile = document.querySelector('.popup__edit-form');
const nameInput = document.querySelector('.popup__input_name');
const jobInput = document.querySelector('.popup__input_job');
const popupEditProfileSaveBtn = document.querySelector('.popup__save');

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

const popupAdd = document.querySelector('.popup_add');
const popupAddOpenBtn = document.querySelector('.profile__add-botton');
const popupAddCloseBtn = document.querySelector('.popup__close-add');
const titleInput = document.querySelector('.popup__input_title');
const linkInput = document.querySelector('.popup__input_link');
const formAddElement = document.querySelector('.popup__add-form');
const popupAddSaveBtn = document.querySelector('.popup__add-save');

const popupBigImage = document.querySelector('.popup_big-image');
const popupBigImageCloseBtn = document.querySelector('.popup__close-big-image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

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
    
    function addLikeActive (evt) { // функция добавления лайка
      evt.target.classList.toggle('card__like_active');
    }
    newCard.querySelector('.card__like').addEventListener('click', addLikeActive); // cлушатель добавления лайка

    const removeButton = newCard.querySelector('.card__delete'); // кнопка удаление карточки
    removeButton.addEventListener('click', deleteCardUser); // слушатель удаления карточки

    const popupBigImageOpen = newCard.querySelector('.card__popup-image'); // открытия попапа картинки
    popupBigImageOpen.addEventListener('click', openPopupBigImage); // слушатель открытия попапа картинки
    
    function openPopupBigImage () { // функция открытия попапа картинки

      popupImage.src = cardPhoto.src;
      popupImage.alt = cardPhoto.alt;
      popupCaption.textContent = cardTitle.textContent;

      openPopup (popupBigImage); // вызываем функция открытия попапа
    }

    return newCard;
}

addCard();
// --------------------------------------------------------------


function openPopupEditProfile (evt) { // функция открытия попапа и добавление "имя" и "о себе" с html разметки в форму
  evt.preventDefault();

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  openPopup (popupEditProfile); // вызываем функцию открытия попапа
}

function handlerFormEditProfile (evt) { // функция сохранения попапа и передача "имя" и "о себе" с формы в html разметку
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

function addCardUser (evt) { // функция добавления карточки пользователя с помощью ввода названия и ссылки
  evt.preventDefault();
  const cardTitleUser = titleInput.value;
  const cardLinkUser = linkInput.value;
  const cardUser = getCard ({name: cardTitleUser, link: cardLinkUser});
  cardsContainer.prepend(cardUser);

  titleInput.value = '';
  linkInput.value = '';
}

function deleteCardUser (evt) {  // функция удаления карточки
  const eventTarget = evt.target;
  const targetCard = eventTarget.closest('.card');

  targetCard.remove();
}

function openPopup (popup) { // общая функция открытия попапа
  popup.classList.add('popup_opened');
}

function closePopup (popup) { // общая функция закрытия попапа
  popup.classList.remove('popup_opened');
}


popupBigImageCloseBtn.addEventListener('click', function () {closePopup (popupBigImage)}); // слушатель закрытия попапа картинки

// слушатели попапа добавления карточек
popupAddOpenBtn.addEventListener('click', function () {openPopup (popupAdd)});
popupAddCloseBtn.addEventListener('click', function () {closePopup (popupAdd)});
popupAddSaveBtn.addEventListener('click', function () {closePopup (popupAdd)});
formAddElement.addEventListener('submit', addCardUser);

// слушатели попапа редактирования профиля
popupEditProfileOpenBtn.addEventListener('click', openPopupEditProfile);
popupEditProfileCloseBtn.addEventListener('click', function () {closePopup (popupEditProfile)});
popupEditProfileSaveBtn.addEventListener('click', function () {closePopup (popupEditProfile)});
formElEditProfile.addEventListener('submit', handlerFormEditProfile);