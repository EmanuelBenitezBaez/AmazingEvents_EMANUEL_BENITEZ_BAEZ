
//Obtengo los eventos del json.

async function getEvents(){
  await fetch('../data/amazing.json')
        .then(response=>response.json())
        .then(data=>{
let eventList= data.events 
        
drawEventsStatistics(eventList);

drawUpcomingCategories(eventList)

drawUpcomingCategoriesRevenues(eventList)

drawUpcomingCategoriesAttendance(eventList)

drawPastCategories(eventList)

drawPastRevenues(eventList)

drawPastAttendancesPercentage( eventList)

}).catch(error=>console.error(error));

}
//Llamo a la funcion que obtiene el json.
getEvents()

// Esta función recorre un conjunto de datos de eventos y devuelve el evento con la mayor asistencia en comparación con su capacidad.
function getHighestAttendanceEvent(events) {
  // Utiliza la función reduce para comparar cada evento en el conjunto de datos y devolver el evento con la mayor asistencia en comparación con su capacidad.
  return events.reduce((highestAttendanceEvent, currentEvent) => {
    return (currentEvent.assistance / currentEvent.capacity > highestAttendanceEvent.assistance / highestAttendanceEvent.capacity) ? currentEvent : highestAttendanceEvent;
  }, events[0]);
}

// Esta función recorre un conjunto de datos de eventos y devuelve el evento con la menor asistencia en comparación con su capacidad.
function getLowestAttendanceEvent(events) {
    // Utiliza la función reduce para comparar cada evento en el conjunto de datos y devolver el evento con la menor asistencia en comparación con su capacidad.
  return events.reduce((lowestAttendanceEvent, currentEvent) => {
    return (currentEvent.assistance / currentEvent.capacity < lowestAttendanceEvent.assistance / lowestAttendanceEvent.capacity) ? currentEvent : lowestAttendanceEvent;
  }, events[0]);
}

// Esta función recorre un conjunto de datos de eventos y devuelve el evento con la mayor capacidad.
function getHighestCapacityEvent(events) {
  // Utiliza la función reduce para comparar cada evento en el conjunto de datos y devolver el evento con la mayor capacidad.
  return events.reduce((highestCapacityEvent, currentEvent) => {
    return (currentEvent.capacity > highestCapacityEvent.capacity) ? currentEvent : highestCapacityEvent;
  }, events[0]);
}

//FUNCION QUE MUESTRA EN LA TABLA LOS RESULTADOS DE LA PRIMER TABLA..
function drawEventsStatistics(events) {
  const highestAttendanceEvent = getHighestAttendanceEvent(events);
  document.getElementById("highestAttendance").textContent = highestAttendanceEvent.name;

  const lowestAttendanceEvent = getLowestAttendanceEvent(events);
  document.getElementById("lowestAttendance").textContent = lowestAttendanceEvent.name;

  const highestCapacityEvent = getHighestCapacityEvent(events);
  document.getElementById("highestCapacity").textContent = highestCapacityEvent.name;
}

//FUNCION QUE OBTIENE LAS CATEGORIAS FUTURAS
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

//FUNCION QUE OBTIENE LOS REVENUES FUTUROS
function getUpcomingCategoriesRevenues(arr) {
  const currentDate = new Date();
  const upcomingCategories = arr.filter(item => new Date(item.date) > currentDate)
                                .reduce((acc, item) => {
                                    acc[item.category] = (acc[item.category] || 0) + (item.price * item.estimate);
                                    return acc;
                                }, {});
  return upcomingCategories;
}

//FUNCION QUE OBTIENE LOS PORCENTAJES DE ASISTENCIA FUTURAS
function getUpcomingPercentageAttendance(events) {
  const currentDate = new Date();
  const categoryAttendance = events.filter(event => new Date(event.date) > currentDate)
                                   .reduce((acc, { category, capacity, assistance, estimate }) => {
    const attendance = assistance || estimate;
    acc[category] = acc[category] || { attendance: 0, capacity: 0 };
    acc[category].attendance += attendance;
    acc[category].capacity += capacity;
    return acc;
  }, {});

  for (const category in categoryAttendance) {
    const { attendance, capacity } = categoryAttendance[category];
    categoryAttendance[category] = ((attendance / capacity) * 100).toFixed(2);
  }

  return categoryAttendance;
}

//FUNCION QUE OBTIENE LAS CATEGORIAS 
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
//FUNCION QUE OBTIENE LOS REVENUES PASADOS POR CATEGORIA
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

//FUNCION QUE OBTIENE LOS PORCENTAJES DE ASISTENCIA PASADOS
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
  
    return categoryPercentages ;
  }

const upcomingCategoriesContainer=document.querySelector('.upcomingStatisticsCats')
// Esta función toma un conjunto de datos de eventos y muestra las categorias de cada evento futuro en el html.
function drawUpcomingCategories(events){
  const resultado = getUpcomingCategories(events);
  let td = document.createElement('td');
  for (let item in resultado) {
    let tr = document.createElement('tr');
    tr.innerHTML = resultado[item];
    td.appendChild(tr);
  }
  upcomingCategoriesContainer.appendChild(td);
}

const revenueCategoriesContainer = document.querySelector('.upcomingStatisticsRevenues');
// Esta función toma un conjunto de datos de eventos y muestra los revenues de cada evento futuro por categoria en el html.
function drawUpcomingCategoriesRevenues(events) {
  const resultado = getUpcomingCategoriesRevenues(events);
  let td = document.createElement('td');
  for (let item in resultado) {
    let tr = document.createElement('tr');
    tr.innerHTML = resultado[item];
    td.appendChild(tr);
  }
  revenueCategoriesContainer.appendChild(td);
}

const attendanceCategoriesContainer = document.querySelector('.upcomingStatisticsAttendance');
// Esta función toma un conjunto de datos de eventos y muestra el porcentaje de asistencia de cada evento futuro en un contenedor
// en el html.
function drawUpcomingCategoriesAttendance(events) {
  const resultado = getUpcomingPercentageAttendance(events);
  let td = document.createElement('td');
  for (let item in resultado) {
    let tr = document.createElement('tr');
    tr.innerHTML = resultado[item];
    td.appendChild(tr);
  }
  attendanceCategoriesContainer.appendChild(td);
}

//obtenemos el contenedor html.
const pastCategoriesContainer=document.querySelector('.pastStatisticsCats')
// Esta función toma un conjunto de datos de eventos y muestra las categorias de cada evento pasado en un contenedor en el html.
function drawPastCategories(events){
  const resultado = getPastCategories(events);
  let td = document.createElement('td');
  for (let item in resultado) {
    let tr = document.createElement('tr');
    tr.innerHTML = resultado[item];
    td.appendChild(tr);
  }
  pastCategoriesContainer.appendChild(td);
}

//obtenemos el contenedor del html.
const pastRevenuesContainer=document.querySelector('.pastStatisticsRevenues')
// Esta función toma un conjunto de datos de eventos y muestra los revenues de cada evento pasado en un contenedor en el html.
function drawPastRevenues(events){
  const resultado = getPastRevenuesByCategories(events);
  let td = document.createElement('td');
  for (let item in resultado) {
    let tr = document.createElement('tr');
    tr.innerHTML = resultado[item];
    td.appendChild(tr);
  }
  pastRevenuesContainer.appendChild(td);
}

//obtenemos el contenedor del html
const pastAttendanceContainer=document.querySelector('.pastStatisticsAttendance')
// Esta función toma un conjunto de datos de eventos y muestra el porcentaje de asistencia de cada evento pasado en un contenedor
// en el html.
function drawPastAttendancesPercentage(events){
  // Obtiene los porcentajes de asistencia de los eventos pasados utilizando la función getPastPercentageAttendance.
  const resultado = getPastPercentageAttendance(events);
  // Crea un elemento de celda.
  let td = document.createElement('td');
  // Recorre los resultados de getPastPercentageAttendance y crea una fila para cada resultado.
  for (let item in resultado) {
    let tr = document.createElement('tr');
    tr.innerHTML = resultado[item];
    td.appendChild(tr);
  }
  // Agrega la celda al contenedor de asistencia pasada en la página.
  pastAttendanceContainer.appendChild(td);
}
