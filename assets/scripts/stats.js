


//Obtengo los eventos del json.

async function getEvents(){
  await fetch('../data/amazing.json')
        .then(response=>response.json())
        .then(data=>{
let eventList= data.events 
        
        //Aca llamo mis funciones.
//muestra por consola el evento con mayor asistencia
       console.log(getHighestAttendanceEvent(eventList));; 
//muestra por consola el evento con menor asistencia
console.log(getLowestAttendanceEvent(eventList));; 
//muestra por consola el evento con mayor capacity
console.log(getHighestCapacityEvent(eventList));;
//llamo a la function que devuelve los datos a la tabla.
updateEventsStatistics(eventList);

console.log(getUpcomingCategories(eventList));

console.log(getUpcomingCategoriesRevenues(eventList));

console.log(getUpcomingPercentageAttendance(eventList));
///////////////////

//DEVUELVE LAS CATEGORIAS PASADAS
console.log(getPastCategories(eventList));
//DEVUELVE LOS REVENUES PASADOS
console.log(getPastRevenuesByCategories(eventList));
//DEVUELVE LOS PORCENTAJES PASADOS
console.log(getPastPercentageAttendance(eventList));

}).catch(error=>console.error(error));

}
//Llamo a la funcion que obtiene el json.
getEvents()



/////////////////////////////////


//FUNCION QUE OBTIENE EL EVENTO CON MAYOR PORCENTAJE DE ASISTENCIA .
function getHighestAttendanceEvent(events) {
  return events.reduce((highestAttendanceEvent, currentEvent) => {
    return (currentEvent.assistance / currentEvent.capacity > highestAttendanceEvent.assistance / highestAttendanceEvent.capacity) ? currentEvent : highestAttendanceEvent;
  }, events[0]);
}

//FUNCION QUE OBTIENE EL EVENTO CON EL MENOR PORCENTAJE DE ASISTENCIA.

function getLowestAttendanceEvent(events) {
  return events.reduce((lowestAttendanceEvent, currentEvent) => {
    return (currentEvent.assistance / currentEvent.capacity < lowestAttendanceEvent.assistance / lowestAttendanceEvent.capacity) ? currentEvent : lowestAttendanceEvent;
  }, events[0]);
}

//   FUNCION QUE OBTIENE EL EVENTO CON MAYOR CAPACIDAD.

function getHighestCapacityEvent(events) {
  return events.reduce((highestCapacityEvent, currentEvent) => {
    return (currentEvent.capacity > highestCapacityEvent.capacity) ? currentEvent : highestCapacityEvent;
  }, events[0]);
}

//FUNCION QUE MUESTRA EN LA TABLA LOS RESULTADOS DE LOS EVENTOS.

function updateEventsStatistics(events) {
  const highestAttendanceEvent = getHighestAttendanceEvent(events);
  document.getElementById("highestAttendance").textContent = highestAttendanceEvent.name;

  const lowestAttendanceEvent = getLowestAttendanceEvent(events);
  document.getElementById("lowestAttendance").textContent = lowestAttendanceEvent.name;

  const highestCapacityEvent = getHighestCapacityEvent(events);
  document.getElementById("highestCapacity").textContent = highestCapacityEvent.name;
}

////////////////////////////////////////////

//UPCOMINGS EVENTS STATISTICS BY CATEGORY

//FUNCION QUE OBTIENE LAS CATEGORIAS DE LOS EVENTOS SIN REPETIR.

//UPCOMING CATEGORIES
function getUpcomingCategories(events) {
  const currentDate = new Date();
  const categories = [];

  events.forEach((item) => {
    const itemDate = new Date(item.date);
    if (itemDate > currentDate && !categories.includes(item.category)) {
      categories.push(item.category);
    }
  });

  return categories;
}
//UPCOMING REVENUES
function getUpcomingCategoriesRevenues(arr) {
  const currentDate = new Date();
  const nextCategories = {};
  for (let i = 0; i < arr.length; i++) {
    const category = arr[i].category;
    const date = new Date(arr[i].date);
    if (date > currentDate) {
      if (!nextCategories[category]) {
        nextCategories[category] = 0;
      }
      nextCategories[category] += arr[i].price * arr[i].estimate;
    }
  }
  return nextCategories;
}

// UPCOMING PERCENTAGE  ATTENDANCE
function getUpcomingPercentageAttendance(events) {
  let categoryAttendance = {};
  events.forEach(event => {
    const currentDate = new Date();
    const eventDate = new Date(event.date);
    if (eventDate > currentDate) {
      const category = event.category;
      const capacity = event.capacity;
      const attendance = event.assistance ? event.assistance : event.estimate;
      if (!categoryAttendance[category]) {
        categoryAttendance[category] = {
          attendance: 0,
          capacity: 0
        };
      }
      categoryAttendance[category].attendance += attendance;
      categoryAttendance[category].capacity += capacity;
    }
  });

  const categoryPercentages = {};
  for (const category in categoryAttendance) {
    const attendance = categoryAttendance[category].attendance;
    const capacity = categoryAttendance[category].capacity;
    const percentage = ((attendance / capacity) * 100).toFixed(2);
    categoryPercentages[category] = percentage;
  }

  return categoryPercentages;
}

////////////////////////////////////////////

//PAST EVENTS STATISTICS BY CATEGORY

//PAST CATEGORIES
function getPastCategories(events) {
  const currentDate = new Date();
  const categories = [];

  events.forEach((item) => {
    const itemDate = new Date(item.date);
    if (itemDate < currentDate && !categories.includes(item.category)) {
      categories.push(item.category);
    }
  });

  return categories;
}
//PAST REVENUES

function getPastRevenuesByCategories(events) {
  const revenueByCategory = {};
  events.forEach(event => {
  if (event.category && event.assistance >= 0 && event.price >= 0 && typeof event.price === 'number') {
  if (revenueByCategory[event.category]) {
  revenueByCategory[event.category] += (event.assistance * event.price);
  } else {
  revenueByCategory[event.category] = (event.assistance * event.price);
  }
  }
  });
  return revenueByCategory;
  }

//PAST PERCENTAGE  ATTENDANCE 

  function getPastPercentageAttendance(events) {
    let categoryAttendance = {};
    events.forEach(event => {
      const currentDate = new Date();
      const eventDate = new Date(event.date);
      if (eventDate < currentDate) {
        const category = event.category;
        const capacity = event.capacity;
        const attendance = event.assistance ? event.assistance : event.estimate;
        if (!categoryAttendance[category]) {
          categoryAttendance[category] = {
            attendance: 0,
            capacity: 0
          };
        }
        categoryAttendance[category].attendance += attendance;
        categoryAttendance[category].capacity += capacity;
      }
    });
  
    const categoryPercentages = {};
    for (const category in categoryAttendance) {
      const attendance = categoryAttendance[category].attendance;
      const capacity = categoryAttendance[category].capacity;
      const percentage = ((attendance / capacity) * 100).toFixed(2);
      categoryPercentages[category] = percentage;
    }
  
    return categoryPercentages;
  }
