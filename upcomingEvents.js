var checkboxsElegidos =[] //guardo los checksElegidos
var searchSelect = "" //guardo lo que haya en el buscador


let arrayFromAPI;
let arrayEvents=[];
async function getDataFromApi()
{
    await fetch("https://amazing-events.herokuapp.com/api/events")
    
    .then(resp =>resp.json())
    .then(json => arrayFromAPI =json)
    arrayEvents = arrayFromAPI.events
console.log(arrayFromAPI);


function creadorDeChecks() {
    var contenedorCheckbox = document.getElementById("contenedorCheckbox")//llamo a los chekcs
    var mapeoCategorias = arrayEvents.map(cat=> cat.category)
    const arrayCategorias = new Set(mapeoCategorias) //creo el array con la lista de categorias no repetidas
    var categorias = [...arrayCategorias] // la lista anterior la guardo en la variable categorias
    
    var inputCheck= ""
    categorias.forEach(category => { //creo los checks con las categorias guardadas
        inputCheck +=` 
        <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="${category}">
        <label class="form-check-label" for="inlineCheckbox">${category}</label>
        </div>` 
    })
    contenedorCheckbox.innerHTML = inputCheck

}
creadorDeChecks()
var checkbox = document.querySelectorAll('input[type=checkbox]')
checkbox.forEach(check => check.addEventListener("click", (event)=> {
    var checked = event.target.checked

    if (checked) { //Establezcon un condicional que verifica si la propiedad/atributo checked del elemento html, es true o false, es decir si esta tildado o no el checkbox
        checkboxsElegidos.push(event.target.value) //Si esta tildado lo empujo lo guardo dentro de la variable local declarada anteriormente
        filterArray()//LLamo y les paso el parametro a la funcion que se ocupara del filtrado dl array
    } else {
        checkboxsElegidos = checkboxsElegidos.filter(uncheck => uncheck !== event.target.value) //Este metodo lo utilizo para quitar del array en checkbox deschequeado
        filterArray()//LLamo y les paso el parametro a la funcion que se ocupara del filtrado dl array

    } //En el caso que el checkbox sea destildado es decir pase de true a false, le  aplico a la varible checkboxSelected un filtros en el cual 
}))

var inputSearch = document.getElementById("inputSearch")
inputSearch.addEventListener("keyup", (event) => {
    searchSelect = event.target.value
    filterArray()
})

function filterArray() {
    let datos = []
    if (checkboxsElegidos.length > 0 && searchSelect !== "") {
        checkboxsElegidos.map(cat => {
            datos.push(...arrayEvents.filter(card => card.name.toLowerCase().includes(searchSelect.trim().toLowerCase())  &&
                card.category == cat))
        })
    }
    else if (checkboxsElegidos.length > 0 && searchSelect === "") {
        checkboxsElegidos.map(cat => datos.push(...arrayEvents.filter(card => card.category == cat)))
    }
    else if (checkboxsElegidos.length == 0 && searchSelect !== "") {
        datos.push(...arrayEvents.filter(card => card.name.toLowerCase().includes(searchSelect.trim().toLowerCase())))
    }
    else { datos.push(...arrayEvents) }
    
    // if (datos.length > 0) {
    //     displayCardEventos(datos)
    // }
    // else
    // {
    //     var sinResultados =`<img class= "imgError" src="./img/noEntiendo.jpg" alt="logo">`;
    //     document.querySelector('#contenedorCartas').innerHTML = sinResultados
    //     console.log(datos);
    // }
    displayCardEventos(datos)
    //CardUpcoming(datos)
}
filterArray()


function displayCardEventos(datos) {
    var templateCartas= ""
    for (var i = 0; i < datos.length; i++) {
        if (arrayFromAPI.currentDate < datos[i].date) {

        templateCartas +=`
        <div class="col-12 col-md-6 col-xl-4 col-xxl-3">
            <div class="card" > 
                <img class="imagenCartas" src="${datos[i].image}">
                <div class="card-body d-flex flex-column  justify-content-between">
                    <h5 class="card-title">${datos[i].name}</h5>
                    <p class="card-text">${datos[i].description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class= "footerCard">
                            <p class="card-text"><b>${datos[i].date}</b></p>
                            <p class="card-text"><b>${datos[i].price}usd</b></p>
                        </div>
                        <a class="btn btn-outline-info" href="details.html?id=${datos[i]._id}">Details</a>
                    </div>
                </div>
            </div>
        </div> `
        
    }}
    if (templateCartas.length > 0) {
        document.querySelector('#contenedorCartas').innerHTML = templateCartas
    }
    else
    {
        var sinResultados =`<img class= "imgError" src="./img/no-search-found.png" alt="SinResultados">`;
        document.querySelector('#contenedorCartas').innerHTML = sinResultados
        console.log(datos);
    }
    
}
}
getDataFromApi()
