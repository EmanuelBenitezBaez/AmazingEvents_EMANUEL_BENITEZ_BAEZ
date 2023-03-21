/*
import data from "./amazing.js"

const queryString = location.search;
const params = new URLSearchParams(queryString);
const eventId = params.get("id"); 
const event = data.events.find(event => event._id == eventId);

let detailsContainers = document.querySelector('#detailsContainer');

//DETAILS

///


//Funcion toma un evento y un contenedor y dibuja la info del evento.
  function drawDetails(event, container) {
      let div = document.createElement('div');
      div.className = 'detailsContainers';
      div.innerHTML= `
                  <div class="row g-2">
                  <div class="col-12 col-md-6 ">
                    <img class="img-fluid h-100 " src="${event.image}" alt="${event.name}">
                  </div>
                  <div class="col-12 col-md-6">
                    <div class="card-body h-100 card-data">
                    <div class="box w-100">
                    <h5 class="card-title ">${event.name}</h5>
                    <p class="card-text">Name:${event._id}</p>
                    <p class="card-text">Date: ${event.date}</p>
                    <p class="card-text">Description:${event.description}.</p>
                    <p class="card-text">Category:${event.category} </p>
                    <p class="card-text">Place:${event.place}</p>
                    <p class="card-text">Capacity: ${event.capacity}</p>
                    <p class="card-text">Asistance: ${event.assistance ? "Asistence" : "Estimate"}</p>
                    <p class="card-text">Estimate:${event.assistance ? event.assistance : event.estimate}</p>
                    <p class="card-text">Price:${event.price}</p>
                    <div class="d-flex pt-2">
      <a href="javascript:history.back()" class="d-flex text-decoration-none  ">Go Back</a>
      </div>
                  </div>
                    </div>
                  </div>
                  </div>
                  `
                  
                   container.appendChild(div);
  }
  drawDetails(event,detailsContainers)
  */
/////////


const queryString = location.search;
const params = new URLSearchParams(queryString);
const eventId = params.get("id");

async function fetchEventData() {
  const response = await fetch("../data/amazing.json");
  const data = await response.json();
  const event = data.events.find((event) => event._id == eventId);
  return event;
}

let detailsContainer = document.querySelector("#detailsContainer");

async function renderDetails() {
  const event = await fetchEventData();
  let div = document.createElement("div");
  div.className = "detailsContainers";
  div.innerHTML = `
    <div class="row g-2">
      <div class="col-12 col-md-6">
        <img class="img-fluid h-100 " src="${event.image}" alt="${event.name}">
      </div>
      <div class="col-12 col-md-6">
        <div class="card-body h-100 card-data">
          <div class="box w-100">
            <h5 class="card-title ">${event.name}</h5>
            <p class="card-text">Date: ${event.date}</p>
            <p class="card-text">Description:${event.description}.</p>
            <p class="card-text">Category:${event.category} </p>
            <p class="card-text">Place:${event.place}</p>
            <p class="card-text">Capacity: ${event.capacity}</p>
            <p class="card-text">Assistance: ${event.assistance ? "Assistance" : "Estimate"}</p>
            <p class="card-text">Estimate:${event.assistance ? event.assistance : event.estimate}</p>
            <p class="card-text">Price:${event.price}</p>
            <div class="d-flex pt-2">
              <a href="javascript:history.back()" class="d-flex text-decoration-none  ">Go Back</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  detailsContainer.appendChild(div);
}

renderDetails(event,detailsContainer);
