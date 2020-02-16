const body = document.querySelector("body");
const responseButton = document.querySelector("#response-btn");
const modal = document.querySelector("#modal");

responseButton.addEventListener("click", e => {
  e.preventDefault();

  if (validateForm(form)) {
    submitForm();
  }
});

const ajaxForm = function(form) {
  let data = new FormData();
  data.append("name", form.elements.name.value);
  data.append("email", form.elements.email.value);
  data.append("comment", form.elements.textarea.value);
  // Correct response addings
  data.append("phone", 8999001122);
  data.append("to", form.elements.email.value);

  const promise = new Promise(function(resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("POST", "https://webdev-api.loftschool.com/sendmail");
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.send(data);
    xhr.addEventListener("load", () => {
      if (xhr.status >= 400) {
        reject(xhr.status);
      } else {
        resolve(xhr.status);
      }
    });
  });

  return promise;
};

const submitForm = function() {
  const form = document.querySelector("#form");

  ajaxForm(form)
    .then(() => openOverlay("Сообщение отправлено", null))
    .catch(error => {
      openOverlay("Произошла ошибка, попробуйте позже", "error");      
    }
      
    );
};

function validateForm(form) {
  let valid = true;

  if (!validateField(form.elements.name)) {
    valid = false;
  }
  if (!validateField(form.elements.email)) {
    valid = false;
  }
  if (!validateField(form.elements.textarea)) {
    valid = false;
  }

  return valid;
}

function validateField(field) {
  if (!field.checkValidity()) {
    field.placeholder = "";
    field.parentNode.classList.add("error");
  } else {
    field.parentNode.classList.remove("error");
  }
  return field.checkValidity();
}

function openOverlay(status, errorClass) {
  let modalText = modal.querySelector(".modal__text");
  let closeButton = modal.querySelector("#modal__close");
  modalText.textContent = status;

  if (errorClass) {
    modalText.classList.add('error');    
  } else {
    modalText.classList.remove('error');
  }

  closeButton.addEventListener("click", e => {
    e.preventDefault();
    closeOverlay();
  });

  document.addEventListener("keydown", e => {
    if (e.keyCode === 27) closeOverlay();
  });

  body.classList.add("locked");
  modal.classList.add("is-active");
}

function closeOverlay() {
  body.classList.remove("locked");
  modal.classList.remove("is-active");
}
