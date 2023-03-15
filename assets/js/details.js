const backgroundLoader = document.getElementById('back-loader');
const loader = document.getElementById('spinner');

const showLoader = () => {
    backgroundLoader.classList.remove('d-none');
    loader.classList.add('spinner-border');
};

const hideLoader = () => {
    backgroundLoader.classList.add('d-none')
    loader.classList.remove('spinner-border');
};

let data = [];

async function getData() {
    try {
        const apiUrl = "../assets/js/amazing.json";
        const response = await fetch(apiUrl);
        const json = await response.json();
        data = json;
        hideLoader();
        const eventDetail = data.events.find(item => item._id == id);
        const div = document.querySelector('.detailContainer');
        div.innerHTML = `
        <div class="imgContainer">
        <img src="${eventDetail.image}" alt="img${eventDetail.name}">
        </div>
        <div class="descriptionContainer">
        <h2>${eventDetail.name}</h2>
        <h5>${eventDetail.category}</h5>
        <p>${eventDetail.description}</p>
        <div class="dateContainer">
        <h5>Date: ${eventDetail.date}</h5>
        <h5>Capacity: ${eventDetail.capacity}</h5>
        </div>
        </div>`
    } catch (error) {
        console.log(error);
    }
}
const queryString = location.search;
const params = new URLSearchParams(queryString);
const id = params.get('id');

showLoader();
getData();



