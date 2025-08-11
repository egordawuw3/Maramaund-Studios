document.addEventListener('DOMContentLoaded', function () {

    // --- ОБЪЕКТ С ДАННЫМИ ПРОЕКТОВ ---
    const projectData = {
        circus: {
            title: "Удивительный Цифровой Цирк",
            description: "«Удивительный цифровой цирк» — это мультсериал в жанре психологической тёмной ко-медии о персонажах, запертых в виртуальной реальности. Главная героиня, Помни, ищет выход вместе с другими узниками, сталкиваясь с эксцентричным искусственным интеллектом, который управляет их миром.",
            poster: "assets/images/russian-works/Cuirk.png",
            trailerUrl: "https://www.youtube.com/embed/j8GWluNJ_78",
            ratings: {
                imdb: { score: 8.0, votes: "7 100" },
                kinopoisk: { score: 8.17, votes: "26 814" }
            },
            releaseDate: "13 октября 2023 года",
            country: "Австралия, США",
            director: "Gooseworx",
            genres: "Комедия, фэнтези, приключения, ужасы, мультсериал",
            cast: ["Алекс Рошон", "Майкл Ковач", "Аманда Хаффорд", "Марисса Ленти", "Эшли Николс", "Gooseworx", "Лиззи Фриман", "Шон Чиплок", "Джек Хоукинс"],
            dubTeam: [
                { character: "Помни", actor: "Liska" },
                { character: "Кейн", actor: "Gashun" },
                { character: "Джекс", actor: "JolyGolf" },
                { character: "Рагата", actor: "Berserk" },
                { character: "Гэнгл", actor: "Dariya" },
                { character: "Королёр", actor: "OVERLORDS" },
                { character: "Зубл", actor: "Batareika" },
            ],
            episodes: [
                { title: "Пилот", url: "https://www.youtube.com/embed/yXectSBcUKE" },
                { title: "Серия 2 (скоро)", url: "" }
            ]
        }
    };

    // --- ОБЩИЕ ФУНКЦИИ ---
    AOS.init({ once: true, duration: 800, easing: 'ease-out-cubic' });

    // --- ПЕРЕМЕННЫЕ DOM ---
    const body = document.body;
    const header = document.querySelector('.header');
    const backToTopButton = document.getElementById('backToTop');
    const menuToggle = document.getElementById('menu-toggle');
    const closeNavBtn = document.getElementById('close-nav-btn');
    const navMenu = document.getElementById('nav-menu');
    
    // --- ЭФФЕКТ ХЕДЕРА И КНОПКА "НАВЕРХ" ---
    window.addEventListener('scroll', () => {
        if (header) header.classList.toggle('scrolled', window.scrollY > 50);
        if (backToTopButton) backToTopButton.classList.toggle('show', window.pageYOffset > 300);
    });
    if (backToTopButton) backToTopButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // --- ЛОГИКА МОБИЛЬНОГО МЕНЮ (САЙДБАРА) ---
    if (menuToggle && navMenu && closeNavBtn) {
        const openMenu = () => {
            navMenu.classList.add('open');
            body.classList.add('nav-open');
            menuToggle.classList.add('active');
        };
        const closeMenu = () => {
            navMenu.classList.remove('open');
            body.classList.remove('nav-open');
            menuToggle.classList.remove('active');
        };
        menuToggle.addEventListener('click', openMenu);
        closeNavBtn.addEventListener('click', closeMenu);

        navMenu.querySelectorAll('a').forEach(link => {
            if (!link.classList.contains('dropdown-toggle')) {
                link.addEventListener('click', closeMenu);
            }
        });

        navMenu.querySelectorAll('.dropdown[data-mobile-dropdown]').forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            toggle.addEventListener('click', (e) => {
                if (window.innerWidth <= 992) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        });
    }

    // --- ЛОГИКА ВКЛАДОК И АККОРДЕОНОВ ОБОРУДОВАНИЯ ---
    document.querySelectorAll('.tab-link').forEach(link => {
        link.addEventListener('click', () => {
            const tabId = link.dataset.tab;
            document.querySelectorAll('.tab-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
            document.getElementById(tabId)?.classList.add('active');
        });
    });

    document.querySelectorAll('.product-summary').forEach(summary => {
        summary.addEventListener('click', () => {
            const card = summary.closest('.product-card');
            if (!card) return;
            const isExpanded = card.classList.contains('expanded');
            document.querySelectorAll('.product-card.expanded').forEach(c => c.classList.remove('expanded'));
            if (!isExpanded) card.classList.add('expanded');
        });
    });

    document.querySelectorAll('.thumbnail-grid img').forEach(thumb => {
        thumb.addEventListener('click', function (e) {
            e.stopPropagation();
            const mainImage = this.closest('.equipment-gallery')?.querySelector('.main-image');
            if (mainImage) mainImage.src = this.src;
            this.closest('.thumbnail-grid')?.querySelectorAll('img').forEach(t => t.classList.remove('active-thumb'));
            this.classList.add('active-thumb');
        });
    });

    // --- ЛОГИКА МОДАЛЬНЫХ ОКОН ---
    const projectModal = document.getElementById('project-modal');
    const comingSoonModal = document.getElementById('coming-soon-modal');
    const imageLightbox = document.getElementById('image-lightbox');

    function populateProjectModal(data) {
        if (!projectModal || !data) return;

        projectModal.querySelector('#project-modal-title').textContent = data.title;
        projectModal.querySelector('#project-modal-poster-img').src = data.poster;
        projectModal.querySelector('#project-modal-description').textContent = data.description;
        projectModal.querySelector('#project-modal-trailer-btn').href = data.trailerUrl;

        const ratingsContainer = projectModal.querySelector('#project-modal-ratings');
        ratingsContainer.innerHTML = `
            <div class="rating-item">
                <span class="rating-source">IMDb:</span>
                <span class="rating-score">${data.ratings.imdb.score.toFixed(1)}</span>
            </div>
            <div class="rating-item">
                <span class="rating-source">Кинопоиск:</span>
                <span class="rating-score">${data.ratings.kinopoisk.score.toFixed(2)}</span>
            </div>
        `;
        
        projectModal.querySelector('#project-modal-meta-list').innerHTML = `
            <li><strong>Режиссёр:</strong> <span>${data.director}</span></li>
            <li><strong>Дата выхода:</strong> <span>${data.releaseDate}</span></li>
            <li><strong>Страна:</strong> <span>${data.country}</span></li>
            <li><strong>Жанры:</strong> <span>${data.genres}</span></li>
        `;

        projectModal.querySelector('#project-modal-cast').innerHTML = data.cast.map(name => `<li>${name}</li>`).join('');
        projectModal.querySelector('#project-modal-dub-team').innerHTML = data.dubTeam.map(item => `<li><strong>${item.character}:</strong> ${item.actor}</li>`).join('');

        const episodeSelector = projectModal.querySelector('#episode-selector');
        const iframe = projectModal.querySelector('#project-modal-iframe');
        episodeSelector.innerHTML = data.episodes.map((ep, index) => 
            `<button class="button episode-btn ${index === 0 ? 'active' : ''}" data-url="${ep.url}" ${!ep.url ? 'disabled' : ''}>${ep.title}</button>`
        ).join('');
        iframe.src = data.episodes[0]?.url || '';
    }

    function openModal(modal) {
        if (modal) {
            modal.style.display = 'flex';
            body.classList.add('nav-open');
        }
    }

    function closeModal(modal) {
        if (modal) {
            modal.style.display = 'none';
            body.classList.remove('nav-open');
            const iframe = modal.querySelector('iframe');
            if (iframe) iframe.src = '';
            
            if (modal.id === 'image-lightbox') {
                const lightboxImg = modal.querySelector('img');
                if (lightboxImg) lightboxImg.src = ''; 
            }
        }
    }

    document.querySelectorAll('.portfolio-banner').forEach(banner => {
        banner.addEventListener('click', () => {
            const projectKey = banner.dataset.project;
            if (projectKey === 'coming-soon') {
                openModal(comingSoonModal);
            } else if (projectData[projectKey]) {
                populateProjectModal(projectData[projectKey]);
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

    projectModal?.querySelector('#episode-selector').addEventListener('click', (e) => {
        if (e.target.classList.contains('episode-btn')) {
            const url = e.target.dataset.url;
            if (url) {
                projectModal.querySelector('#project-modal-iframe').src = url;
                projectModal.querySelectorAll('.episode-btn').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
            }
        }
    });

    // --- SWIPER SLIDER ---
    const processSlider = document.querySelector('.process-slider');
    if (processSlider) {
        new Swiper('.process-slider', {
            loop: true,
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            spaceBetween: 20,
            autoplay: { delay: 3000, disableOnInteraction: false },
            pagination: { el: '.swiper-pagination', clickable: true },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
            breakpoints: {
                768: { spaceBetween: 30 },
                1200: { spaceBetween: 40 }
            }
        });
        
        // --- НОВОЕ: ЛОГИКА ДЛЯ ОТКРЫТИЯ ИЗОБРАЖЕНИЙ ИЗ СЛАЙДЕРА ---
        processSlider.addEventListener('click', (e) => {
            const slideImg = e.target.closest('.swiper-slide img');
            if (slideImg && imageLightbox) {
                const lightboxImg = imageLightbox.querySelector('img');
                if (lightboxImg) {
                    lightboxImg.src = slideImg.src;
                    openModal(imageLightbox);
                }
            }
        });
    }

    // --- FORM SUBMISSION ---
    const contactForm = document.querySelector('.contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Здесь будет логика отправки, сейчас это симуляция
            console.log("Форма отправлена (симуляция)");
        });
    }
});