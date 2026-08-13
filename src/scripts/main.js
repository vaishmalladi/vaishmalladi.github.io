document.addEventListener('DOMContentLoaded', function() {
    const pages = document.querySelectorAll('.page');
    const cover = document.querySelector('.cover');
    const backCover = document.querySelector('.back-cover');
    let currentPage = 0;

    function showPage(index) {
        pages.forEach((page, i) => {
            page.style.display = (i === index) ? 'block' : 'none';
        });
        updateBookmarks(index);
    }

    function updateBookmarks(index) {
        const bookmarks = document.querySelectorAll('.bookmark');
        bookmarks.forEach((bookmark, i) => {
            bookmark.classList.toggle('active', i === index);
        });
    }

    function flipPage(direction) {
        if (direction === 'next' && currentPage < pages.length - 1) {
            currentPage++;
        } else if (direction === 'prev' && currentPage > 0) {
            currentPage--;
        }
        showPage(currentPage);
    }

    document.querySelector('.next-button').addEventListener('click', () => flipPage('next'));
    document.querySelector('.prev-button').addEventListener('click', () => flipPage('prev'));

    document.querySelectorAll('.bookmark').forEach((bookmark, index) => {
        bookmark.addEventListener('click', () => {
            currentPage = index;
            showPage(currentPage);
        });
    });

    showPage(currentPage);
});