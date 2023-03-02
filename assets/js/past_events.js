import data from './data.js';

let cardContainer = document.getElementById('eventCard');
const fragment = document.createDocumentFragment();
const currentDate = data.currentDate;

function createCard(array, container){
    for(let items of array){
        if (currentDate > items.date){
            let div = document.createElement("div")
            div.className = "card col-lg-2 col-md-3 col-sm-12"
            div.innerHTML += `
                <img src="${items.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${items.name}</h5>
                    <p class="card-text">${items.category}</p>
                    <div class="price">
                        <h6>$ ${items.price}</h6>
                        <a href="../pages/details.html" class="btn btn-primary">Details</a>
                    </div>
                </div>`
            fragment.appendChild(div);
        }
    }
    container.appendChild(fragment);
}

function createCategoryFilter(){
    const categories = data.events.map(cat => cat.category);
    const finalCategories = categories.filter((item, index) => {
        return categories.indexOf(item) === index
    }); 
    
    let catContainer = document.getElementById('filterCat');
    const catFragment = document.createDocumentFragment();
    
    for(let items of finalCategories){
        let label = document.createElement('label')
        label.textContent = items
        label.setAttribute("for", items.split(" ").join("").toLowerCase())
        label.innerHTML += `<input type="checkbox" name="cat" id=${items.split(" ").join("").toLowerCase()}>`
        catFragment.appendChild(label);
    }
    
    catContainer.appendChild(catFragment);
}

createCard(data.events, cardContainer);
createCategoryFilter();