import '../css/home.css';

const searchInput = document.querySelector("[data-input]");
const searchButton = document.querySelector("[data-imgSubmit]");
const resultsBox = document.querySelector("[data-resultsBox]");
const imgResults = document.querySelector("[data-results]");
const closeButton = document.querySelector('[data-close]');
var i = 0;

searchButton.addEventListener('click', searchImgResult);

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'b70ab9b176msh764e0906300ee11p152102jsn66ec785320c8',
        'X-RapidAPI-Host': 'google-image-search1.p.rapidapi.com'
    }
};

async function searchImgResult() {
    resultsBox.style.top = 0;

    const results = document.createElement('div');
    results.setAttribute('class', 'images flex');
    imgResults.appendChild(results);

    const loadMores = document.querySelectorAll('.loadMoreButton');
    for (let i = 0; i < loadMores.length; i++) {
        loadMores[i].remove();
    }

    fetch(`https://google-image-search1.p.rapidapi.com/v2/?q=${searchInput.value}`, options)
        .then(response => response.json())
        .then(response => {

            function load() {
                let repeat = 10 + i;
                while (i < repeat) {
                    const imageBox = document.createElement('div');
                    imageBox.setAttribute('class', "imageBox");

                    const image = document.createElement('img');
                    image.setAttribute('src', response.response.images[i].thumbnail.url);
                    imageBox.appendChild(image);

                    const imageTitle = document.createElement('a');
                    imageTitle.setAttribute('href', response.response.images[i].source.page);
                    imageTitle.innerText = response.response.images[i].source.title;
                    imageBox.appendChild(imageTitle);

                    results.appendChild(imageBox);
                    i++;
                }
                i = i;
                closeButton.addEventListener('click', close);

                function close() {
                    i = 0;
                }
            }
            load();

            const loadMore = document.createElement('button');
            loadMore.setAttribute('class', 'loadMoreButton');
            loadMore.innerText = "Load More";
            loadMore.addEventListener('click', load);
            resultsBox.children[0].appendChild(loadMore);

        })
        .catch(err => console.error(err));
};
