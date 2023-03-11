import data from "./amazing.js"; 

import  {futureEvents,drawCards} from "./functions.js";

let container = document.getElementById("upcomingCards");

drawCards(futureEvents(data), container);
