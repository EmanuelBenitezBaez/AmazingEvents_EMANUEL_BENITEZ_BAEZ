
//capturo el contenedor donde se va a mostrar el detalle del evento.
const detailsContainer = document.querySelector("#detailsContainer");

//Obtengo los eventos del json.



async function getEvents(){
  await fetch('../data/amazing.json')
        .then(response=>response.json())
        .then(data=>{
let eventList= data.events 



const queryString = location.search;
const params = new URLSearchParams(queryString);

const eventId = params.get("id");

const event = eventList.find((event) => event._id == eventId);


//LLAMO A LA FUNCION RENDER

renderDetails(event,detailsContainer);

}).catch(error=>console.error(error));

}
//Llamo a la funcion que obtiene el json.
getEvents()

//funcion que dibuja los eventos detallados
function renderDetails(event,container) {
  container.innerHTML=`
  
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

  `
  }