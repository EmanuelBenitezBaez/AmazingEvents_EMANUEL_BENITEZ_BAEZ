
import data from "./amazing.js"


console.log(drawDetails);
const queryString = location.search;
const params = new URLSearchParams(queryString);
const eventsId = params.get('id'); 
const events = data.events.find(event => event._id == eventsId);

let detailsContainer = document.getElementById('detailsContainer');

//DETAILS

  function drawDetails(events, container) {
      let div = document.createElement('div');
      div.className = 'cardDetails';
      div.innerHTML = `
                  <div class="row g-2">
                  <div class="col-12 col-md-6 ">
                    <img class="img-fluid h-100 " src="${events.image}" alt="${events.name}">
                  </div>
                  <div class="col-12 col-md-6">
                    <div class="card-body h-100 card-data">
                    <div class="box w-100">
                    <h5 class="card-title ">${events.title}</h5>
                    <p class="card-text">Name:${events._id}</p>
                    <p class="card-text">Date: ${events.date}</p>
                    <p class="card-text">Description:${events.description}.</p>
                    <p class="card-text">Category:${events.category} </p>
                    <p class="card-text">Place:${events.place}</p>
                    <p class="card-text">Capacity: ${events.capacity}</p>
                    <p class="card-text">Asistance: ${events.assistance ? "Asistence" : "Estimate"}</p>
                    <p class="card-text">Estimate:${events.assistance ? events.assistance : events.estimate}</p>
                    <p class="card-text">Price:${events.price}</p>
                    <div class="d-flex pt-2">
      <a href="javascript:history.back()" class="d-flex text-decoration-none  ">Go Back</a>
      </div>
                  </div>
                    </div>
                  </div>
                  </div>
                  `
                  return container.appendChild(div);
  }
  drawDetails(data.events,detailsContainer)
