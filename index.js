
import data from "../assets/scripts/amazing.js";

const cards_templates = document.getElementById(`indexCards`);
const fragment = document.createDocumentFragment();

data.events.forEach(events => {
  const div = document.createElement("div");
  div.className = 'row';
  div.className = "col-sm-6 col-md-4 col-lg-3 ";
  div.innerHTML = ` 
           <div class="card text-light">
              <img src="${events.image}" class="card-img-top img-fluid  " alt="cinema">
              <div class="card-body">
                <h5 class="card-title">${events.name}</h5>
                <p class="card-text"> ${events.description}</p>
              </div>
              <div class="card-body d-flex justify-content-between align-items-center">
                <span class="">Price: <span>$</span> ${events.price}</span>
                <a href="./pages/details.html" class="card-link"> Read More</a>
              </div>
            </div>
  `;
  fragment.appendChild(div);
});
cards_templates.appendChild(fragment);

