class UserInfo {

  constructor(person, career, personSpan, careerSpan, photoSpan) {
    this.person = person;
    this.career = career;
    this.personSpan = personSpan;
    this.careerSpan = careerSpan;
    this.photoSpan = photoSpan;
  }

  setUserInfo(person, career) {
    this.person = person;
    this.career = career;
  }

  updateUserInfo() {
    this.personSpan.textContent = this.person.value;
    this.careerSpan.textContent = this.career.value;
  }

  updateUserInfoWithServer(result) {
    this.personSpan.textContent = result.name;
    this.careerSpan.textContent = result.about;
  }

  setPersonalPhoto(link) {
    this.photoSpan.setAttribute('style', `background-image:url(${link})`);;
  }

}