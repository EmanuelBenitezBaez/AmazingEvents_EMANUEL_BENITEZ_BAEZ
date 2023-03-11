


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




/***SEARCH***/ 

// obtener la entrada de búsqueda del usuario
const formulario = document.getElementById('formSearch');

formulario.addEventListener('submit', (event) => {
  event.preventDefault();
// ordenar y pasar a minúsculas la cadena de búsqueda
  let text= document.getElementById('inputSearch').value.trim().toLowerCase();

// filtrar los eventos que coinciden con la cadena que se busca
const filteredEvents = data.events.filter(event => event.name.toLowerCase().includes(text));
//Cuando ingresa un evento que no existe
if (filteredEvents.length === 0) {
  const modal = document.getElementById('modal');
  modal.classList.add('show');
  modal.style.display = 'block';
//modal que devuelve el mensaje de algo salio mal
  const closeModalButton = document.querySelector('#modal, #modal, .btn-secondary');
  closeModalButton.addEventListener('click', () => {
    modal.classList.remove('show');
    modal.style.display = 'none';
  });

  return;
}



// mostrar los eventos filtrados

const eventList = document.getElementById("indexCards");
indexCards.innerHTML = "";
filteredEvents.forEach(event => {
  const div = document.createElement("div");
  div.className = 'row';
  div.className = "col-sm-6 col-md-4 col-lg-3 ";
  div.innerHTML = ` 
           <div class="card text-light">
              <img src="${event.image}" class="card-img-top img-fluid  " alt="${event.name}">
              <div class="card-body">
                <h5 class="card-title">${event.name}</h5>
                <p class="card-text"> ${event.description}</p>
              </div>
              <div class="card-body d-flex justify-content-between align-items-center">
                <span class="">Price: <span>$</span> ${event.price}</span>
                <a href="./pages/details.html" class="card-link"> Read More</a>
              </div>
            </div>
  `;
  eventList.appendChild(div);
});

});






export {pastEvents, futureEvents, drawCards};






