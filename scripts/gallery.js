//Скролл к началу страницы

const scrollToTopPage = () => {
    const up = document.querySelector('.button-up');

    up.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

scrollToTopPage();