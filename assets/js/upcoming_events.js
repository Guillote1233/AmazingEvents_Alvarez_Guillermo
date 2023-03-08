import data from './data.js';

const cardContainer = document.getElementById('eventCard');
const fragment = document.createDocumentFragment();
const catCheckbox = document.getElementById('filterCat');
const searchValue = document.querySelector('input[placeholder="Search..."]');
const dataEvents = data.events.filter(elem => elem.date > data.currentDate);


function createCard(array, container){
    container.innerHTML = ""
    if(array.length > 0){
        array.forEach(items => {
            let div = document.createElement("div")
            div.className = "card col-lg-2 col-md-3 col-sm-12"
            div.innerHTML += `
                <img src="${items.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${items.name}</h5>
                    <p class="card-text">${items.category}</p>
                    <div class="price">
                        <h6>$ ${items.price}</h6>
                        <a href="../pages/details.html?id=${items._id}" class="btn btn-primary">Details</a>
                    </div>
                </div>`
            fragment.appendChild(div);
            
        });
    }else{
        console.log("no hay datos");
    }
    container.appendChild(fragment);
}

createCard(dataEvents, cardContainer);

function createCategoryList(array){
    let categories = array.map(cat => cat.category);
    categories = categories.reduce((accum, elem) => {
        if(!accum.includes(elem)){
            accum.push(elem);
        }
        return accum;
    },[])
        return categories;
}

let categories = createCategoryList(dataEvents);

function createCheckboxFilter(array, container){
    array.forEach(category => {
        let div = document.createElement('div');
        div.className = `checkbox-container ${category.toLowerCase()}`
        div.innerHTML += `<input type="checkbox" id=${category.toLowerCase()} name="category">
        <label for="${category.toLowerCase()}">${category}</label>`
        container.appendChild(div);
    })
}

createCheckboxFilter(categories, catCheckbox);

function searchFilter(array, value){
    let filterData = array.filter(elem => elem.name.toLowerCase().includes(value.toLowerCase()));
    return filterData;
}

function checkboxFilter(array){
    let checked = document.querySelectorAll('input[type="checkbox"]:checked');
    let filteredList = [];

    if(checked.length > 0){
        for(let i=0; i < checked.length; i++){
            filteredList = filteredList.concat(array.filter(elem => elem.category.toLowerCase().includes(checked[i].id.toLowerCase())))
        }
    }else{
        filteredList = array;
    }
    return filteredList;
}

function filterFinal(array){
    let arrayFiltered = searchFilter(array, searchValue.value);
    arrayFiltered = checkboxFilter(arrayFiltered);
    return arrayFiltered;
}

searchValue.addEventListener('keyup', () => {
    let dataFilter = filterFinal(dataEvents)
    createCard(dataFilter, cardContainer)
})

catCheckbox.addEventListener('change', ()=> {
    let dataFilter = filterFinal(dataEvents)
    createCard(dataFilter, cardContainer)
})