import data from "./amazing.js"; 


const cards_templates_upcoming=document.getElementById(`upcomingCards`);
let upcomingCards ='';

function upcomingEvents(events,date){
  
for (let event of events) {
  if(event.date>date){
    upcomingCards += ` 
  
    <div class="col-sm-6 col-md-4 col-lg-3">
    <div class="card text-light h-100">
      <img src="${event.image}" class="card-img-top img-fluid" alt="cinema">
      <div class="card-body">
        <h5 class="card-title">${event.name}</h5>
        <p class="card-text">${event.description}</p>
      </div>
      <div class="card-body d-flex justify-content-between align-items-center ">
        <span class="">Price: <span>$</span> ${event.price}</span>
        <a href="./details.html" class="card-link">Read More</a>
      </div>
    </div>
  </div>

  `;
  }
   

}
return upcomingCards;
}
cards_templates_upcoming.innerHTML = upcomingEvents(data.events,data.currentDate);


