document.addEventListener('DOMContentLoaded', function () {
    // --- Инициализация библиотеки анимаций при скролле ---
    AOS.init({
        once: true,
        duration: 1000,
        easing: 'ease-out-cubic'
    });

    // --- Эффект для хедера при прокрутке ---
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- Кнопка "Наверх" ---
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // --- Индикатор прогресса чтения страницы ---
    const readingProgressBar = document.querySelector('.reading-progress-bar');
    const readingProgress = document.querySelector('.reading-progress');
    if (readingProgressBar && readingProgress) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = (scrollTop / scrollHeight) * 100;
            readingProgressBar.style.width = progress + '%';
            readingProgress.setAttribute('aria-valuenow', progress);
        });
    }

    // --- Открытие/закрытие мобильного меню (сайдбара) ---
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.header .nav'); // Уточненный селектор
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            // Переключаем классы для анимации меню и кнопки
            nav.classList.toggle('open');
            menuToggle.classList.toggle('active');
            
            // Этот класс блокирует прокрутку страницы, когда меню открыто
            document.body.classList.toggle('nav-open');
            
            // Обновляем ARIA атрибут для доступности
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
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
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === tabId) {
                    pane.classList.add('active');
                }
            });
        });
    });

    // --- Навигация из выпадающего меню на нужную вкладку ---
    document.querySelectorAll('.dropdown-menu a[data-tab-link]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = link.getAttribute('data-tab-link');
            const tabButton = document.querySelector(`.tab-link[data-tab="${tabId}"]`);
            if (tabButton) {
                tabButton.click(); // Имитируем клик по вкладке
            }
            
            // Если мобильное меню было открыто, закрываем его
            if (nav && nav.classList.contains('open')) {
                nav.classList.remove('open');
                menuToggle.classList.remove('active');
                document.body.classList.remove('nav-open');
                menuToggle.setAttribute('aria-expanded', 'false');
            }

            // Плавная прокрутка к секции
            const targetElement = document.querySelector(link.getAttribute('href'));
            if (targetElement) {
                const headerOffset = header.offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - headerOffset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Раскрывающиеся карточки оборудования (аккордеон) ---
    document.querySelectorAll('.product-summary').forEach(summary => {
        summary.addEventListener('click', () => {
            const card = summary.closest('.product-card');
            const details = card.querySelector('.product-details');
            if (!card || !details) return;

            const isExpanded = card.classList.contains('expanded');
            
            // Закрываем все другие открытые карточки в этой же сетке
            const parentGrid = card.closest('.equipment-grid');
            if (parentGrid) {
                parentGrid.querySelectorAll('.product-card.expanded').forEach(openCard => {
                    if (openCard !== card) {
                        openCard.classList.remove('expanded');
                        const openDetails = openCard.querySelector('.product-details');
                        if (openDetails) openDetails.style.maxHeight = null;
                    }
                });
            }
            
            // Открываем или закрываем текущую карточку
            card.classList.toggle('expanded');
            if (card.classList.contains('expanded')) {
                // Устанавливаем высоту для плавной анимации
                details.style.maxHeight = details.scrollHeight + "px";
            } else {
                details.style.maxHeight = null;
            }
        });
    });

    // --- Переключение изображений в галерее карточки ---
    document.querySelectorAll('.thumbnail-grid img').forEach(thumb => {
        thumb.addEventListener('click', function(event) {
            event.stopPropagation(); // Предотвращаем закрытие карточки
            
            const mainImage = this.closest('.equipment-gallery').querySelector('.main-image');
            if (mainImage) {
                mainImage.src = this.src;
            }
            
            const galleryThumbs = this.closest('.thumbnail-grid').querySelectorAll('img');
            galleryThumbs.forEach(t => t.classList.remove('active-thumb'));
            this.classList.add('active-thumb');
        });
    });

    // --- Логика для модальных окон ---
    const projectModal = document.getElementById('project-modal');
    const comingSoonModal = document.getElementById('coming-soon-modal');

    // Данные для модальных окон
    const projectData = {
        circus: {
            title: "Удивительный Цифровой Цирк",
            description: "«Удивительный цифровой цирк» — это мультсериал в жанре психологической тёмной ко-медии о персонажах, запертых в виртуальной реальности. Главная героиня, Помни, ищет выход вместе с другими узниками, сталкиваясь с эксцентричным искусственным интеллектом, который управляет их миром.",
            poster: "assets/images/russian-works/Cuirk.png",
            trailerUrl: "https://www.youtube.com/embed/j8GWluNJ_78",
            episodes: [
                { title: "Пилот", url: "https://www.youtube.com/embed/yXectSBcUKE" },
                { title: "Серия 2 (скоро)", url: "" }
            ]
            // Остальные данные (рейтинги, актеры и т.д.) можно добавить по аналогии
        }
    };

    function openProjectModal(project) {
        if (!project || !projectModal) return;
        
        projectModal.querySelector('#project-modal-title').textContent = project.title;
        projectModal.querySelector('#project-modal-poster-img').src = project.poster;
        projectModal.querySelector('#project-modal-description').textContent = project.description;

        const episodeSelector = projectModal.querySelector('#episode-selector');
        const projectModalIframe = projectModal.querySelector('#project-modal-iframe');
        episodeSelector.innerHTML = '';
        project.episodes.forEach((ep, index) => {
            const btn = document.createElement('button');
            btn.className = 'button small-button episode-btn';
            btn.innerHTML = `<i class="fas fa-play"></i> ${ep.title}`;
            if (index === 0) btn.classList.add('active');
            btn.disabled = !ep.url;
            btn.addEventListener('click', () => {
                if(projectModalIframe) projectModalIframe.src = ep.url;
                episodeSelector.querySelectorAll('.episode-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
            episodeSelector.appendChild(btn);
        });

        const trailerBtn = projectModal.querySelector('#project-modal-trailer-btn');
        if(trailerBtn) {
            trailerBtn.onclick = () => {
                if(projectModalIframe) projectModalIframe.src = project.trailerUrl;
                episodeSelector.querySelectorAll('.episode-btn').forEach(b => b.classList.remove('active'));
            };
        }
        
        if(projectModalIframe) projectModalIframe.src = project.episodes[0]?.url || project.trailerUrl;
        projectModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeProjectModal() {
        if (!projectModal) return;
        const projectModalIframe = projectModal.querySelector('#project-modal-iframe');
        projectModal.style.display = 'none';
        if(projectModalIframe) projectModalIframe.src = ''; 
        document.body.style.overflow = 'auto';
    }

    function openComingSoonModal() {
        if(comingSoonModal) comingSoonModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeComingSoonModal() {
        if(comingSoonModal) comingSoonModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    document.querySelectorAll('.portfolio-banner').forEach(banner => {
        banner.addEventListener('click', () => {
            const projectKey = banner.dataset.project;
            if (projectKey === 'coming-soon') {
                openComingSoonModal();
            } else {
                const data = projectData[projectKey];
                openProjectModal(data);
            }
        });
    });

    // Закрытие модальных окон
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(modal => {
        const closeButton = modal.querySelector('.modal-close-button');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                if (modal.id === 'project-modal') closeProjectModal();
                if (modal.id === 'coming-soon-modal') closeComingSoonModal();
            });
        }
        modal.addEventListener('click', e => {
            if (e.target === modal) {
                if (modal.id === 'project-modal') closeProjectModal();
                if (modal.id === 'coming-soon-modal') closeComingSoonModal();
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProjectModal();
            closeComingSoonModal();
        }
    });

    // --- Инициализация Swiper Slider ---
    if (document.querySelector('.process-slider')) {
        new Swiper('.process-slider', {
            loop: true,
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 1,
            spaceBetween: 20,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                768: { slidesPerView: 2, spaceBetween: 40, },
                1200: { slidesPerView: 3, spaceBetween: 60, }
            }
        });
    }

    // --- Логика для выпадающего меню в хедере ---
    document.addEventListener('click', (e) => {
        const isDropdownButton = e.target.matches("[data-dropdown-button]");
        if (!isDropdownButton && e.target.closest('[data-dropdown]') != null) return;

        let currentDropdown;
        if (isDropdownButton) {
            currentDropdown = e.target.closest('[data-dropdown]');
            currentDropdown.classList.toggle('active');
        }

        document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
            if (dropdown === currentDropdown) return;
            dropdown.classList.remove('active');
        });
    });
    
    // --- Логика для формы контактов ---
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Здесь должна быть логика отправки данных, например, через Fetch API.
            // Ниже - имитация успешной отправки.
            const formMessage = document.querySelector('.form-submission-message');
            const submitButton = contactForm.querySelector('button[type="submit"]');
            
            if (!formMessage || !submitButton) return;
            
            const successMessage = formMessage.querySelector('.success-message');
            const errorMessage = formMessage.querySelector('.error-message');
            
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Отправка...';

            // Имитация ответа от сервера
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