const modalButton = document.querySelector('.modal-button');
const modal = document.querySelector('.popup-modal');
const blackBg = document.querySelector(".blackened");
const closeModal = document.querySelector('.modal-close');

modalButton.addEventListener('click', () => {
  modal.classList.toggle('modal-visible');
  blackBg.classList.toggle('blackened-visible');
});

blackBg.addEventListener('click', () => {
  modal.classList.toggle('modal-visible');
  blackBg.classList.toggle('blackened-visible');
});

closeModal.addEventListener('click', () => {
  modal.classList.toggle('modal-visible');
  blackBg.classList.toggle('blackened-visible');
});