let toast = document.querySelector(".toast");
export const openToast = (msg) => {
  toast.textContent = msg;
  toast.classList.remove("toast-close");
  toast.classList.add("toast-open");
  setTimeout(() => {
    toast.classList.remove("toast-open");
    toast.classList.add("toast-close");
  }, 5000);
};
