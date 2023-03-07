import data from "../scripts/amazing.js";

function searchPast(){
    let pastEventAux = [];
    for (let i = 0; i < data.events.length; i++) {
        if(data.events[i].date < data.currentDate){
            pastEventAux.push(data.events[i]);
        }
    }
    return pastEventAux;
}
const eventsPast = document.getElementById('pastCards');
let fragment= document.createDocumentFragment();
let pastEvents = [];

console.log(pastEvents=searchPast());

for (let event of pastEvents){
    let div = document.createElement('div');
    
    div.className = 'row';
  div.className = "col-sm-6 col-md-4 col-lg-3 ";
    div.innerHTML=  `
  
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
    </div>
` ;
    fragment.appendChild(div);
}

eventsPast.appendChild(fragment);


