document.addEventListener("DOMContentLoaded", function() {

    // --- 1. Funcionalidade do Header Dinâmico ---
    let lastScrollTop = 0;
    const header = document.getElementById('main-header');
    const headerHeight = header.offsetHeight; // Pega a altura do header

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > headerHeight * 2) {
            // Rolando para Baixo e já passou do header
            header.classList.add('header-hidden');
        } else {
            // Rolando para Cima
            header.classList.remove('header-hidden');
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Para lidar com scroll no topo
    }, false);


    // --- 2. Funcionalidade do Menu Mobile ---
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    menuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Fecha o menu mobile ao clicar em um link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });


    // --- 3. Funcionalidade do Modal de Privacidade ---
    const modal = document.getElementById('privacy-modal');
    const openButton = document.getElementById('open-privacy-modal'); // Link do rodapé
    const closeButton = document.getElementById('close-privacy-modal');
    const closeButtonFooter = document.getElementById('close-privacy-modal-footer');

    const openModal = () => modal.classList.remove('hidden');
    const closeModal = () => modal.classList.add('hidden');

    openButton.addEventListener('click', (e) => {
        e.preventDefault(); // Previne que o link '#' vá para o topo
        openModal();
    });
    
    closeButton.addEventListener('click', closeModal);
    closeButtonFooter.addEventListener('click', closeModal);
    
    // Fecha o modal se clicar fora da caixa de conteúdo
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // --- 4. Funcionalidade de Scroll Suave (Fallback/Controle) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Previne o comportamento padrão SÓ se não for o link do modal
            if (this.getAttribute('id') !== 'open-privacy-modal') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }

            // Fecha o menu mobile se estiver aberto e for um link de navegação
            if (!mobileMenu.classList.contains('hidden') && this.closest('#mobile-menu')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

});