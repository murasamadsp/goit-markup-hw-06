(() => {
  const mobileMenu = document.querySelector('.js-menu-container');
  const openMenuBtn = document.querySelector('.js-open-menu');
  const closeMenuBtn = document.querySelector('.js-close-menu');

  if (!mobileMenu || !openMenuBtn || !closeMenuBtn) {
    return;
  }

  const focusElement = element => {
    if (!element || typeof element.focus !== 'function') {
      return;
    }

    try {
      element.focus({ preventScroll: true });
    } catch (error) {
      element.focus();
    }
  };

  const getFocusReturnTarget = () => {
    if (openMenuBtn.offsetParent !== null) {
      return openMenuBtn;
    }

    const currentNavLink = document.querySelector('.nav-link.nav-link--current');
    if (currentNavLink) {
      return currentNavLink;
    }

    return document.querySelector('.nav-logo');
  };

  const openMenu = () => {
    openMenuBtn.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('is-open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    focusElement(closeMenuBtn);
  };

  const closeMenu = () => {
    if (!mobileMenu.classList.contains('is-open')) {
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      return;
    }

    const activeElementInsideMenu = mobileMenu.contains(document.activeElement);

    openMenuBtn.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('is-open');
    document.body.style.overflow = '';

    if (activeElementInsideMenu) {
      const focusTarget = getFocusReturnTarget();
      if (focusTarget) {
        focusElement(focusTarget);
      }
    }

    mobileMenu.setAttribute('aria-hidden', 'true');
  };

  const toggleMenu = () => {
    if (mobileMenu.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  openMenuBtn.addEventListener('click', toggleMenu);
  closeMenuBtn.addEventListener('click', toggleMenu);

  // Закриття мобільного меню при кліку на посилання
  const menuLinks = mobileMenu.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu.classList.contains('is-open')) {
        closeMenu();
      }
    });
  });

  // Закриття мобільного меню на широких екранах при зміні орієнтації
  window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
    if (!e.matches) {
      return;
    }

    if (mobileMenu.classList.contains('is-open')) {
      closeMenu();
    }
  });
})();

