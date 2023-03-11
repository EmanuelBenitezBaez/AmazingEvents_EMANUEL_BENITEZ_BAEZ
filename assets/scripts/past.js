import data from "../scripts/amazing.js";
import  {pastEvents,drawCards} from "../scripts/functions.js";

let container = document.getElementById("pastCards");

drawCards(pastEvents(data), container);