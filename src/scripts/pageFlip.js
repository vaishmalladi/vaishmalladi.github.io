const pageFlip = (() => {
    const pages = document.querySelectorAll('.page');
    let currentPage = 0;

    const flipPage = (direction) => {
        if (direction === 'next' && currentPage < pages.length - 1) {
            pages[currentPage].classList.remove('active');
            currentPage++;
            pages[currentPage].classList.add('active');
        } else if (direction === 'prev' && currentPage > 0) {
            pages[currentPage].classList.remove('active');
            currentPage--;
            pages[currentPage].classList.add('active');
        }
    };

    const init = () => {
        pages[currentPage].classList.add('active');
        document.querySelector('.next-button').addEventListener('click', () => flipPage('next'));
        document.querySelector('.prev-button').addEventListener('click', () => flipPage('prev'));
    };

    return {
        init,
    };
})();

document.addEventListener('DOMContentLoaded', pageFlip.init);