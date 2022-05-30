let arrayFromAPI;
let arrayEvents=[];
let eventsPast = []
let eventsUpcoming = []
let categorias=[];
async function getDataFromApi()
{
    await fetch("https://amazing-events.herokuapp.com/api/events")
    
    .then(resp =>resp.json())
    .then(json => arrayFromAPI =json)
    arrayEvents = arrayFromAPI.events
    //console.log(arrayEvents);
    eventsPast.push(...arrayEvents.filter(event=> event.date < arrayFromAPI.currentDate))
    //console.log(eventsPast);
    eventsUpcoming.push(...arrayEvents.filter(event=> event.date > arrayFromAPI.currentDate))
    ///////ARRAY DE EVENTOS PASADOS CON % Y GANANCIASt////////////////////////
    let arrayPast= [];
    eventsPast.filter(event=>arrayPast.push(
        {
        percentage:( (event.assistance*100) / event.capacity ).toFixed(2) ,
        name:event.name, 
        assistance: event.assistance, 
        capacity : event.capacity, 
        category: event.category,
        price: event.price,
        revenues:event.assistance * event.price
    }))
    console.log("Eventos pasados %" ,arrayPast);
///////ARRAY DE EVENTOS FUTUROS CON % Y GANANCIASt////////////////////////
    let arrayUpc= [];
    eventsUpcoming.filter(event=>arrayUpc.push(
        {percentage:( (event.estimate*100) / event.capacity ).toFixed(2) ,
        name:event.name, 
        estimate: event.estimate, 
        capacity : event.capacity, 
        category: event.category,
        price: event.price,
        revenues:event.estimate * event.price
    }))
    console.log("Eventos futuros %" ,arrayUpc);

function tabla1(){
    var listaOrdPast="";
    listaOrdPast= arrayPast.filter(p=> p.percentage).sort((a,b)=> b.percentage - a.percentage)
    //console.log("ordenados por % past",listaOrdPast);
    //console.log(listaOrdPast[0])//mejor porcentaje de asistencia
    //console.log(listaOrdPast[listaOrdPast.length-1])//ultimo de la list 

    //Evento con mayor capacidad
    listaOrdCapacidad="";
    listaOrdCapacidad=arrayEvents.filter(card=>card.capacity).sort((a,b)=> b.capacity - a.capacity)
    //console.log(listaOrdCapacidad);
    //console.log(listaOrdCapacidad[0]);

    var templateTabla1=`
            <tr>
                <td>${listaOrdPast[0].name +" "+ listaOrdPast[0].percentage}%</td>
                <td>${listaOrdPast[listaOrdPast.length-1].name +" "+ listaOrdPast[listaOrdPast.length-1].percentage}%</td>
                <td>${listaOrdCapacidad[0].name +" capacity "+ listaOrdCapacidad[0].capacity }</td>
            </tr>`
    document.querySelector('#tbodyT1').innerHTML = templateTabla1
    }
tabla1()
//////////////Tabla UPC///////////////////////////
function tablaUPC() {
var mapeoCategorias = arrayUpc.map(cat=> cat.category)     
const arrayCategorias = new Set(mapeoCategorias) //creo el array con la lista de categorias no repetidas
categorias = [...arrayCategorias]
//console.log(categorias);
//////////////agrupamos por categoria UPC///////////
let porCategoriaUpc=[];
let ingresosPorcentajes=[];
categorias.forEach(cat=>{
    porCategoriaUpc.push({
        categoria: cat,
        data:arrayUpc.filter(datos=>datos.category ==cat)})})
    console.log("AgrupadosPorCat(upc)",porCategoriaUpc);

    porCategoriaUpc.map(datos => {//cada cat con sus datos
        ingresosPorcentajes.push({
            category: datos.categoria,
            estimate: datos.data.map(item => item.estimate),
            capacity: datos.data.map(item => item.capacity),
            estimateRevenue: datos.data.map(item => item.estimate * item.price)
        })})
        console.log("datosPorCAT(upc)",ingresosPorcentajes);
        ingresosPorcentajes.forEach(cat => {
        let totalEstimate = 0
        cat.estimate.forEach(estimate => totalEstimate += Number(estimate)) //suma de assistencia
        cat.estimate = totalEstimate

        let totalCapacityFut = 0
        cat.capacity.forEach(capacity => totalCapacityFut += Number(capacity)) //suma de capacity
        cat.capacity = totalCapacityFut

        let totalEstimateRevenue = 0
        cat.estimateRevenue.forEach(estimateRevenue => totalEstimateRevenue += Number(estimateRevenue)) //suma de revenue
        cat.estimateRevenue = totalEstimateRevenue

        cat.porcentajeAttendace = ((totalEstimate * 100) / totalCapacityFut).toFixed(2) //le agregamos una nueva propiedad, el calculo de % assistencia total por categoria.
        })
   console.log(ingresosPorcentajes)
   let listOrdCatUpc=""
    listOrdCatUpc =ingresosPorcentajes.filter(cat=>cat.porcentajeAttendace).sort((a,b)=> b.porcentajeAttendace - a.porcentajeAttendace)
    console.log("OrdenadosPorGanancia(upc)",listOrdCatUpc);
    
    var templateTabla2="";
    listOrdCatUpc.forEach(e=>{
        e.listOrdCatUpc
        templateTabla2 += `
    <tr>
    <td>${e.category}</td>
    <td>US$ ${e.estimateRevenue}</td>
    <td>${e.porcentajeAttendace}%</td>
  </tr>`
    document.querySelector('#tbodyT2').innerHTML = templateTabla2
    })
}
tablaUPC()
//////////////Tabla PAST///////////////////////////
function tablaPAST() {
    var mapeoCategorias = arrayPast.map(cat=> cat.category)     
    const arrayCategorias = new Set(mapeoCategorias) //creo el array con la lista de categorias no repetidas
    categorias = [...arrayCategorias]
    //console.log(categorias);
    //////////////agrupamos por categoria PAST///////////
    let porCategoriaPast=[];
    let ingresosPorcentajes=[];
    categorias.forEach(cat=>{
        porCategoriaPast.push({
            categoria: cat,
            data:arrayPast.filter(datos=>datos.category ==cat)})})
        console.log("AgrupadosPorCat(past)",porCategoriaPast);
    
        porCategoriaPast.map(datos => {//cada cat con sus datos
            ingresosPorcentajes.push({
                category: datos.categoria,
                assistance: datos.data.map(item => item.assistance),
                capacity: datos.data.map(item => item.capacity),
                revenue: datos.data.map(item => item.assistance * item.price)
            })})
            console.log("datosPorCAT(past)",ingresosPorcentajes);
            ingresosPorcentajes.forEach(cat => {
            let totalAssistance = 0
            cat.assistance.forEach(assistance => totalAssistance += Number(assistance)) //suma de assistencia
            cat.assistance = totalAssistance
    
            let totalCapacity = 0
            cat.capacity.forEach(capacity => totalCapacity += Number(capacity)) //suma de capacity
            cat.capacity = totalCapacity
    
            let totalRevenue = 0
            cat.revenue.forEach(revenue => totalRevenue += Number(revenue)) //suma de revenue
            cat.revenue = totalRevenue
    
            cat.porcentajeAttendace = ((totalAssistance * 100) / totalCapacity).toFixed(2) //le agregamos una nueva propiedad, el calculo de % assistencia total por categoria.
            })
    console.log(ingresosPorcentajes)
    let listOrdCatPast=""
        listOrdCatPast =ingresosPorcentajes.filter(cat=>cat.porcentajeAttendace).sort((a,b)=> b.porcentajeAttendace - a.porcentajeAttendace)
        console.log("OrdenadosPorGanancia(upc)",listOrdCatPast);
        
        var templateTabla3="";
        listOrdCatPast.forEach(e=>{
            e.listOrdCatUpc
            templateTabla3 += `
        <tr>
        <td>${e.category}</td>
        <td>US$ ${e.revenue}</td>
        <td>${e.porcentajeAttendace}%</td>
      </tr>`
        document.querySelector('#tbodyT3').innerHTML = templateTabla3
        })
    }
    tablaPAST()

}
getDataFromApi()
