import data from './data.js'

const queryString = location.search;
const params = new URLSearchParams(queryString);
const id = params.get('id');

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