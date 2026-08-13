const bookmarks = document.querySelectorAll('.bookmark');

bookmarks.forEach(bookmark => {
    bookmark.addEventListener('click', (event) => {
        event.preventDefault();
        const targetPage = bookmark.getAttribute('data-target');
        flipToPage(targetPage);
    });
});

function flipToPage(page) {
    const currentPage = document.querySelector('.page.active');
    const targetPage = document.querySelector(`.page[data-page="${page}"]`);

    if (currentPage && targetPage) {
        currentPage.classList.remove('active');
        targetPage.classList.add('active');
        // Add any additional animations or transitions here
    }
}