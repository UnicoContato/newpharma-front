document.addEventListener("DOMContentLoaded", function() {

    let lastScrollTop = 0;
    const header = document.getElementById('main-header');
    const headerHeight = header.offsetHeight;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > headerHeight * 2) {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, false);

    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    menuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    const modal = document.getElementById('privacy-modal');
    const openButton = document.getElementById('open-privacy-modal');
    const closeButton = document.getElementById('close-privacy-modal');
    const closeButtonFooter = document.getElementById('close-privacy-modal-footer');

    const openModal = () => modal.classList.remove('hidden');
    const closeModal = () => modal.classList.add('hidden');

    openButton.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });
    closeButton.addEventListener('click', closeModal);
    closeButtonFooter.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }

            if (!mobileMenu.classList.contains('hidden') && this.closest('#mobile-menu')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

});