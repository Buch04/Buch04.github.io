let type = 'search.php?s=';
let research;
let search = document.getElementById('search');

// https://www.thecocktaildb.com/api/json/v1/1/random.php

function searchType(n) {
    switch (n) {
        case 2:
            type = 'filter.php?i=';
            search.placeholder = 'search by ingredient';
            break;
        case 3:
            type = 'search.php?f=';
            search.placeholder = 'search by first letter';
            break;
        default:
            type = 'search.php?s=';
            search.placeholder = 'search by name';
            break;
    }
}


function popolateCard() {
    var i = 0;
    research = 'https://www.thecocktaildb.com/api/json/v1/1/' + type + search.value + '';
    document.getElementById("caricamento").className = "dots position-absolute top-50 start-50";
    fetch('https://www.thecocktaildb.com/api/json/v1/1/' + type + search.value + '', { method: "GET" })
        .then(response => response.json())
        .then(response => {
            response.drinks.forEach((element, index) => {
                if (index == 0) {
                    document.getElementById("caricamento").className = "";
                    document.getElementById('tab').innerHTML =
                        `<div class="col">
                            <div class="card h-100" onclick = "popolateModal(`+ index + `)" >
                            <a data-bs-toggle="modal" data-bs-target="#exampleModal"> 
                            <img id="image` + index + `" class="card-img-top h-45" alt="...">
                            </a>
                                <div class="card-body">
                                    <h5 class="card-title" id="name` + index + `"></h5>
                                    <p class="card-text" id="description` + index + `">This is a longer card with supporting text below as a natural lead-in to
                                        additional content. This content is a little bit longer.</p>
                                </div>
                                <div class="card-footer">
                                    <small id="cardFooter` + index + `" class="text-muted">Last update </small>
                                </div>
                            </div>
                        </div>`;

                    document.getElementById("image" + index).src = response.drinks[index].strDrinkThumb;
                    document.getElementById("name" + index).innerText = response.drinks[index].strDrink;
                    document.getElementById("description" + index).innerText = response.drinks[index].strAlcoholic;
                    document.getElementById("cardFooter" + index).innerText += ' ' + response.drinks[index].dateModified;
                } else {
                    document.getElementById('tab').innerHTML +=
                        `<div class="col">
                            <div class="card h-100" onclick = "popolateModal(`+ index + `)" >
                            <a data-bs-toggle="modal" data-bs-target="#exampleModal"> 
                            <img id="image` + index + `" class="card-img-top h-45" alt="...">
                            </a>
                                <div class="card-body">
                                    <h5 class="card-title" id="name` + index + `"></h5>
                                    <p class="card-text" id="description` + index + `">This is a longer card with supporting text below as a natural lead-in to
                                        additional content. This content is a little bit longer.</p>
                                </div>
                                <div class="card-footer">
                                    <small id="cardFooter` + index + `" class="text-muted">Last update </small>
                                </div>
                            </div>
                        </div>`;

                    console.log(response.drinks[index].strDrink);
                    document.getElementById("image" + index).src = response.drinks[index].strDrinkThumb;
                    document.getElementById("name" + index).innerText = response.drinks[index].strDrink;
                    document.getElementById("description" + index).innerText = response.drinks[index].strAlcoholic;
                    document.getElementById("cardFooter" + index).innerText += ' ' + response.drinks[index].dateModified;
                }
            });

        })
        .catch(err => console.error(err));

}

function popolateModal(n) {
    fetch(research, { method: "GET" })
        .then(response => response.json())
        .then(response => {
            document.getElementById('modalTitle').innerText = response.drinks[n].strDrink;

        })
        .catch(err => console.error(err));
}