let modal = document.querySelector(".modal");
let backdrop = document.querySelector(".backdrop");
let exitBtn = document.querySelector(".exit-modal");
let denyRestrictions = document.querySelector(".denyRestrictions");
let acceptRestrictions = document.querySelector(".acceptRestrictions");
exitBtn.addEventListener("click", (e) => {
  closeModal();
  document.body.style.overflowY = "visible";
});
denyRestrictions.addEventListener("click", (e) => {
  localStorage.setItem("answeredRestrictedModal", true);
  window.location.pathname = "/pages/meals.html";
  document.body.style.overflowY = "visible";
});
acceptRestrictions.addEventListener("click", (e) => {
  localStorage.setItem("answeredRestrictedModal", true);
  window.location.pathname = "/pages/restrictions.html";
  document.body.style.overflowY = "visible";
});
backdrop.addEventListener("click", (e) => {
  closeModal();
});

export const openModal = () => {
  document.body.style.overflowY = "hidden";

  modal.classList.add("modal-open");
  backdrop.classList.add("backdrop-open");
};
export const closeModal = () => {
  modal.classList.remove("modal-open");
  backdrop.classList.remove("backdrop-open");
  document.body.style.overflowY = "visible";
};
