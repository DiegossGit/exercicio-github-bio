//----------------iniciando os conteúdos da accordeon list fechados-----------//
const submitButton = document.querySelector(".modal-button");
const userGitID = document.querySelector(".input-github");
let modalHeader = document.querySelector(".modal h1");
let modalContent = document.querySelector(".modal p");

let gitUserRequested = ""; //iniciando o
let xhr = new XMLHttpRequest();

function requestGitHubBio() {
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        let jsonBio = JSON.parse(xhr.responseText);
        console.log(xhr.status);
        modalHeader.textContent = jsonBio.login;
        modalContent.textContent = jsonBio.bio;
      } else {
        modalHeader.textContent = "User Not Found";
        modalContent.textContent = "Close and type a valid GitHub user";
      }
    }
  };
}

submitButton.addEventListener("click", () => {
  //-----------evento de abrir--------//
  const modalContent = submitButton.nextElementSibling;
  modalContent.classList.add("active");
  gitUserRequested = userGitID.value;
  xhr.open("GET", `https://api.github.com/users/${gitUserRequested}`);
  xhr.send(null);
  requestGitHubBio();

  //-----------evento de fechar-------//
  const closeModal = document.querySelector(".close-modal");
  closeModal.addEventListener("click", () => {
    modalContent.classList.remove("active");
  });
});
