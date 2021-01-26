let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_name');
let jobInput = document.querySelector('.popup__input_job');
let saveButton = document.querySelector('.popup__save');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');


function popupToggle () {
    popup.classList.toggle('popup_opened');
}

function popupOpened (evt) {
    evt.preventDefault();
    popup.classList.toggle('popup_opened');

    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

function formSubmitHandler (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
}

popupOpenButton.addEventListener('click', popupOpened);

popupCloseButton.addEventListener('click', popupToggle);

formElement.addEventListener('submit', formSubmitHandler); 

saveButton.addEventListener('click', popupToggle);