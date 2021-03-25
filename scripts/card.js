import {popupBigImage, popupImage, popupCaption, closePopupKeyEsc, closePopup, openPopup} from "./index.js";

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
        this._element.querySelector('.card__title').textContent = this._name; // добавляем данные в заголовок
        this._element.querySelector('.card__photo').src = this._link; // добавляем ссылку на фото 
        this._element.querySelector('.card__photo').alt = this._name; // добавляем alt в фото
        this._setEventListeners();
        return this._element; // вернем элемент наружу
    }
    _setEventListeners () {
        this._element.querySelector('.card__like').addEventListener('click', () => { // обработчик добавления лайка
            this._addLikeActive ();
        });
        this._element.querySelector('.card__delete').addEventListener('click', () => { // обработчик удаления карточки
            this._deleteCardUser ();
        });
        this._element.querySelector('.card__popup-image').addEventListener('click', () => { // обработчик открытия попапа картинки
            this._openPopupBigImage ();
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

    _openPopupBigImage () { // функция (метод) открытия попапа картинки
        popupImage.src = this._link;
        popupImage.alt = this._alt;
        popupCaption.textContent = this._name;
        openPopup (popupBigImage); // вызываем функция открытия попапа
    };
}