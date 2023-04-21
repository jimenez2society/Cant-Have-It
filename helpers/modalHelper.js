import { closeBackDrop, openBackDrop } from "./backdrop.js";
let modal = document.querySelector(".modal");
let backdrop = document.querySelector(".backdrop");
let exitBtn = document.querySelector(".exit-modal");
let denyRestrictions = document.querySelector(".denyRestrictions");
let acceptRestrictions = document.querySelector(".acceptRestrictions");
const showOverflow = () => {
  document.body.style.overflowY = "visible";
};
const hideOverflow = () => {
  document.body.style.overflowY = "hidden";
};
const handleListener = (url) => {
  localStorage.setItem("answeredRestrictedModal", true);
  window.location.pathname = url;
  showOverflow();
};
exitBtn.addEventListener("click", (e) => {
  closeModal();
  showOverflow();
});
denyRestrictions.addEventListener("click", (e) => {
  handleListener("/pages/meals.html");
});
acceptRestrictions.addEventListener("click", (e) => {
  handleListener("/pages/restrictions.html");
});
backdrop.addEventListener("click", (e) => {
  closeModal();
});
// hanles openening the modal and closing the modal
export const openModal = () => {
  hideOverflow();
  modal.classList.add("modal-open");
  openBackDrop();
};
export const closeModal = () => {
  modal.classList.remove("modal-open");
  closeBackDrop();
  showOverflow();
};
