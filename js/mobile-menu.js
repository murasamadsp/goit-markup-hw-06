(() => {
  const mobileMenu = document.querySelector('.js-menu-container');
  const openMenuBtn = document.querySelector('.js-open-menu');
  const closeMenuBtn = document.querySelector('.js-close-menu');

  if (!mobileMenu || !openMenuBtn || !closeMenuBtn) {
    return;
  }

  const toggleMenu = () => {
    const isMenuOpen =
      openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
    const newState = !isMenuOpen;
    
    openMenuBtn.setAttribute('aria-expanded', newState);
    mobileMenu.classList.toggle('is-open');
    
    // Блокування прокрутки body
    document.body.style.overflow = newState ? 'hidden' : '';
  };

  openMenuBtn.addEventListener('click', toggleMenu);
  closeMenuBtn.addEventListener('click', toggleMenu);

  // Закриття мобільного меню при кліку на посилання
  const menuLinks = mobileMenu.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu.classList.contains('is-open')) {
        toggleMenu();
      }
    });
  });

  // Закриття мобільного меню на широких екранах при зміні орієнтації
  window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
    if (!e.matches) return;
    if (mobileMenu.classList.contains('is-open')) {
      mobileMenu.classList.remove('is-open');
      openMenuBtn.setAttribute('aria-expanded', false);
      document.body.style.overflow = '';
    }
  });
})();

