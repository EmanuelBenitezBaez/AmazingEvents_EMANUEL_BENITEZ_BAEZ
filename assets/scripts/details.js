
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
                      <div class="box">
                        <h5 class="card-title ">${events.title}</h5>
                        <ul>
                          <li class="card-text">Name: ${events._id}</li>
                          <li class="card-text">Date:${events.date}</li>
                          <li class="card-text">Description: ${events.description}</li>
                          <li class="card-text">Category: ${events.category}</li>
                          <li class="card-text">Place: ${events.place}</li>
                          <li class="card-text">Capacity: ${events.capacity}</li>
                          <li class="card-text">Assistance:${events.assistance ? "Asistence" : "Estimate"}</li>
                          <li class="card-text">Estimate:${events.assistance ? events.assistance : events.estimate}</li>
                          <li class="card-text">Price:${events.price}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  </div>
                  
                  `
                  return container.appendChild(div);
  }
  drawDetails(data.events,detailsContainer)