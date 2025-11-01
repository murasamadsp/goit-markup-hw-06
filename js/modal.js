const refs = {
  openModalBtn: document.querySelector('[data-modal-open]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal]'),
};

refs.openModalBtn?.addEventListener('click', toggleModal);
refs.closeModalBtn?.addEventListener('click', toggleModal);
refs.modal?.addEventListener('click', handleBackdropClick);
window.addEventListener('keydown', handleKeyDown);

function toggleModal() {
  refs.modal.classList.toggle('is-open');
  document.body.style.overflow = refs.modal.classList.contains('is-open')
    ? 'hidden'
    : '';
}

function handleBackdropClick(event) {
  if (event.target === refs.modal) {
    toggleModal();
  }
}

function handleKeyDown(event) {
  if (
    event.key === 'Escape' &&
    refs.modal &&
    refs.modal.classList.contains('is-open')
  ) {
    toggleModal();
  }
}

