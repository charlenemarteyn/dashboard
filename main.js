"use strict"

function openPage(pageName,elmnt,color) {
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

const showing = false;

//EMPLOYEES SECTION DECLARATION
let employeeSection = document.querySelector('.trial');
let employeeTemplate = document.querySelector('.staffTemplate').content;

window.addEventListener("DOMContentLoaded", getMyData)
window.addEventListener("DOMContentLoaded", addDefaultListItems)

setInterval(this.getMyData.bind(this), 1 * 1000);

function getMyData(){
    data = FooBar.getData();
    const myJson = JSON.parse(data);
    console.log(myJson);
    welcome.innerHTML = "Welcome back " + myJson.bar.name;
    numInQueue.innerHTML = myJson.queue.length;
    numBeingServed.innerHTML = myJson.serving.length;
    numStaff.innerHTML = myJson.bartenders.length;


    //timeLeft.innerHTML = myJson.bar.closingtime;
    for(const ele of myJson.serving){
        idsThatHaveOrdered[ele.id] = 1
    }
    numOrders.innerHTML = idsThatHaveOrdered.length;
    numProduct.innerHTML = myJson.beertypes.length;

    let beerData = myJson.beertypes;
    beerData.forEach(function(beertype){
        if(beerTypes.findIndex((b) => b.name == beertype.name) <= -1){
            beerTypes.push(beertype);
            let cloneBeer = productTemplate.cloneNode(true);
            let beerName = cloneBeer.querySelector(".beerName");
            beerName.textContent = beertype.name;
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
            beerImg.src="images/" + beertype.label;
            beerSection.appendChild(cloneBeer);


        }
    });

    updateBartenderStatus(myJson.bartenders);
    
};
let bartenderDynamicElements = {};
function updateBartenderStatus(staffData){
    staffData.forEach(function(bartender){
        if(bartenderDynamicElements[bartender.name] == null 
            || bartenderDynamicElements[bartender.name] == undefined){

            let cloneStaff = employeeTemplate.cloneNode(true);
            let employeeName = cloneStaff.querySelector(".staffName");
            employeeName.textContent = bartender.name;
            let employeeStatus = cloneStaff.querySelector(".status");
            let dynamicDomElements = {};
            dynamicDomElements.statusElement = employeeStatus; 
            dynamicDomElements.employeeName = employeeName;
            bartenderDynamicElements[bartender.name] = dynamicDomElements;
            employeeSection.appendChild(cloneStaff);
        }
        bartenderDynamicElements[bartender.name].statusElement.textContent = bartender.status;
        bartenderDynamicElements[bartender.name].employeeName.textContent = bartender.name;
    });
}

let lst = document.querySelectorAll('li');
let myList = document.querySelector("#toDoList");
let btn = document.querySelector("#bouton");
let input = document.querySelector("#toDoInput"); 

 btn.addEventListener("click", addItem);

 let defaultListItems = ['Add beer prices in product section', 'Give days off to bartenders at some point'];
 function addDefaultListItems(){
     defaultListItems.forEach(function(defaultListItem){
         addListItem(defaultListItem);
     });
 } 

function addItem(){
    addListItem(input.value);
}
function addListItem(textToDisplay){
    let newLi = document.createElement("li");
    let cross = document.createElement("span");
    cross.innerHTML = "&#x2715";
    cross.classList.add('theCross');
    newLi.innerHTML = ' ' + textToDisplay;
    newLi.insertBefore(cross, newLi.childNodes[0]);
    
    myList.appendChild(newLi);
    cross.onclick = function(){
        myList.removeChild(newLi);
    }
    input.value = "";
}


document.querySelector("svg").addEventListener("mouseover", animate);
    function animate(){
        document.querySelector("line").style.strokeDashoffset = 0;
    }

    document.querySelector("svg").addEventListener("mouseout", animateBack);
    function animateBack(){
        document.querySelector("line").style.strokeDashoffset = 100;
    }
    




/* let modal = document.querySelector('.modal');
            modal.addEventListener('click', function(){
                modal.classList.add('hide');
            });

            let detailsButton = clone.querySelector('.button');

            detailsButton.addEventListener('click', function(){
                let link = product_link + product.id;
                fetch(link).then(function(response){
                    return response.json();
                }).then(function(productJson){
                    showDetails(productJson);
                })
            }) 
            
            
            
            
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
            beerImg.src="images/" + beertype.label;*/