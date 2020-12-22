(function() {
/* Переменные: */

const list = document.querySelector('.places-list');
const popup = document.querySelector('.popup');
const profilePopup = document.querySelector('.popup_profile');
const popupImage = document.querySelector('.popup_image');
const userInfoButton = document.querySelector('.user-info__button');
const profileButton = document.querySelector('.profile__button');
const popupCloseButton = document.querySelector('.popup__close');
const popupCloseButtonProfile = document.querySelector('.popup__close_profile');
const popupCloseButtonImage = document.querySelector('.popup__close_image');
const popupContentImage = document.querySelector('.popup__content_image');
const submitContent = document.querySelector('#submit-content');
const userInfoName = document.querySelector('.user-info__name');
const userInfoJob = document.querySelector('.user-info__job');
const bigImage = document.querySelector(".popup__big-image");
const userInfoPhoto = document.querySelector(".user-info__photo");

const newPlaceForm = document.forms.new;
const profileForm = document.forms.profile;
const personForm = profileForm.elements.person;
const careerForm = profileForm.elements.career;

const openImagePopup = new Popup(popupImage, popupCloseButtonImage);
const openProfilePopup = new Popup(profilePopup, popupCloseButtonProfile);
const openCardPopup = new PopupContent(popup, popupCloseButton, newPlaceForm);

const validFormAdd = new FormValidator(newPlaceForm);
const validFormProfil = new FormValidator(profileForm);
const createCard = function (name, link) {
  return new Card(name, link, openImageCallback);
};
const cardList = new Cardlist (list, createCard);

const config = {
  baseUrl: 'https://nomoreparties.co/cohort12',
  headers: {
    authorization: '297d2841-1d9b-430e-8d64-80832c30364e',
    'Content-Type': 'application/json'
  }
}

const api = new Api(config);
const userInfo = new UserInfo(personForm, careerForm, userInfoName, userInfoJob, userInfoPhoto);


/* Функции */

// Обработчик редактирвоания профиля
function editingProfile(event) {
  event.preventDefault();

  api.editProfile(personForm.value, careerForm.value)
    .then(() => {
      userInfo.updateUserInfo();
      openProfilePopup.close();
  })
    .catch((err) => {
      console.log(err); 
  }); 
};

// Обработчик открытия/закрытия картинки
function openImageCallback(link) {
  bigImage.src = link;
	openImagePopup.open();
}

// Обработчик добавления карточки
function addNewCard(evt) {
  evt.preventDefault();

  const isValidForm = validFormAdd.isFormValid(evt);

  if (isValidForm) {

    const name = newPlaceForm.elements.name;
    const link = newPlaceForm.elements.link;
    const cardAdd = createCard(name.value, link.value);

    api.editCardList(name.value, link.value)
      .then(() => {      
        const cardElement = cardAdd.create();
        list.appendChild(cardElement);
        openCardPopup.close();
        newPlaceForm.reset();
    })
      .catch((err) => {
        console.log(err); 
    });       
    
    validFormAdd.setSubmitButtonState(submitContent, false);
    }
  }; 


/* Слушатели событий */

userInfoButton.addEventListener("click", () => {
  openCardPopup.open();
});

profileButton.addEventListener("click", () => {
  personForm.value = userInfoName.textContent;
  careerForm.value = userInfoJob.textContent;
  
  openProfilePopup.open();
});

profileForm.addEventListener('submit', editingProfile);

newPlaceForm.addEventListener('submit', addNewCard);

validFormAdd.setEventListeners();

validFormAdd.errorReset();

validFormProfil.setEventListeners();


/* Запросы */

// Загрузка информации профиля с сервера
api.getUserInfo()
.then(res => {
  userInfo.updateUserInfo();
  userInfo.setPersonalPhoto(res.avatar);
  userInfo.updateUserInfoWithServer(res);
})
.catch((err) => {
  console.log(err); 
});


// Загрузка первоначальных карточек с сервера
api.getInitialCards()
.then(res => {
  cardList.render(res);
})
.catch((err) => {
  console.log(err); 
});

}());