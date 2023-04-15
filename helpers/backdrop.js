let backdrop = document.querySelector(".backdrop");
export const openBackDrop = (cb) => {
  backdrop.addEventListener("click", (e) => {
    cb();
  });
  backdrop.classList.add("backdrop-open");
};
export const closeBackDrop = () => {
  backdrop.classList.remove("backdrop-open");
};
