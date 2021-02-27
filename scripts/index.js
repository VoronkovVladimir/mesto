const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupEditProfileOpenBtn = document.querySelector('.profile__edit-button');
const popupEditProfileCloseBtn = document.querySelector('.popup__close');

const formElEditProfile = document.querySelector('.popup__edit-form');
const nameInput = document.querySelector('.popup__input_name');
const jobInput = document.querySelector('.popup__input_job');
const popupEditProfileSaveBtn = document.querySelector('.popup__button');

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

const templateCard = document.querySelector('.template');
const cardsContainer = document.querySelector('.cards');


function addLikeActive (evt) { // функция добавления лайка
  evt.target.classList.toggle('card__like_active');
}

function deleteCardUser (evt) {  // функция удаления карточки
  const eventTarget = evt.target;
  const targetCard = eventTarget.closest('.card');

  targetCard.remove();
}

function closePopupKeyEsc (evt, popup) { // функция закрытия попапа при нажатии на кнопку esc
  if (evt.key === 'Escape') {
    closePopup(popup);
  }
}

function closePopup (popup) { // общая функция закрытия попапа
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', (evt) => { closePopupKeyEsc(evt, popup) }); // удаление слушателя попапа закрытия при нажатию на кнопку esc
}

function openPopup (popup) { // общая функция открытия попапа
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', (evt) => { closePopupKeyEsc(evt, popup) }); // добавление слушателя попапа закрытия при нажатию на кнопку esc
}

function closePopupViaOverlay (evt, popup) { // функция закрытия попапа при нажатии на оверлей область
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) 
    {
      closePopup(popup);
    }
}

function openPopupBigImage (cardTitle, cardPhoto) { // функция открытия попапа картинки

  popupImage.src = cardPhoto.src;
  popupImage.alt = cardPhoto.alt;
  popupCaption.textContent = cardTitle.textContent;

  openPopup (popupBigImage); // вызываем функция открытия попапа
};

function getCard (item) {
  const newCard = templateCard.content.cloneNode (true);
  const cardTitle = newCard.querySelector('.card__title');
  const cardPhoto = newCard.querySelector('.card__photo');
  cardTitle.textContent = item.name;
  cardPhoto.src = item.link;
  cardPhoto.alt = item.name;
  
  newCard.querySelector('.card__like').addEventListener('click', addLikeActive); // cлушатель добавления лайка

  const removeButton = newCard.querySelector('.card__delete'); // кнопка удаление карточки

  removeButton.addEventListener('click', deleteCardUser); // слушатель удаления карточки

  const popupBigImageOpen = newCard.querySelector('.card__popup-image'); // открытия попапа картинки
  
  popupBigImageOpen.addEventListener('click', function () {openPopupBigImage (cardTitle, cardPhoto)}); // слушатель открытия попапа картинки

  return newCard;
}

function addCard () {
  const htmlCards = initialCards
  .map(getCard)
  cardsContainer.append(...htmlCards);
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

function submitAddCardPopup (evt) { // функция добавления карточки пользователя с помощью ввода названия и ссылки
  evt.preventDefault();

  const cardTitleUser = titleInput.value;
  const cardLinkUser = linkInput.value;
  const cardUser = getCard ({name: cardTitleUser, link: cardLinkUser});
  cardsContainer.prepend(cardUser);

  titleInput.value = '';
  linkInput.value = '';

  closePopup (popupAdd);
}

// слушатели попапа редактирования профиля
popupEditProfileOpenBtn.addEventListener('click', (evt) => {
  const inputList = Array.from(formElEditProfile.querySelectorAll(validationConfig.inputSelector));
  inputList.forEach((inputElement) => {
    hideInputError(formElEditProfile, inputElement, validationConfig.inputErrorClass, validationConfig.errorClass);
  });
  openPopupEditProfile(evt);
});
popupEditProfileCloseBtn.addEventListener('click', function () {closePopup (popupEditProfile)});
popupEditProfileSaveBtn.addEventListener('click', function () {closePopup (popupEditProfile)});
formElEditProfile.addEventListener('submit', handlerFormEditProfile);

// слушатели попапа добавления карточек
popupAddOpenBtn.addEventListener('click', () => {
  const inputList = Array.from(formAddElement.querySelectorAll(validationConfig.inputSelector)); 
  const buttonElement = formAddElement.querySelector(validationConfig.submitButtonSelector);
  inputList.forEach((inputElement) => {
    hideInputError(formAddElement, inputElement, validationConfig.inputErrorClass, validationConfig.errorClass);
  });
  toggleButtonState(inputList, buttonElement, validationConfig.inactiveButtonClass);
  formAddElement.reset();
  openPopup (popupAdd);
});
popupAddCloseBtn.addEventListener('click', () => { closePopup (popupAdd) });
popupAddSaveBtn.addEventListener('click', () => { closePopup (popupAdd) });
formAddElement.addEventListener('submit', submitAddCardPopup);

// слушатель закрытия попапа картинки
popupBigImageCloseBtn.addEventListener('click', function () {closePopup (popupBigImage)});

// слушатели попапов закрытие при нажатии по оверлей
popupEditProfile.addEventListener('click', (evt) => { closePopupViaOverlay(evt, popupEditProfile) });
popupAdd.addEventListener('click', (evt) => { closePopupViaOverlay(evt, popupAdd) });
popupBigImage.addEventListener('click', (evt) => { closePopupViaOverlay(evt, popupBigImage) });