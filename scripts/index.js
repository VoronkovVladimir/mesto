import {Card} from "./card.js";
import {FormValidator} from "./formValidator.js";

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

const validationConfig = { // объект валидации
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

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

function closePopupKeyEsc (evt) { // функция закрытия попапа при нажатии на кнопку esc
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function closePopup (popup) { // общая функция закрытия попапа
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupKeyEsc); // удаление слушателя попапа закрытия при нажатию на кнопку esc
}

function openPopup (popup) { // общая функция открытия попапа
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupKeyEsc); // добавление слушателя попапа закрытия при нажатию на кнопку esc
}

function closePopupViaOverlay (evt, popup) { // функция закрытия попапа при нажатии на оверлей область
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) 
    {
      closePopup(popup);
    }
}

function submitAddCardPopup (evt) { // функция добавления карточки пользователя с помощью ввода названия и ссылки
  evt.preventDefault();

  const cardTitleUser = titleInput.value; // переменная инпута Название
  const cardLinkUser = linkInput.value; // переменная инпута Ссылка
  const cardUser = new Card ({name: cardTitleUser, link: cardLinkUser}, '.template'); // создает экземпляр карточки с данными полученными от пользователя
  const cardElementUser = cardUser.generateCard(); // создаем карточку и возвращает наружу
  cardsContainer.prepend(cardElementUser); // добавляем в DOM

  titleInput.value = '';
  linkInput.value = '';

  closePopup (popupAdd);
}

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

// для класса Card
initialCards.forEach((item) => { // цикл который обойдет массив 
  const card = new Card (item, '.template'); // создает экземпляр карточки
  const cardElement = card.generateCard(); // создает карточку и возвращает наружу
  cardsContainer.append(cardElement); // добавляем в DOM
});

// для класса formValidator
const editProfileValidation = new FormValidator(validationConfig, formElEditProfile); // создаем экземпляр валидации профиля
const formAddValidation = new FormValidator(validationConfig, formAddElement); // создаем экземпляр валидации "добавить место"
formAddValidation.enableValidation();
editProfileValidation.enableValidation();

// слушатели попапа редактирования профиля
popupEditProfileOpenBtn.addEventListener('click', (evt) => {
  editProfileValidation.hideFormErrors();
  openPopupEditProfile(evt);
});
popupEditProfileCloseBtn.addEventListener('click', function () {closePopup (popupEditProfile)});
popupEditProfileSaveBtn.addEventListener('click', function () {closePopup (popupEditProfile)});
formElEditProfile.addEventListener('submit', handlerFormEditProfile);

// слушатели попапа добавления карточек
popupAddOpenBtn.addEventListener('click', () => {
  formAddValidation.hideFormErrors();
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