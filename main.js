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

// DASHBOARD SECTION DECLARATION 
let numInQueue = document.querySelector(".queue");
let numBeingServed = document.querySelector(".service");
let numOrders = document.querySelector(".orders");
let numStaff = document.querySelector(".staffNumber");
let timeLeft = document.querySelector(".timeNumber");
let idsThatHaveOrdered = []

// PRODUCT SECTION DECLARATION 
let numProduct = document.querySelector(".numprod");
let beerSection = document.querySelector('.prodDescriSpot');
let productTemplate = document.querySelector('.BeerTemplate').content;
let beerTypes = [];

//EMPLOYEES SECTION DECLARATION
let TotalEmployees = document.querySelector('#numTotalOfEmployees');
let employeeSection = document.querySelector('.trial');
let employeeTemplate = document.querySelector('.staffTemplate').content;

window.addEventListener("DOMContentLoaded", getMyData)
window.addEventListener("DOMContentLoaded", addDefaultListItems)

setInterval(this.getMyData.bind(this), 1 * 1000);

function getMyData() {
    data = FooBar.getData();
    const myJson = JSON.parse(data);
    console.log(myJson);
    welcome.innerHTML = "Welcome back " + myJson.bar.name;
    numInQueue.innerHTML = myJson.queue.length;
    numBeingServed.innerHTML = myJson.serving.length;
    numStaff.innerHTML = myJson.bartenders.length;
    TotalEmployees.innerHTML = myJson.bartenders.length;

    for (const ele of myJson.serving) {
        idsThatHaveOrdered[ele.id] = 1
    }
    numOrders.innerHTML = idsThatHaveOrdered.length;

    showMyBeersData (myJson.beertypes);
    updateClientList(myJson.serving);
    updateBartenderStatus(myJson.bartenders);
};

function showMyBeersData (beerData){

    numProduct.innerHTML = beerData.length;
    beerData.forEach(function (beertype) {
        if (beerTypes.findIndex((b) => b.name == beertype.name) <= -1) {
            beerTypes.push(beertype);
            let cloneBeer = productTemplate.cloneNode(true);
            let beerName = cloneBeer.querySelector(".beerName");
            beerName.textContent = beertype.name;
            
            let expend = cloneBeer.querySelector("#expension");
            let readMoreButton = cloneBeer.querySelector(".myBtn");
    
            readMoreButton.addEventListener("click", displayExpension);
    
            function displayExpension(){
                expend.style.display = "block";
                readMoreButton.display = "none";
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
    
            beerSection.appendChild(cloneBeer);
    
            beersOrdered[beertype.name] = 0;
    
        }
    });
}










let bartenderDynamicElements = {};
console.log(bartenderDynamicElements);

function updateBartenderStatus(staffData) {
    staffData.forEach(function (bartender) {
        if (bartenderDynamicElements[bartender.name] == null ||
            bartenderDynamicElements[bartender.name] == undefined) {

            let cloneStaff = employeeTemplate.cloneNode(true);
            let employeeName = cloneStaff.querySelector(".staffName");
            employeeName.textContent = bartender.name;
            let employeeStatus = cloneStaff.querySelector(".status");
            let employeeDoing = cloneStaff.querySelector(".doing");
            let dynamicDomElements = {};
            dynamicDomElements.statusElement = employeeStatus;
            dynamicDomElements.taskElement = employeeDoing;
            bartenderDynamicElements[bartender.name] = dynamicDomElements;
            employeeSection.appendChild(cloneStaff);
        }
        bartenderDynamicElements[bartender.name].statusElement.textContent = bartender.status;
        let taskString = "";
        switch(bartender.statusDetail) {
            case "pourBeer":
                taskString = "Pouring beer for client #" + bartender.servingCustomer + " using tap " + bartender.usingTap;    
            break;
            case "receivingPayment":
            break;
            default:
                taskString = "Waiting for customer";
            break;
        }
        bartenderDynamicElements[bartender.name].taskElement.textContent = taskString;
    });
}

// CLIENT SECTION DECLARATION
let clientSection = document.querySelector('.myClientList');
let clientListTemplate = document.querySelector('.myClientListTemplate').content;
let clientListDynamicElements = {};
let clients = [];
let orderedDrinksTemplate = document.querySelector('.drinksOrderedTemplate').content;
let totalBeersSold = 0;
let totalBeerSoldElement = document.querySelector('#numTotalBeer');

let beersOrdered = {};

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
            console.log(beersOrdered);


        }
    });
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


// CHART SECTION 

let myChart = document.getElementById('myChart').getContext('2d');

// Global Options
Chart.defaults.global.defaultFontFamily = 'avenir';
Chart.defaults.global.defaultFontSize = 11;
Chart.defaults.global.defaultFontColor = '#777';

let massPopChart = new Chart(myChart, {
  type:'bar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
  data:{
    labels:['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford', 'New Bedford'],
    datasets:[{

      data:[
        617594,
        181045,
        153060,
        106519,
        105162,
        95072,
        95072
      ],
      //backgroundColor:'green',
      backgroundColor:[ 
        'rgba(249,218,144, 0.6)',
        'rgba(249,131,111, 0.6)',
        'rgba(229,54,82, 0.6)',
        'rgba(93,142,86, 0.6)',
        'rgba(192,221,137, 0.6)',
        'rgba(251,226,168, 0.6)',
        'rgba(250,152,136, 0.6)'
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
    }
  }
});

let StockChart = document.getElementById('myStockChart').getContext('2d');
let StockOverviewChart = new Chart(StockChart, {
  type:'bar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
  data:{
    labels:['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford', 'New Bedfopord', 'Cambrgidge', 'New Bedfvvord', 'New Bedfoord'],
    datasets:[{

      data:[
        617594,
        181045,
        153060,
        106519,
        105162,
        95072,
        95072,
        105162,
        95072,
        95072
      ],
      //backgroundColor:'green',
      backgroundColor:[
        'rgba(249,218,144, 0.6)',
        'rgba(249,131,111, 0.6)',
        'rgba(229,54,82, 0.6)',
        'rgba(93,142,86, 0.6)',
        'rgba(192,221,137, 0.6)',
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
    }
  }
});

let popularityChart = document.getElementById('mypopuChart').getContext('2d');
let BeerPopularityChart = new Chart(popularityChart, {
  type:'pie', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
  data:{
    labels:['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford', 'New Bedford'],
    datasets:[{

      data:[
        1,
        1,
        1,
        1,
        1,
        1,
        1
      ],
      //backgroundColor:'green',
      backgroundColor:[
        'rgba(249,218,144, 0.6)',
        'rgba(249,131,111, 0.6)',
        'rgba(229,54,82, 0.6)',
        'rgba(93,142,86, 0.6)',
        'rgba(192,221,137, 0.6)',
        'rgba(251,226,168, 0.6)',
        'rgba(250,152,136, 0.6)',
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
    },
    layout:{
      padding:{
        left:0,
        right:0,
        bottom:0,
        top:10
      }
    },
    tooltips:{
      enabled:true
    }
  }
});


let modal = document.getElementById('myModal');

// Get the button that opens the modal
let openModal = document.getElementById("customize");

// Get the <span> element that closes the modal
let closeModal = document.querySelector(".close");

openModal.addEventListener("click", openTheModalForm)

function openTheModalForm(){
    modal.style.display = "block";
}

closeModal.addEventListener("click", closeTheModalForm)

function closeTheModalForm(){
    modal.style.display = "none";
}