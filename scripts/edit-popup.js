let editBtn = document.querySelector(".profile__edit-btn");
let closeBtn = document.querySelector(".popup-content__close-icon");

function toggleEditPopup() {
  let popup = document.querySelector(".popup");
  let popupContent = document.querySelector(".popup-content");

  popup.classList.toggle("popup_opened");
  popupContent.classList.toggle("popup-content_opened");

  if (popup.classList.contains("popup")) {
    let profileName = document.querySelector(".profile__name");
    let profileDescription = document.querySelector(".profile__description");

    let name = popupContent.querySelector(".form__input_el_name");
    let description = popupContent.querySelector(".form__input_el_description");

    name.value = profileName.textContent.trim();
    description.value = profileDescription.textContent;
  }
}

editBtn.addEventListener("click", toggleEditPopup);
closeBtn.addEventListener("click", toggleEditPopup);

// Vamos encontrar o formulário no DOM
let form = document.querySelector(".form");

// Em seguida vem o handler do submit
// ainda não vai enviar para lugar nenhum

// Observe que o nome da função começa com um verbo
// e descreve exatamente o que a função faz
function handleProfileFormSubmit(evt) {
  // Esta linha impede o navegador
  // de enviar o formulário da forma padrão.
  evt.preventDefault();
  // Fazendo isso, podemos definir nossa própria forma de enviar o formulário.
  // Explicaremos em mais detalhes posteriormente.

  // Vamos encontrar os campos de formulário do DOM
  let nameInput = document.querySelector(".form__input_el_name");
  let descriptionInput = document.querySelector(".form__input_el_description");

  // Pegue os valores de cada campo do valor da propriedade correspondente
  let profileName = document.querySelector(".profile__name");
  let profileDescription = document.querySelector(".profile__description");

  // Selecione os elementos aos quais os valores dos campos serão inseridos
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  // Insira novos valores usando a
  // propriedade textContent
  toggleEditPopup();
}

// Conecte o handler ao formulário:
// ele vai observar o evento de submit
form.addEventListener("submit", handleProfileFormSubmit);
