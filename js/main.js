document.addEventListener('DOMContentLoaded', function () {

    // --- Инициализация библиотеки анимаций при скролле ---
    AOS.init({
        once: true,
        duration: 800,
        easing: 'ease-out-cubic'
    });

    // --- Эффект для хедера при прокрутке ---
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // --- Кнопка "Наверх" ---
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            backToTopButton.classList.toggle('show', window.pageYOffset > 300);
        });
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Открытие/закрытие мобильного меню (сайдбара) ---
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.header .nav');
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('open');
            menuToggle.classList.toggle('active');
            document.body.classList.toggle('nav-open');
            menuToggle.setAttribute('aria-expanded', nav.classList.contains('open'));
        });
    }

    // --- Аккордеон для "Оборудования" в мобильном меню ---
    const mobileDropdown = document.querySelector('[data-mobile-dropdown]');
    if (mobileDropdown) {
        const toggleLink = mobileDropdown.querySelector('.dropdown-toggle');
        const dropdownMenu = mobileDropdown.querySelector('.dropdown-menu');
        console.log('Mobile dropdown found:', mobileDropdown);
        console.log('Toggle link found:', toggleLink);
        console.log('Dropdown menu found:', dropdownMenu);
        console.log('Dropdown menu children:', dropdownMenu?.children);
        
        toggleLink.addEventListener('click', function(e) {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                mobileDropdown.classList.toggle('active');
                console.log('Dropdown toggled, active:', mobileDropdown.classList.contains('active'));
                console.log('Dropdown menu max-height:', dropdownMenu?.style.maxHeight);
            }
        });
    }

    // --- Переключение вкладок в секции "Оборудование" ---
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabPanes = document.querySelectorAll('.tab-pane');
    tabLinks.forEach(link => {
        link.addEventListener('click', () => {
            const tabId = link.getAttribute('data-tab');
            tabLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            tabPanes.forEach(pane => pane.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });

    // --- Навигация из выпадающего меню на нужную вкладку ---
    document.querySelectorAll('.dropdown-menu a[data-tab-link]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = link.getAttribute('data-tab-link');
            const tabButton = document.querySelector(`.tab-link[data-tab="${tabId}"]`);
            if (tabButton) tabButton.click();
            
            if (nav && nav.classList.contains('open')) {
                nav.classList.remove('open');
                menuToggle.classList.remove('active');
                document.body.classList.remove('nav-open');
                menuToggle.setAttribute('aria-expanded', 'false');
            }

            const targetElement = document.querySelector(link.getAttribute('href'));
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - (header?.offsetHeight || 70),
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Раскрывающиеся карточки оборудования (аккордеон) ---
    document.querySelectorAll('.product-summary').forEach(summary => {
        summary.addEventListener('click', () => {
            const card = summary.closest('.product-card');
            if (!card) return;
            
            // Закрываем другие открытые карточки
            document.querySelectorAll('.product-card.expanded').forEach(openCard => {
                if (openCard !== card) openCard.classList.remove('expanded');
            });
            
            card.classList.toggle('expanded');
        });
    });

    // --- About Аккордеон ---
    document.querySelectorAll('.about-accordion-question').forEach(question => {
        question.addEventListener('click', () => {
            const accordionItem = question.closest('.about-accordion-item');
            const isActive = accordionItem.classList.contains('active');
            
            // Закрываем все другие открытые элементы
            document.querySelectorAll('.about-accordion-item.active').forEach(activeItem => {
                if (activeItem !== accordionItem) {
                    activeItem.classList.remove('active');
                    const activeQuestion = activeItem.querySelector('.about-accordion-question');
                    activeQuestion.setAttribute('aria-expanded', 'false');
                }
            });
            
            // Переключаем текущий элемент
            accordionItem.classList.toggle('active');
            question.setAttribute('aria-expanded', !isActive);
        });
    });

    // --- Переключение изображений в галерее карточки ---
    document.querySelectorAll('.thumbnail-grid img').forEach(thumb => {
        thumb.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Убираем активный класс у всех миниатюр
            this.closest('.thumbnail-grid').querySelectorAll('img').forEach(t => {
                t.classList.remove('active-thumb');
            });
            
            // Добавляем активный класс к кликнутой миниатюре
            this.classList.add('active-thumb');
            
            // Обновляем главное изображение
            const mainImage = this.closest('.equipment-gallery').querySelector('.main-image');
            if (mainImage) mainImage.src = this.src;
        });
    });

    // --- Логика для модальных окон ---
    const projectModal = document.getElementById('project-modal');
    const comingSoonModal = document.getElementById('coming-soon-modal');
    const projectData = {
        circus: {
            title: "Удивительный Цифровой Цирк",
            description: "Психологическая тёмная комедия о персонажах, запертых в виртуальной реальности.",
            poster: "assets/images/russian-works/Cuirk.png",
            dubTeam: ["Liska (Помни)", "Gashun (Кейн)", "JolyGolf (Джекс)", "Berserk (Рагата)"],
            episodes: [{ title: "Пилот", url: "https://www.youtube.com/embed/yXectSBcUKE" }]
        }
    };

    function openModal(modal) {
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal(modal) {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            const iframe = modal.querySelector('iframe');
            if (iframe) iframe.src = '';
        }
    }

    document.querySelectorAll('.portfolio-banner').forEach(banner => {
        banner.addEventListener('click', () => {
            const projectKey = banner.dataset.project;
            if (projectKey === 'coming-soon') {
                openModal(comingSoonModal);
            } else if (projectData[projectKey]) {
                const data = projectData[projectKey];
                projectModal.querySelector('#project-modal-title').textContent = data.title;
                projectModal.querySelector('#project-modal-poster-img').src = data.poster;
                projectModal.querySelector('#project-modal-description').textContent = data.description;
                projectModal.querySelector('#project-modal-dub-team').innerHTML = data.dubTeam.map(item => `<li>${item}</li>`).join('');
                projectModal.querySelector('#project-modal-iframe').src = data.episodes[0].url;
                openModal(projectModal);
            }
        });
    });

    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', e => {
            if (e.target === modal || e.target.closest('.modal-close-button')) {
                closeModal(modal);
            }
        });
    });

    // --- Инициализация Swiper Slider ---
    if (document.querySelector('.process-slider')) {
        new Swiper('.process-slider', {
            loop: true,
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 1,
            spaceBetween: 20,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: { 
                el: '.swiper-pagination', 
                clickable: true,
                dynamicBullets: true
            },
            navigation: { 
                nextEl: '.swiper-button-next', 
                prevEl: '.swiper-button-prev' 
            },
            breakpoints: { 
                768: { 
                    slidesPerView: 2,
                    spaceBetween: 30
                }, 
                1200: { 
                    slidesPerView: 3,
                    spaceBetween: 40
                } 
            },
            effect: 'slide',
            speed: 600,
            watchOverflow: true,
            watchSlidesProgress: true,
            watchSlidesVisibility: true
        });
    }

    // --- Обработка формы контактов ---
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formMessage = document.querySelector('.form-submission-message');
            const successMessage = formMessage.querySelector('.success-message');
            const errorMessage = formMessage.querySelector('.error-message');
            const submitButton = contactForm.querySelector('button[type="submit"]');
            
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';

            setTimeout(() => {
                formMessage.style.display = 'block';
                successMessage.style.display = 'block';
                errorMessage.style.display = 'none';
                submitButton.disabled = false;
                submitButton.innerHTML = 'Отправить сообщение';
                contactForm.reset();
                setTimeout(() => { formMessage.style.display = 'none'; }, 5000);
            }, 1500);
        });
    }
});

function closeAllProductCards(except) {
  document.querySelectorAll('.product-card.open').forEach(card => {
    if (card !== except) card.classList.remove('open');
  });
}

function deselectAllProductCards(except) {
  document.querySelectorAll('.product-card.selected').forEach(card => {
    if (card !== except) card.classList.remove('selected');
  });
}

function setupProductCards() {
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (e) => {
      // Не даём всплывать, если клик по thumbnail
      if (e.target.closest('.thumbnail-grid')) return;
      const isOpen = card.classList.contains('open');
      closeAllProductCards();
      deselectAllProductCards();
      if (!isOpen) {
        card.classList.add('open', 'selected');
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupProductCards();
});