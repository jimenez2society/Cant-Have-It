import { closeBackDrop, openBackDrop } from "./backdrop.js";
let nav = document.querySelector(".mobile-nav");
// handles open and close of the mobile nav
export const openNav = () => {
  openBackDrop(() => {
    nav.classList.add("mobile-nav--close");
    nav.classList.remove("mobile-nav--open");
    closeBackDrop();
  });
  nav.classList.remove("mobile-nav--close");
  nav.classList.add("mobile-nav--open");
};
export const closeNav = () => {
  closeBackDrop();
  nav.classList.add("mobile-nav--close");
  nav.classList.remove("mobile-nav--open");
};
document.querySelector("#nav-toggler").addEventListener("click", (e) => {
  openNav();
});
document.querySelector(".exit-mobile-nav").addEventListener("click", (e) => {
  closeNav();
});
