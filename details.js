let arrayFromAPI;
let arrayEvents=[];
async function getDataFromApi()
{
    await fetch("https://amazing-events.herokuapp.com/api/events")
    
    .then(resp =>resp.json())
    .then(json => arrayFromAPI =json)
    arrayEvents = arrayFromAPI.events


function cardDetails() {
    var idCard = 1
    arrayEvents.map(card =>card.id = idCard++) //asigno un ID a cada card
    //El método split() divide un objeto de tipo String en un array (vector) de cadenas mediante la separación de la cadena en subcadenas.
    var id = location.search.split("?id=").filter(String) //filtra el id de la location
    console.log(location)
    console.log(location.search)
    console.log(id)
    //Usamos el método Array.find() para encontrar el primer elemento que cumple cierta condición. Tal como el método anterior, toma un Callback como argumento y devuelve el primer elemento que cumpla la condición establecida.
    var cartaElejida = arrayEvents.find((card) =>{
        return card._id == id
        
    })
    console.log(cartaElejida)
    var templateHtml = `    
    <div class="card cardDetails" >
          <div class="row g-0 d-flex  justify-content-center">
            <div class="col-md-6 d-flex justify-content-center ">
              <img src="${cartaElejida.image}" class="img-thumbnail rounded-start" alt="imgCard">
            </div>
            <div class="col-md-6">
              <div class="card-body">
                <h5 class="card-title">${cartaElejida.name}</h5>
                <p class="card-text">${cartaElejida.description}</p>
                <p class="card-text"><b>Category: </b>${cartaElejida.category}</p>
                <p class="card-text"><b>Date: </b>${cartaElejida.date}</p>
                <p class="card-text"><b>Place: </b>${cartaElejida.place}</p>
                <p class="card-text"><b>Capacity: </b>${cartaElejida.capacity}</p>
                <p class="card-text"><b>Price: </b>${cartaElejida.price} USD</p>
                
                
              </div>
            </div>
          </div>
        </div>
    `
    document.querySelector('#contenedorDetails').innerHTML = templateHtml
}

cardDetails()
}
getDataFromApi()