document.addEventListener('DOMContentLoaded', () => {
    // Burger menu 
    const btnModalShow = document.querySelector('.button__burger-menu');
    const mobileOverlay = document.getElementById('mobileOverlay');

    const showBurgerModal = () => {

        btnModalShow.addEventListener('click', () => {
            mobileOverlay.showModal();
        })
    }

    showBurgerModal();

    //Скролл к секции
    const scrollToElement = () => {
        const scrollTo = document.querySelectorAll('a[href^="#"');

        scrollTo.forEach(i => {
            i.addEventListener('click', (e) => {
                e.preventDefault();
                const id = i.getAttribute('href');


                document.querySelector(id).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });

                mobileOverlay.close();

            });
        })
    };

    scrollToElement();

    //Карта яндекса
    ymaps.ready(init);

    function init() {
        var myMap = new ymaps.Map('myMap', {
            center: [51.5902500621165, 46.302619739607735],
            zoom: 16
        });

        var myPlacemark = new ymaps.Placemark([51.5902500621165, 46.302619739607735], {
            balloonContent: `Село Шумейка <br/>
                        Берег базы "Покровская слобода <br/>
                        тел: 8-929-77-88-003`
        }, {
            preset: 'twirl#blueStretchyIcon'
        });


        myMap.geoObjects.add(myPlacemark);
        myMap.behaviors.disable(['scrollZoom']);
    }

    //Слайдер отзывов

    const wrapper = document.querySelector('.reviews');
    const carousel = document.querySelector('.reviews__list');
    const arrowBtns = document.querySelectorAll('.reviews__arrow-button');
    const firstCardWidth = carousel.querySelector('.reviews__item').offsetWidth;
    const carouselChildrens = [...carousel.children];

    let isDragging = false,
        startX, startScrollLeft, timeoutId;

    let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth)

    carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
        carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

    carouselChildrens.slice(0, cardPerView).forEach(card => {
        carousel.insertAdjacentHTML('beforeend', card.outerHTML);
    });

    arrowBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            carousel.scrollLeft += btn.id === 'left' ? -firstCardWidth : firstCardWidth;
        })
    })

    const dragStart = (e) => {
        isDragging = true;
        carousel.classList.add('reviews__list--dragging')
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft
    }

    const dragging = (e) => {
        if (!isDragging) return;
        carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    }

    const dragStop = () => {
        isDragging = false;
        carousel.classList.remove('reviews__list--dragging')
    }

    const infiniteScroll = () => {
        if (carousel.scrollLeft === 0) {
            carousel.classList.add('reviews__list--no-transition');
            carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
            carousel.classList.remove('reviews__list--no-transition');
        } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
            carousel.classList.add('reviews__list--no-transition');
            carousel.scrollLeft = carousel.offsetWidth;
            carousel.classList.remove('reviews__list--no-transition');
        }

        clearTimeout(timeoutId);
        if (!wrapper.matches(":hover")) autoPlay();
    }

    const autoPlay = () => {
        if (window.innerWidth < 800) return;
        timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 100000000);
    }

    autoPlay();

    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("scroll", infiniteScroll);
    wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
    wrapper.addEventListener("mouseleave", autoPlay);



    const showScheduleTable = () => {
        const table = document.querySelector('.schedule__table');
        const tableBtn = document.querySelector('.schedule__button');
        tableBtn.addEventListener('click', () => {
            table.classList.toggle('visually-hidden');
        })
    }

    showScheduleTable();
})




//Показ всей галереи

// const btnG = document.querySelector('.gallery__button');
// const bodyG = document.querySelector('.gallery__body');
// const galleryShow = document.querySelectorAll('.gallery__item');

// btnG.addEventListener('click', (e) => {
//     e.preventDefault();
//     galleryShow.forEach(i => i.classList.toggle('gallery__item-sm'));
// })