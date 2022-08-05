import '../css/home.css';

const searchInput = document.querySelector("[data-input]");
const searchButton = document.querySelector("[data-submit]");
const resultsBox = document.querySelector("[data-resultsBox]");
const results = document.querySelector("[data-results]");

searchButton.addEventListener('click', searchResult);

const options = {
    method: 'GET',
    headers: {
        'X-User-Agent': 'desktop',
        'X-Proxy-Location': 'IN',
        'X-RapidAPI-Key': 'b70ab9b176msh764e0906300ee11p152102jsn66ec785320c8',
        'X-RapidAPI-Host': 'google-search3.p.rapidapi.com'
    }
};

async function searchResult() {
    resultsBox.style.top = 0;


    fetch(`https://google-search3.p.rapidapi.com/api/v1/search/q=${searchInput.value}`, options)
        .then(response => response.json())
        .then(response => {

            for (let i = 0; i < response.results.length; i++) {
                const result = document.createElement('div');
                result.setAttribute('class', 'result');

                const mainLink = document.createElement('a');
                mainLink.setAttribute('class', 'title');
                mainLink.setAttribute('target', '_blank');
                mainLink.setAttribute('href', response.results[i].link);
                mainLink.innerText = response.results[i].title;
                result.appendChild(mainLink);

                const maindescription = document.createElement('div');
                maindescription.setAttribute('class', 'description');
                maindescription.innerText = response.results[i].description;
                result.appendChild(maindescription);

                const additionalLinks = document.createElement('div');
                additionalLinks.setAttribute('class', 'additionalLinks');

                for (let j = 0; j < response.results[i].additional_links.length; j++) {

                    const link = document.createElement('a');
                    link.setAttribute('class', 'link');
                    link.setAttribute('target', '_blank');
                    link.setAttribute('href', response.results[i].additional_links[j].href);
                    link.innerText = response.results[i].additional_links[j].text;
                    additionalLinks.appendChild(link);

                    const brake = document.createElement('br');
                    additionalLinks.appendChild(brake);
                }
                result.appendChild(additionalLinks);

                results.appendChild(result);
            }
        })
        .catch(err => console.error(err));
};
