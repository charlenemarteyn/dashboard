"use strict"

//Navigation 
function openPage(pageName, elmnt, color) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
    }
    document.getElementById(pageName).style.display = "block";
    elmnt.style.backgroundColor = color;

}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

let data;
let welcome = document.getElementById("welcomeText");

window.addEventListener("DOMContentLoaded", getMyData)
window.addEventListener("DOMContentLoaded", addDefaultListItems)

// Calls the funcion getMyData every 1 second
setInterval(getMyData, 1 * 1000);

// DASHBOARD SECTION DECLARATION 
let numInQueue = document.querySelector(".queue");
let numBeingServed = document.querySelector(".service");
let numOrders = document.querySelector(".orders");
let numStaff = document.querySelector(".staffNumber");
let timeLeft = document.querySelector(".timeNumber");
let idsThatHaveOrdered = []

function getMyData() {
    data = FooBar.getData();
    const myJson = JSON.parse(data);
    welcome.innerHTML = "Welcome back " + myJson.bar.name;
    numInQueue.innerHTML = myJson.queue.length;
    numBeingServed.innerHTML = myJson.serving.length;
    numStaff.innerHTML = myJson.bartenders.length;
    TotalEmployees.innerHTML = myJson.bartenders.length;
    
    for (const ele of myJson.serving) {
        idsThatHaveOrdered[ele.id] = 1
    }
    numOrders.innerHTML = idsThatHaveOrdered.length;
    totalOrderNum.textContent = idsThatHaveOrdered.length;
    showMyBeersData (myJson.beertypes);
    updateClientList(myJson.serving);
    updateBartenderStatus(myJson.bartenders);
    updateBeerVolChart(myJson.taps);
    updateBeerPopChart();
    updateStockChart(myJson.storage);
    updateMinAndMaxOrdered();
    updateBartenderPerformanceElements();
    updateLeastAndMostFavBeer();
};

function updateBeerVolChart(taps){
    beerVolumeChart.data.labels = taps.map(t => t.beer);
    beerVolumeChart.data.datasets[0].data = taps.map(t => t.level);
    beerVolumeChart.update();
}

function updateBeerPopChart(){
    BeerPopularityChart.data.labels = [];
    BeerPopularityChart.data.datasets[0].data = [];
    for (const beerName in beersOrdered){
        BeerPopularityChart.data.labels.push(beerName);
        BeerPopularityChart.data.datasets[0].data.push(beersOrdered[beerName]);
    }
    BeerPopularityChart.update();
    
}

function updateStockChart(storage){
    StockOverviewChart.data.labels = storage.map(t => t.name);
    StockOverviewChart.data.datasets[0].data = storage.map(t => t.amount);
    StockOverviewChart.update();
}

let lst = document.querySelectorAll('li');
let myList = document.querySelector("#toDoList");
let btn = document.querySelector("#bouton");
let input = document.querySelector("#toDoInput");

btn.addEventListener("click", addItem);

let defaultListItems = ['Add beer prices in product section', 'Give days off to bartenders at some point'];

function addDefaultListItems() {
    defaultListItems.forEach(function (defaultListItem) {
        addListItem(defaultListItem);
    });
}

function addItem() {
    addListItem(input.value);
}

function addListItem(textToDisplay) {
    if (textToDisplay == "") {
        return;
    }
    let newLi = document.createElement("li");
    let cross = document.createElement("span");
    cross.innerHTML = "&#x2715";
    cross.classList.add('theCross');
    newLi.innerHTML = ' ' + textToDisplay;
    newLi.insertBefore(cross, newLi.childNodes[0]);

    myList.appendChild(newLi);
    cross.onclick = function () {
        myList.removeChild(newLi);
    }
    input.value = "";
}

// CHART SECTION ---------------------------------------------------------------------------------------

let voluChart = document.getElementById('beerVolChart').getContext('2d');

// Global Options
Chart.defaults.global.defaultFontFamily = 'avenir';
Chart.defaults.global.defaultFontSize = 10;
Chart.defaults.global.defaultFontColor = '#777';

// Create the beer volume bar chart of the Dashboard section 
let beerVolumeChart = new Chart(voluChart, {
  type:'bar', 
  data:{
    labels:[],
    datasets:[{

      data:[
      ],
      //backgroundColor:'green',
      backgroundColor:[ 
        'rgba(109, 190, 199, 0.6)',
        'rgba(47, 62, 118, 0.6)',
        'rgba(159, 56, 117, 0.6)',
        'rgba(232, 130, 91, 0.6)',
        'rgba(241, 188, 106, 0.6)',
        'rgba(251,226,168, 0.6)',
        'rgba(250,152,136, 0.6)'
      ],
      borderWidth:1,
      borderColor:'#777',
      hoverBorderWidth:2,
      hoverBorderColor:'#000'
    }]
  },
  options:{
    legend:{
      display:false,
      position:'right',
    },
    layout:{
      padding:{
        left:10,
        right:0,
        bottom:15,
        top:15
      }
    },
    tooltips:{
      enabled:true
    },
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    }
  }
});


let StockChart = document.getElementById('myStockChart').getContext('2d');

// Create the Stock overview bar chart of the dashboard 
let StockOverviewChart = new Chart(StockChart, {
  type:'bar', 
  data:{
    labels:[],
    datasets:[{

      data:[
      ],
      backgroundColor:[
        'rgba(109, 190, 199, 0.6)',
        'rgba(47, 62, 118, 0.6)',
        'rgba(159, 56, 117, 0.6)',
        'rgba(232, 130, 91, 0.6)',
        'rgba(241, 188, 106, 0.6)',
        'rgba(251,226,168, 0.6)',
        'rgba(250,152,136, 0.6)',
        'rgba(232,76,102, 0.6)',
        'rgba(104,158,95, 0.6)',
        'rgba(149,196,59, 0.6)'
      ],
      borderWidth:1,
      borderColor:'#777',
      hoverBorderWidth:3,
      hoverBorderColor:'#000'
    }]
  },
  options:{
    legend:{
      display:false,
      position:'right',
    },
    layout:{
      padding:{
        left:10,
        right:10,
        bottom:0,
        top:30
      }
    },
    tooltips:{
      enabled:true
    },
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    }
  }
});

let popularityChart = document.getElementById('mypopuChart').getContext('2d');

// Create the Beer popularity pie chart of the dashboard
let BeerPopularityChart = new Chart(popularityChart, {
  type:'pie', 
  data:{
    labels:[],
    datasets:[{

      data:[

      ],
      backgroundColor:[ // background color of the bars 
        'rgba(109, 190, 199, 0.6)',
        'rgba(47, 62, 118, 0.6)',
        'rgba(159, 56, 117, 0.6)',
        'rgba(232, 130, 91, 0.6)',
        'rgba(241, 188, 106, 0.6)',
        'rgba(251,226,168, 0.6)',
        'rgba(250,152,136, 0.6)',
        'rgba(232,76,102, 0.6)',
        'rgba(104,158,95, 0.6)',
        'rgba(149,196,59, 0.6)'
      ],
      borderWidth:1,
      borderColor:'#777',
      hoverBorderWidth:2,
      hoverBorderColor:'#000'
    }]
  },
  options:{
    legend:{
      display:true,
      position:'right',
      fullWidth:true
    },

    layout:{
      padding:{
        left:10,
        right:10,
        bottom:10,
        top:10
      }
      
    },
    tooltips:{
      enabled:true
    }
  }
});


// PRODUCT SECTION = BEER TYPE SECTION  ----------------------------------------------------------------------------------

// BEER TYPE SECTION DECLARATION 
let numProduct = document.querySelector(".numprod");
let beerSection = document.querySelector('.prodDescriSpot');
let productTemplate = document.querySelector('.BeerTemplate').content;
let beerTypes = [];

function showMyBeersData (beerData){

    numProduct.innerHTML = beerData.length;
    beerData.forEach(function (beertype) {
        if (beerTypes.findIndex((b) => b.name == beertype.name) <= -1) { // only create new ele if it is not there
            beerTypes.push(beertype); 
            let cloneBeer = productTemplate.cloneNode(true);
            let beerName = cloneBeer.querySelector(".beerName");
            beerName.textContent = beertype.name;
            let alcohol = cloneBeer.querySelector(".alc");
            alcohol.textContent = "alc " + beertype.alc + "% vol.";
            
            let expend = cloneBeer.querySelector(".expend");
            let readMoreButton = cloneBeer.querySelector(".myBtn");
            let readLessButton = cloneBeer.querySelector(".myBtn2");
    
            readMoreButton.addEventListener("click", displayExpension);
    
            function displayExpension(){
                expend.style.display = "block";
                readMoreButton.style.display = "none";
            }
    
            readLessButton.addEventListener("click", hideExpension);

            function hideExpension(){
                expend.style.display = "none";
                readMoreButton.style.display = "block";
            }



            let beerAppear = cloneBeer.querySelector(".appearText");
            beerAppear.textContent = beertype.description.appearance;
            let beerAroma = cloneBeer.querySelector(".aromaText");
            beerAroma.textContent = beertype.description.aroma;
            let beerFlavor = cloneBeer.querySelector(".flavorText");
            beerFlavor.textContent = beertype.description.flavor;
            let beerMouth = cloneBeer.querySelector(".mouthText");
            beerMouth.textContent = beertype.description.mouthfeel;
            let beerOverall = cloneBeer.querySelector(".overallText");
            beerOverall.textContent = beertype.description.overallImpression;
            let beerImg = cloneBeer.querySelector("img");
            beerImg.src = "images/" + beertype.label;
            let categ = cloneBeer.querySelector(".categoryText");
            categ.textContent = beertype.category;
    
            beerSection.appendChild(cloneBeer);
    
            beersOrdered[beertype.name] = 0; // setting the initial value of beersOrder tracking to make sure it is initialized as soon as we get the beer type
    
        }
    });
}

function updateLeastAndMostFavBeer(){
    let leastPopVal = Number.MAX_SAFE_INTEGER;
    let leastPopBeer = "";
    for (const beerName in beersOrdered){ 
        if (beersOrdered[beerName] < leastPopVal){
            leastPopVal = beersOrdered[beerName];
            leastPopBeer = beerName;
        }
    }
    let leastPopContainer = document.querySelector(".leastPopu");
    leastPopContainer.textContent = leastPopBeer;

    let mostPopVal = -1;
    let mostPopBeer = "";
    for (const beerName in beersOrdered){
        if (beersOrdered[beerName] > mostPopVal){
            mostPopVal = beersOrdered[beerName];
            mostPopBeer = beerName;
        }
    }
    let mostPopContainer = document.querySelector(".mostPopu");
    mostPopContainer.textContent = mostPopBeer;
    
}

function updateMinAndMaxOrdered(){
    const numberOfOrders = clients.map(client => client.order.length);
    const minimum = Math.min(...numberOfOrders);
    const maximum = Math.max(...numberOfOrders);
    const maxiOrder = document.querySelector(".maxOrder");
    maxiOrder.textContent = maximum;
    const miniOrder = document.querySelector(".minOrder");
    miniOrder.textContent = minimum;
}

// CLIENT SECTION = ORDER SECTION-------------------------------------------------------------------------------------

// CLIENT SECTION DECLARATION
let clientSection = document.querySelector('.myClientList');
let clientListTemplate = document.querySelector('.myClientListTemplate').content;
let clientListDynamicElements = {};
let clients = [];
let orderedDrinksTemplate = document.querySelector('.drinksOrderedTemplate').content;
let totalBeersSold = 0;
let totalBeerSoldElement = document.querySelector('#numTotalBeer');
let totalOrderBox = document.getElementById("#totalOrderNum");
let beersOrdered = {};

// client = order in this section 
function updateClientList(clientData) {
    clientData.forEach(function (serving) {
        if (clients.findIndex((c) => c.id == serving.id) <= -1) {
            clients.push(serving);
            let cloneClientList = clientListTemplate.cloneNode(true);
            let orderID = cloneClientList.querySelector(".orderIdHere");
            orderID.textContent = "Order #" + serving.id;
            let numOfProducts = cloneClientList.querySelector(".numOfProdHere");
            let orderTicket = cloneClientList.querySelector('.orderTicket');
            let totalDrinkOrdered = cloneClientList.querySelector(".numOfProdHere");
            totalDrinkOrdered.textContent = serving.order.length + " drinks";
            totalBeersSold += serving.order.length;
            totalBeerSoldElement.textContent = totalBeersSold;
            serving.order.forEach(function(order){
                let clonedOrderedDrinkTemplate = orderedDrinksTemplate.cloneNode(true);
                let orderedDrinksContent = clonedOrderedDrinkTemplate.querySelector(".orderedDrinksHere");
                orderedDrinksContent.textContent = order;
                orderTicket.appendChild(clonedOrderedDrinkTemplate);

                if(beersOrdered[order]==undefined){
                    beersOrdered[order] = 0; 
                }
                beersOrdered[order]++;

            });
            clientSection.appendChild(cloneClientList);  
        }
    });
}

// EMPLOYEE SECTION ----------------------------------------------------------------------------------

//EMPLOYEES SECTION DECLARATION
let TotalEmployees = document.querySelector('#numTotalOfEmployees');
let employeeSection = document.querySelector('.trial');
let employeeTemplate = document.querySelector('.staffTemplate').content;
const bartenderPerformance = [];
let bartenderDynamicElements = {};

function updateBartenderStatus(staffData) {
    staffData.forEach(function (bartender) {
        if (bartenderDynamicElements[bartender.name] == null ||
            bartenderDynamicElements[bartender.name] == undefined) {

            let cloneStaff = employeeTemplate.cloneNode(true);
            let employeeName = cloneStaff.querySelector(".staffName");
            employeeName.textContent = bartender.name;
            let employeeStatus = cloneStaff.querySelector(".status");
            let employeeDoing = cloneStaff.querySelector(".doing");
            let orderInCharge = cloneStaff.querySelector(".whichOrder");
            let dynamicDomElements = {};
            dynamicDomElements.statusElement = employeeStatus;
            dynamicDomElements.taskElement = employeeDoing;
            dynamicDomElements.orderServing = orderInCharge;
            bartenderDynamicElements[bartender.name] = dynamicDomElements;
            employeeSection.appendChild(cloneStaff);
        }
        bartenderDynamicElements[bartender.name].statusElement.textContent = bartender.status;
        if(!bartenderPerformance.some(b=>b.name==bartender.name)){
            let bartenderTracking = {};
            bartenderTracking.name = bartender.name;
            bartenderTracking.beersPoured = 0;
            bartenderTracking.ordersServed = 0;
            bartenderTracking.idsServed = [];

            bartenderPerformance.push(bartenderTracking);
        }


        if (bartender.status == "WORKING"){
            bartenderDynamicElements[bartender.name].orderServing.textContent = "Serving order #" + bartender.servingCustomer;
        } else {
            bartenderDynamicElements[bartender.name].orderServing.textContent = "";
        }
        
        let taskString = "";
        switch(bartender.statusDetail) {
            case "startServing":
                taskString = "Start serving customer";
            break;

            case "reserveTap":
                taskString = "Waiting for the needed tap to be available"; 
            break;

            case "pourBeer":
                taskString = "Pouring beer using tap " + bartender.usingTap;    
            break;

            case "releaseTap" :
                taskString = "Done pouring beer";
            break;

            case "receivePayment":
                taskString = "Receiving payment";
                updateBartenderPerformance(bartender);
            break;

            case "endServing":
                taskString = "Done";
                updateBartenderPerformance(bartender);
            break;

            default:
                taskString = "Waiting for customer";
            break;
        }
        bartenderDynamicElements[bartender.name].taskElement.textContent = taskString;
    });
}

function updateBartenderPerformance(bartender){
    const bartenderPerformanceTracker = bartenderPerformance.find(b => b.name == bartender.name)
    if (!bartenderPerformanceTracker.idsServed.some(id => id == bartender.servingCustomer)){
        bartenderPerformanceTracker.idsServed.push(bartender.servingCustomer);
        bartenderPerformanceTracker.beersPoured += clients.find(c => c.id == bartender.servingCustomer).order.length;
        bartenderPerformanceTracker.ordersServed++;
    }
}
function updateBartenderPerformanceElements(){
    let bartenderWithMostOrders = "";
    let bartenderWithMostBeersServed = "";
    let mostOrders = 0;
    let mostBeers = 0;
    bartenderPerformance.forEach(b=>{
        if(b.ordersServed > mostOrders) {
            mostOrders = b.ordersServed;
            bartenderWithMostOrders = b.name;
        }
        if(b.beersPoured > mostBeers) {
            mostBeers = b.beersPoured;
            bartenderWithMostBeersServed = b.name;
        }
    });
    const mostBeerServed = document.querySelector(".servedMostBeer");
    mostBeerServed.textContent = bartenderWithMostBeersServed;
    const mostOrderServed = document.querySelector(".servedMostOrder");
    mostOrderServed.textContent = bartenderWithMostOrders;

}


let modal = document.getElementById('myModal');
let openModal = document.getElementById("customize");
let closeModal = document.querySelector(".close");

openModal.addEventListener("click", openTheModalForm)

function openTheModalForm(){
    modal.style.display = "block";
}

closeModal.addEventListener("click", closeTheModalForm)

function closeTheModalForm(){
    modal.style.display = "none";
}