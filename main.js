let type = 'search.php?s=';
let research = [];
let search = document.getElementById('search');
var data = new Date();
var gg, mm, aaaa;
gg = data.getDate();
mm = data.getMonth();
var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

search.addEventListener("keydown", function (e) {
    if (e.code == "Enter") e.preventDefault();
});

// https://www.thecocktaildb.com/api/json/v1/1/random.php

// output random drink home page
fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php/', { method: "GET" })
    .then(response => response.json())
    .then(response => {
        document.getElementById("casualTitle").innerText = response.drinks[0].strDrink;
        document.getElementById("casualDate").innerText = gg + " " + month[mm];
        document.getElementById("casualImg").src = response.drinks[0].strDrinkThumb;
        research[0] = 'www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + response.drinks[0].idDrink + '';
    })
    .catch(err => console.error(err));

fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php/', { method: "GET" })
    .then(response => response.json())
    .then(response => {
        document.getElementById("casualAnalTitle").innerText = response.drinks[0].strDrink;
        document.getElementById("casualAnalDate").innerText = gg + " " + month[mm];
        document.getElementById("casualAnalImg").src = response.drinks[0].strDrinkThumb;
        research[1] = 'www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + response.drinks[0].idDrink + '';
    })
    .catch(err => console.error(err));


function searchType(n) {
    switch (n) {
        case 2:
            type = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
            search.placeholder = 'search by ingredient';
            break;
        case 3:
            type = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';
            search.placeholder = 'search by first letter';
            break;
        default:
            type = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
            search.placeholder = 'search by name';
            break;
    }
}

function ref() {
    location.reload();
}

function popolateCard(e) {
    type = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
    research[2] = type + search.value;
    document.getElementById("mainPage").innerHTML = "";
    document.getElementById("caricamento").className = "dots position-absolute top-50 start-50";
    fetch(type + search.value, { method: "GET" })
        .then(response => response.json())
        .then(response => {
            response.drinks.forEach((element, index) => {
                if (index == 0) {
                    document.getElementById("caricamento").className = null;
                    document.getElementById('tab').innerHTML = null;
                }
                document.getElementById('tab').innerHTML +=
                    `<div class="col">
                            <a data-bs-toggle="modal" data-bs-target="#exampleModal"> 
                            <div class="card h-100" onclick = "popolateModal(`+ index + `)" style="cursor: pointer;">
                            <img id="image` + index + `" class="card-img-top h-45" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title" id="name` + index + `"></h5>
                                    <p class="card-text" id="description` + index + `">This is a longer card with supporting text below as a natural lead-in to
                                        additional content. This content is a little bit longer.</p>
                                </div>
                                <div class="card-footer">
                                    <small id="cardFooter` + index + `" class="text-muted">Last update </small>
                                </div>
                            </div>
                            </a>
                        </div>`;

                console.log(response.drinks[index].strDrink);
                document.getElementById("image" + index).src = response.drinks[index].strDrinkThumb;
                document.getElementById("name" + index).innerText = response.drinks[index].strDrink;
                document.getElementById("description" + index).innerText = response.drinks[index].strAlcoholic;
                document.getElementById("cardFooter" + index).innerText += ' ' + response.drinks[index].dateModified;
            });
        })
        .then(response => console.log(response))
        .catch(err => {
            window.alert('ricerca non trovata');
            location.reload();
        });
}

function popolateModal(n) {

    fetch(research[2], { method: "GET" })
        .then(response => response.json())
        .then(response => {
            document.getElementById('modalTitle').innerText = response.drinks[n].strDrink;
            document.getElementById('strCategory').innerText = "Category: " + response.drinks[n].strCategory;
            document.getElementById('strGlass').innerText = "Glass: " + response.drinks[n].strGlass;
            document.getElementById('guide').innerText = response.drinks[n].strInstructions;
            var i = 1;
            switch (i) {
                case 1:
                    if (response.drinks[n].strIngredient1 == null) break;
                    document.getElementById('tBody').innerHTML =
                        `<tr>
                        <th scope="row">1</th>
                        <td id="drinkType1"></td>
                        <td id="drinkTypeQuantity1"></td>
                        </tr>`;
                    document.getElementById('drinkType1').innerText = response.drinks[n].strIngredient1;
                    document.getElementById('drinkTypeQuantity1').innerText = response.drinks[n].strMeasure1;
                case 2:
                    if (response.drinks[n].strIngredient2 == null) break;
                    document.getElementById('tBody').innerHTML +=
                        `<tr>
                        <th scope="row">2</th>
                        <td id="drinkType2"></td>
                        <td id="drinkTypeQuantity2"></td>
                        </tr>`;
                    document.getElementById('drinkType2').innerText = response.drinks[n].strIngredient2;
                    document.getElementById('drinkTypeQuantity2').innerText = response.drinks[n].strMeasure2;
                case 3:
                    if (response.drinks[n].strIngredient3 == null) break;
                    document.getElementById('tBody').innerHTML +=
                        `<tr>
                        <th scope="row">3</th>
                        <td id="drinkType3"></td>
                        <td id="drinkTypeQuantity3"></td>
                        </tr>`;
                    document.getElementById('drinkType3').innerText = response.drinks[n].strIngredient3;
                    document.getElementById('drinkTypeQuantity3').innerText = response.drinks[n].strMeasure3;
                case 4:
                    if (response.drinks[n].strIngredient4 == null) break;
                    document.getElementById('tBody').innerHTML +=
                        `<tr>
                            <th scope="row">4</th>
                            <td id="drinkType4"></td>
                            <td id="drinkTypeQuantity4"></td>
                            </tr>`;
                    document.getElementById('drinkType4').innerText = response.drinks[n].strIngredient4;
                    document.getElementById('drinkTypeQuantity4').innerText = response.drinks[n].strMeasure4;
                case 5:
                    if (response.drinks[n].strIngredient5 == null) break;
                    document.getElementById('tBody').innerHTML +=
                        `<tr>
                        <th scope="row">5</th>
                        <td id="drinkType5"></td>
                        <td id="drinkTypeQuantity5"></td>
                        </tr>`;
                    document.getElementById('drinkType5').innerText = response.drinks[n].strIngredient5;
                    document.getElementById('drinkTypeQuantity5').innerText = response.drinks[n].strMeasure5;
                case 6:
                    if (response.drinks[n].strIngredient6 == null) break;
                    document.getElementById('tBody').innerHTML +=
                        `<tr>
                        <th scope="row">6</th>
                        <td id="drinkType6"></td>
                        <td id="drinkTypeQuantity6"></td>
                        </tr>`;
                    document.getElementById('drinkType6').innerText = response.drinks[n].strIngredient6;
                    document.getElementById('drinkTypeQuantity6').innerText = response.drinks[n].strMeasure6;
                case 7:
                    if (response.drinks[n].strIngredient7 == null) break;
                    document.getElementById('tBody').innerHTML +=
                        `<tr>
                        <th scope="row">7</th>
                        <td id="drinkType7"></td>
                        <td id="drinkTypeQuantity7"></td>
                        </tr>`;
                    document.getElementById('drinkType7').innerText = response.drinks[n].strIngredient7;
                    document.getElementById('drinkTypeQuantity7').innerText = response.drinks[n].strMeasure7;
                case 8:
                    if (response.drinks[n].strIngredient8 == null) break;
                    document.getElementById('tBody').innerHTML +=
                        `<tr>
                        <th scope="row">8</th>
                        <td id="drinkType8"></td>
                        <td id="drinkTypeQuantity8"></td>
                        </tr>`;
                    document.getElementById('drinkType8').innerText = response.drinks[n].strIngredient8;
                    document.getElementById('drinkTypeQuantity8').innerText = response.drinks[n].strMeasure8;
                default:
                    document.getElementById('tBody').innerHTML +=
                        `<tr>
                        <th scope="row">1</th>
                        <td id="drinkType"></td>
                        <td id="drinkTypeQuantity"></td>
                        </tr>`;
                    document.getElementById('drinkType').innerText = 'nessun elemento';
                    document.getElementById('drinkTypeQuantity').innerText = 'nessun elemento';
                    break;
            }
        })
        .catch(err => console.error(err))
}