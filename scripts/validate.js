const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => { //функция показа ошибки при валидации
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // находим спэн ошибки
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => { //функция скрывающая ошибки при валидации
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // находим спэн ошибки
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => { // функция проверки корректности введенных данных и вызывающая функции hideError или showError
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    } else {
        hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
};

const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => { // функция принимает параметр элемент формы и добавляет её полям нужные обработчики
    const inputList = Array.from(formElement.querySelectorAll(inputSelector)); // Находим все поля (инпуты) внутри формы,сделаем из них массив методом Array.from
    const buttonElement = formElement.querySelector(submitButtonSelector); // Найдём в текущей форме кнопку отправки
        toggleButtonState(inputList, buttonElement, inactiveButtonClass); // Вызовем функцию toggleButtonState чтобы проверить состояние кнопки в самом начале
    inputList.forEach((inputElement) => { // Обойдём все элементы полученной коллекции
        inputElement.addEventListener('input', function () { // каждому полю добавим обработчик события input
        checkInputValidity(formElement, inputElement, inputErrorClass, errorClass); // передаем ей форму и проверяемый элемент
        toggleButtonState(inputList, buttonElement, inactiveButtonClass); // Вызовем функцию toggleButtonState и передадим ей массив полей и кнопку 
        });
    });
};

const enableValidation = ({formSelector, inputSelector, submitButtonSelector,inactiveButtonClass, inputErrorClass, errorClass}) => { // функция которая найдёт и переберёт все формы на странице
    const formList = Array.from(document.querySelectorAll(formSelector));  // Находим все формы с указанным классом в DOM, делаем из них массив методом Array.from
    formList.forEach((formElement) => { // Переберём полученную коллекцию
        formElement.addEventListener('submit', (evt) => { // У каждой формы отменим стандартное поведение
        evt.preventDefault();
        });
    setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass); // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
    });
};

const hasInvalidInput = (inputList) => { // функция проверки, что все поля валидны
    return inputList.some((inputElement) => { // Функция принимает массив полей, проходимся по массиву методом some
    return !inputElement.validity.valid; // Если поле не валидно, колбэк вернёт true, Обход массива прекратится и вся фунцкция, hasInvalidInput вернёт true
    }); 
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => { // функция блокировки кнопки попапа. Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
    if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(inactiveButtonClass); 
    } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(inactiveButtonClass);
    }
};
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }); // Вызовем функцию
