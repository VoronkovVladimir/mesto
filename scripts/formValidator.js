export class FormValidator { // создаем класс валидации
    constructor (validationConfig, formElement) {
        this._formSelector = validationConfig.formSelector;
        this._inputSelector = validationConfig.inputSelector;
        this._submitButtonSelector = validationConfig.submitButtonSelector;
        this._inactiveButtonClass = validationConfig.inactiveButtonClass;
        this._inputErrorClass = validationConfig.inputErrorClass;
        this._errorClass = validationConfig.errorClass;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector)); // Находим все поля (инпуты) внутри формы,сделаем из них массив методом Array.from
    }

    _showInputError () { //функция показа ошибки при валидации
        this._inputElement.classList.add(this._inputErrorClass);
        this._errorElement.textContent = this._inputElement.validationMessage;
        this._errorElement.classList.add(this._errorClass);
    };

    _hideInputError (inputElement) { //функция скрывающая ошибки при валидации
        this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`); // находим спэн ошибки
        inputElement.classList.remove(this._inputErrorClass);
        this._errorElement.classList.remove(this._errorClass);
        this._errorElement.textContent = '';
    };
    
    _checkInputValidity (inputElement) { // функция проверки корректности введенных данных и вызывающая функции hideError или showError
        this._inputElement = inputElement;
        this._errorElement = this._formElement.querySelector(`.${this._inputElement.id}-error`);
        if (!this._inputElement.validity.valid) {
            this._showInputError();
        } else {
            this._hideInputError(inputElement);
        }
    };

    _setEventListeners () { // функция принимает параметр элемент формы и добавляет её полям нужные обработчики
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector); // Найдём в текущей форме кнопку отправки
            this._toggleButtonState(); // Вызовем функцию toggleButtonState чтобы проверить состояние кнопки в самом начале
        this._inputList.forEach((inputElement) => { // Обойдём все элементы полученной коллекции
            inputElement.addEventListener('input', () => { // каждому полю добавим обработчик события input
            this._checkInputValidity(inputElement); // передаем ей форму и проверяемый элемент
            this._toggleButtonState(); // Вызовем функцию toggleButtonState и передадим ей массив полей и кнопку 
            });
        });
    };

    _hasInvalidInput () { // функция проверки, что все поля валидны
        return this._inputList.some((inputElement) => { // Функция принимает массив полей, проходимся по массиву методом some
        return !inputElement.validity.valid; // Если поле не валидно, колбэк вернёт true, Обход массива прекратится и вся фунцкция, hasInvalidInput вернёт true
        }); 
    };

    _toggleButtonState () { // функция блокировки кнопки попапа. Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
        if (this._hasInvalidInput()) {
        this._buttonElement.setAttribute('disabled', true);
        this._buttonElement.classList.add(this._inactiveButtonClass); 
        } else {
        this._buttonElement.removeAttribute('disabled');
        this._buttonElement.classList.remove(this._inactiveButtonClass);
        }
    };

    enableValidation () { // функция которая найдёт и переберёт все формы на странице
        this._formElement.addEventListener('submit', (evt) => { // У каждой формы отменим стандартное поведение
            evt.preventDefault();
            this._toggleButtonState();
        });
        this._setEventListeners();
    };

    hideFormErrors () { // очистки полей ввода от ошибок и проверки кнопки в попапе
    this._inputList.forEach((formElement) => {
    this._hideInputError(formElement);
    });
    this._toggleButtonState();
};
}