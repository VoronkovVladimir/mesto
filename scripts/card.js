export class Card { // класс для наших карточек
  constructor (data, cardSelector) {
      this._name = data.name;
      this._link = data.link;
      this._alt = data.name;
      this._cardSelector = cardSelector;
  }

  _getTemplate () { // метод который возвращает разметку
      const cardElement = document // newCard
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode (true);

    return cardElement; // newCard
  }

  generateCard () { // метод подготовит карточку к публикации, добавит контент в разметку
      this._element = this._getTemplate(); // запишем разметку getTemplate в приватное поле element, так у других элементов появится доступ к ней
      this._handlerAddLike ();
      this._handlerDeleteCardUser ();
      this._handlerPopupBigImage ();

      this._element.querySelector('.card__title').textContent = this._name; // добавляем данные в заголовок
      this._element.querySelector('.card__photo').src = this._link; // добавляем ссылку на фото 
      this._element.querySelector('.card__photo').alt = this._name; // добавляем alt в фото

      return this._element; // вернем элемент наружу
  }

  _handlerAddLike () { // обработчик добавления лайка
      this._element.querySelector('.card__like').addEventListener('click', () => { 
          this._addLikeActive ();
      });
  }

  _addLikeActive () { // функция (метод) добавления лайка
      this._element.querySelector('.card__like').classList.toggle('card__like_active');
  }

  _deleteCardUser () {  // функция (метод) удаления карточки
      const eventTarget = this._element;
      const targetCard = eventTarget.closest('.card');
      targetCard.remove();
  }

  _handlerDeleteCardUser () { // обработчик удаления карточки
      this._element.querySelector('.card__delete').addEventListener('click', () => { 
          this._deleteCardUser ();
      });
  }
  
  _openPopupBigImage () { // функция (метод) открытия попапа картинки
      popupImage.src = this._link;
      popupImage.alt = this._alt;
      popupCaption.textContent = this._name;
      openPopup (popupBigImage); // вызываем функция открытия попапа
  };

  _handlerPopupBigImage () { // обработчик открытия попапа картинки
      this._element.querySelector('.card__popup-image').addEventListener('click', () => { 
          this._openPopupBigImage ();
      });
  }
}

const popupBigImage = document.querySelector('.popup_big-image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

function openPopup (popup) { // общая функция открытия попапа
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupKeyEsc); // добавление слушателя попапа закрытия при нажатию на кнопку esc
}
function closePopupKeyEsc (evt) { // функция закрытия попапа при нажатии на кнопку esc
  if (evt.key === 'Escape') {
      closePopup(document.querySelector('.popup_opened'));
  }
}
function closePopup (popup) { // общая функция закрытия попапа
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupKeyEsc); // удаление слушателя попапа закрытия при нажатию на кнопку esc
}