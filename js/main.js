document.addEventListener('DOMContentLoaded', function () {
    AOS.init({
        once: true,
        duration: 1000,
        easing: 'ease-out-cubic'
    });

    // Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Back to Top Button
    const backToTopButton = document.getElementById('backToTop');
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

    // Reading Progress Bar
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        document.querySelector('.reading-progress-bar').style.width = progress + '%';
        document.querySelector('.reading-progress').setAttribute('aria-valuenow', progress);
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    menuToggle.addEventListener('click', () => {
        document.body.classList.toggle('nav-open');
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
    });

    // Equipment Tabs
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabLinks.forEach(link => {
        link.addEventListener('click', (e) => {
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

    // Dropdown links to control tabs
    document.querySelectorAll('.dropdown-menu a[data-tab-link]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = link.getAttribute('data-tab-link');
            const tabButton = document.querySelector(`.tab-link[data-tab="${tabId}"]`);
            if(tabButton) {
                tabButton.click();
            }
            
            if(document.body.classList.contains('nav-open')) {
                document.body.classList.remove('nav-open');
                menuToggle.setAttribute('aria-expanded', 'false');
            }

            const targetElement = document.querySelector(link.getAttribute('href'));
            if (targetElement) {
                const headerOffset = document.querySelector('.header').offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - headerOffset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Equipment Accordion
    document.querySelectorAll('.product-summary').forEach(summary => {
        summary.addEventListener('click', () => {
            const card = summary.closest('.product-card');
            const details = card.querySelector('.product-details');
            if (!card || !details) return;

            const isExpanded = card.classList.contains('expanded');
            
            const parentGrid = card.closest('.equipment-grid');
            if(parentGrid){
                parentGrid.querySelectorAll('.product-card.expanded').forEach(openCard => {
                    if (openCard !== card) {
                        openCard.classList.remove('expanded');
                        const openDetails = openCard.querySelector('.product-details');
                        if (openDetails) openDetails.style.maxHeight = null;
                    }
                });
            }

            card.classList.toggle('expanded');
            if (card.classList.contains('expanded')) {
                details.style.maxHeight = details.scrollHeight + "px";
            } else {
                details.style.maxHeight = null;
            }
        });
    });

    // Thumbnail image switcher
    document.querySelectorAll('.product-details .thumbnail-grid img').forEach(thumb => {
        thumb.addEventListener('click', function(event) {
            event.stopPropagation();
            const mainImage = this.closest('.equipment-gallery').querySelector('.main-image');
            mainImage.src = this.src;
            const galleryThumbs = this.closest('.thumbnail-grid').querySelectorAll('img');
            galleryThumbs.forEach(t => t.classList.remove('active-thumb'));
            this.classList.add('active-thumb');
        });
    });

    // --- Modal Logic ---
    const projectModal = document.getElementById('project-modal');
    const projectModalClose = document.getElementById('project-modal-close');
    const projectModalIframe = document.getElementById('project-modal-iframe');
    const projectBanners = document.querySelectorAll('.portfolio-banner');
    const comingSoonModal = document.getElementById('coming-soon-modal');
    const comingSoonModalClose = document.getElementById('coming-soon-modal-close');

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
            genres: ["Комедии", "Фэнтези", "Фантастика", "Приключения", "Триллеры", "Ужасы", "Детективы", "Мультсериалы", "Зарубежные"],
            cast: ["Алекс Рошон", "Майкл Ковач", "Аманда Хаффорд", "Марисса Ленти", "Эшли Николс", "Gooseworx", "Лиззи Фриман", "Шон Чиплок", "Джек Хоукинс", "Morgane Brehamel", "и другие"],
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

    function generateStars(rating, max = 10) {
        const score = parseFloat(rating);
        let html = '';
        for (let i = 1; i <= 5; i++) {
            if (score >= i * max / 5) html += '<i class="fas fa-star"></i>';
            else if (score >= (i - 0.5) * max / 5) html += '<i class="fas fa-star-half-alt"></i>';
            else html += '<i class="far fa-star"></i>';
        }
        return html;
    }

    function openProjectModal(project) {
        if (!project) return;
        
        document.getElementById('project-modal-title').textContent = project.title;
        document.getElementById('project-modal-poster-img').src = project.poster;
        document.getElementById('project-modal-description').textContent = project.description;

        const ratingsEl = document.getElementById('project-modal-ratings');
        ratingsEl.innerHTML = '';
        if (project.ratings && project.ratings.imdb) {
            ratingsEl.innerHTML += `<div class="rating-item"><span class="rating-source">IMDb:</span><span class="rating-score">${project.ratings.imdb.score.toFixed(1)}</span><div class="rating-stars">${generateStars(project.ratings.imdb.score)}</div><span class="rating-votes">(${project.ratings.imdb.votes})</span></div>`;
        }
        if (project.ratings && project.ratings.kinopoisk) {
            ratingsEl.innerHTML += `<div class="rating-item"><span class="rating-source">Кинопоиск:</span><span class="rating-score">${project.ratings.kinopoisk.score.toFixed(2)}</span><div class="rating-stars">${generateStars(project.ratings.kinopoisk.score, 10)}</div><span class="rating-votes">(${project.ratings.kinopoisk.votes})</span></div>`;
        }

        const metaEl = document.getElementById('project-modal-meta');
        metaEl.innerHTML = `<ul>
            ${project.releaseDate ? `<li><strong>Дата выхода:</strong> ${project.releaseDate}</li>` : ''}
            ${project.country ? `<li><strong>Страна:</strong> ${project.country}</li>` : ''}
            ${project.director ? `<li><strong>Режиссер:</strong> ${project.director}</li>` : ''}
            ${project.genres ? `<li><strong>Жанр:</strong> ${project.genres.join(', ')}</li>` : ''}
        </ul>`;

        const castEl = document.getElementById('project-modal-cast');
        castEl.innerHTML = '';
        if (project.cast && project.cast.length > 0) {
            castEl.innerHTML = '<li>' + project.cast.join(', ') + '</li>';
        }

        const dubTeamEl = document.getElementById('project-modal-dub-team');
        dubTeamEl.innerHTML = '';
        if (project.dubTeam && project.dubTeam.length > 0) {
            project.dubTeam.forEach(m => {
                if (typeof m === 'object' && m.character) {
                    dubTeamEl.innerHTML += `<li><strong>${m.character}:</strong> ${m.actor}</li>`;
                } else {
                    dubTeamEl.innerHTML += `<li>${m}</li>`;
                }
            });
        }
        
        const episodeSelector = document.getElementById('episode-selector');
        episodeSelector.innerHTML = '';
        project.episodes.forEach((ep, index) => {
            const btn = document.createElement('button');
            btn.className = 'button small-button episode-btn';
            btn.innerHTML = `<i class="fas fa-play"></i> ${ep.title}`;

            if (index === 0) btn.classList.add('active');
            btn.disabled = !ep.url;
            btn.addEventListener('click', () => {
                projectModalIframe.src = ep.url;
                document.querySelectorAll('.episode-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
            episodeSelector.appendChild(btn);
        });

        const trailerBtn = document.getElementById('project-modal-trailer-btn');
        trailerBtn.onclick = () => {
            projectModalIframe.src = project.trailerUrl;
            document.querySelectorAll('.episode-btn').forEach(b => b.classList.remove('active'));
        };
        
        projectModalIframe.src = project.episodes[0]?.url || project.trailerUrl;
        projectModal.style.display = 'flex';
    }

    function closeProjectModal() {
        projectModal.style.display = 'none';
        projectModalIframe.src = ''; 
    }

    function openComingSoonModal() {
        if(comingSoonModal) comingSoonModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeComingSoonModal() {
        if(comingSoonModal) comingSoonModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    projectBanners.forEach(banner => {
        banner.addEventListener('click', () => {
            const projectKey = banner.dataset.project;
            if (projectKey === 'coming-soon') {
                comingSoonModal.style.display = 'flex';
            } else {
                const data = projectData[projectKey];
                openProjectModal(data);
            }
        });
    });

    if(projectModalClose) projectModalClose.addEventListener('click', closeProjectModal);
    if(projectModal) projectModal.addEventListener('click', e => { if (e.target === projectModal) closeProjectModal(); });
    
    if(comingSoonModalClose) comingSoonModalClose.addEventListener('click', closeComingSoonModal);
    if(comingSoonModal) comingSoonModal.addEventListener('click', e => { if (e.target === comingSoonModal) closeComingSoonModal(); });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (projectModal && projectModal.style.display === 'flex') closeProjectModal();
            if (comingSoonModal && comingSoonModal.style.display === 'flex') closeComingSoonModal();
        }
    });

    // Swiper Slider
    var swiper = new Swiper('.process-slider', {
        effect: 'coverflow', grabCursor: true, centeredSlides: true, slidesPerView: 'auto', loop: true,
        coverflowEffect: { rotate: 50, stretch: 0, depth: 100, modifier: 1, slideShadows: true },
        pagination: { el: '.swiper-pagination', clickable: true },
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    });

    // Dropdown Menu
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    if(dropdownToggle) {
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            const menu = this.nextElementSibling;
            menu.classList.toggle('open');
            this.setAttribute('aria-expanded', menu.classList.contains('open'));
        });
    }
    document.addEventListener('click', (e) => {
        const openDropdown = document.querySelector('.dropdown-menu.open');
        if (openDropdown && !openDropdown.closest('.dropdown').contains(e.target)) {
            openDropdown.classList.remove('open');
            openDropdown.previousElementSibling.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Contact Form
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