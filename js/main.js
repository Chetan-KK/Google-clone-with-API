import '../css/main.css';

const resultsBox = document.querySelector("[data-resultsBox]");
const closeButton = document.querySelector('[data-close]');
const results = document.querySelector("[data-results]");

closeButton.addEventListener('click', close);

function close() {
    resultsBox.style.top = '100vh';
    results.innerHTML = '';
    const loadMore = document.querySelectorAll('.loadMoreButton');
    for (let i = 0; i < loadMore.length; i++) {

        loadMore[i].remove();
    }

}