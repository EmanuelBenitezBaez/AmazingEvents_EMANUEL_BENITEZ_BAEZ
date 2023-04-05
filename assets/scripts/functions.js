

// Esta funcion retorna  en un arreglo
// todos los eventos con fecha anterior a current_date de mi lista de eventos
function pastEvents(myData){
    let arrayAux = [];
    //filter(nombreElemento => Condicion de Filtrado)
    arrayAux = myData.events.filter(myEvent => Date.parse(myEvent.date) < Date.parse(myData.currentDate));
    return arrayAux;
};

function futureEvents(myData){
    let arrayAux = [];
    //filter(nombreElemento => Condicion de Filtrado)
    arrayAux = myData.events.filter(myEvent => Date.parse(myEvent.date) > Date.parse(myData.currentDate));
    return arrayAux;
};

/*
//Toma un arreglo de eventos y me lo dibuja en forma de cards dentro de container
function drawCards(arr, container) {

const fragment = document.createDocumentFragment();

for (let i = 0; i < arr.length; i++) {

    let card = document.createElement("div");
    card.className = 'row';
    card.className = " col-sm-6 col-md-4 col-lg-3 ";
    card.innerHTML = ` 
             <div class="card text-light h-100">
                <img src="${arr[i].image}" class="card-img-top img-fluid  " alt="cinema">
                <div class="card-body">
                  <h5 class="card-title">${arr[i].name}</h5>
                  <p class="card-text"> ${arr[i].description}</p>
                </div>
                <div class="card-body d-flex justify-content-between align-items-center">
                  <span class="">Price: <span>$</span> ${arr[i].price}</span>
                  <a href="./pages/details.html" class="card-link"> Read More</a>
                </div>
              </div>
    `;
    fragment.appendChild(card);         
  }
  container.appendChild(fragment);
  }
*/

export {pastEvents, futureEvents};


