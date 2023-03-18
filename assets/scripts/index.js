import data from "./amazing.js";

//ELEMENTOS
const container = document.getElementById('indexCards')
const containerCheck = document.getElementById('checkContainer')
const input = document.getElementById('inputSearch')

//LLAMADA A LAS FUNCIONES
drawEvents(data.events)
createChecks(data.events)

//LISTENERS

input.addEventListener('input', mixFilters)
containerCheck.addEventListener('change', mixFilters)

//MIXEA LOS FILTROS
function mixFilters() {
  let firstFilter = filterByText(data.events, input.value)
  let secondFilter = filterByCheck(firstFilter)
  drawEvents(secondFilter)
}

//FILTRO CHECKS
function filterByCheck(array) {
  let checkboxes = document.querySelectorAll("input[type='checkbox']")

  //Convierte a array para manipularlo
  let arrayChecks = Array.from(checkboxes)
  //Devuelve un array con estado checked y es guardado en arraychecked
  let arrayChecksChecked = arrayChecks.filter(check => check.checked)

  let arrayChecksCheckedValues = arrayChecksChecked.map(checkChecked => checkChecked.value)

  let filteredArray = array.filter(element => arrayChecksCheckedValues.includes(element.category))

  if (arrayChecksChecked.length > 0) {
    return filteredArray
  }
  return array
}

//FILTRAR POR TEXTO
function filterByText(array, text) {
  let arrayFiltered = array.filter(element => element.name.toLowerCase().includes(text.toLowerCase()))
  return arrayFiltered
}

//CREA LOS CHECKS
function createChecks(array) {
  let arrayEvents = array.map(event => event.category)
  //let setEvent= new set(arrayEvents)
  //se utiliza el método filter() para crear un nuevo array que solo contenga los elementos cuyo índice en "arrayEvents" es igual a su índice en el array filtrado  
  let uniqueEvents = arrayEvents.filter((event, index) => {
    return arrayEvents.indexOf(event) === index;

  });

  let checkboxes = ''
  uniqueEvents.forEach(category => {
    checkboxes += `<div class="form-check" id="formCheck">
  <input class="form-check-input checkboxs" name="category" type="checkbox" value="${category}" id=" ${category}" >
  <label class="form-check-label" for=" ${category}">
   ${category}
  </label>
</div>
 `
  });
  containerCheck.innerHTML = checkboxes;
}

//DIBUJA CARDS
function drawEvents(array) {

  if (array.length == 0) {
    container.innerHTML = `<h2 class="display-1 fw-bolder">Event not found.</h2>`;
    return;
  }
  let cards = "";
  for (let i = 0; i < array.length; i++) {
    const events = array[i];
    cards += `
      <div class=" col-sm-6 col-md-4 col-lg-3">
        <div class="card text-light h-100">
          <img src="${events.image}" class="card-img-top img-fluid" alt="${events.name}">
          <div class="card-body">
            <h5 class="card-title">${events.name}</h5>
            <p class="card-text">${events.description}</p>
          </div>
          <div class="card-body d-flex justify-content-between align-items-center">
            <span class="">Price: <span>$</span> ${events.price}</span>
            <a href="../pages/details.html?=id${events._id}" class="card-link">Read More</a>
          </div>
        </div>
      </div>
    `;
  }
  container.innerHTML = cards;
}


