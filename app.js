// nav on phone
const NavBtn = document.querySelector(".Nav_btn")
const NavTab = document.querySelector(".nav-tab")

NavBtn.addEventListener('click', ()=>{
    NavTab.classList.toggle('show')
    setTimeout(() => {
        NavTab.classList.toggle('show')
    }, 3000);
}
);


// destinations
function Sites(Image, Title, Details, Cost){
        this.Image =Image;
        this.Title = Title;
        this.Details = Details;
        this.Cost = Cost;
}


// prototype
// 1. Gold Cost
Sites.prototype.GoldCost = function(){
    let pcost = this.Cost*2.5;
    return pcost;
}

// 2. Silver Cost
Sites.prototype.SiverCost = function(){
    let scost = this.Cost*1.5;
    return scost;
}



// intantiate destinations
const OlPajeta = new Sites("./ol pajeta.jpg", "Ol Pajeta", "Fun, Game Drive, Big5, Camp", 2500);
const LNakuru = new Sites("./Lake Nakuru.jpg", "Lake Nakuru", "Fun, Flamingos, Camp", 2000);
const Nairobi = new Sites("./nnationalpark.jpg", "Nairobi National Park", "Fun, Game Drive, Big5", 1500);
const Mombasa = new Sites("./mombasa.jpg", "Mombasa", "Fun, Beach, Party, Indian Ocean, Camp", 8000);
const Karura = new Sites("./karura.jpg", "Karura Forest", "Fun, Bike riding, Game walk, Camp", 1000);
const GirrafeC = new Sites("./Gcenter.jpg", "Giraffe Center", "Fun, Feed Giraffes", 700);
const Kilimanjaro = new Sites("./kilimanjaro.jpg", "Mt. Kilimanjaro", "Fun, hiking, Bonfire, Camp", 10000)

// array of destinations
let DestinationsList = [OlPajeta,Nairobi,Mombasa,Karura,GirrafeC, Kilimanjaro, LNakuru]

DestinationsList.forEach(Destination => {
    // get elements to create a card for each
    const cardHolder = document.querySelector(".CardContainer")
    let newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.innerHTML = `
    <img class="Dimage" src="${Destination.Image}" alt="DestinationImage">
    <h2 class="Dtitle">${Destination.Title}</h2>
    <p class="Ddetails">${Destination.Details}</p>
    <p class="DCostHolder">Basic Cost: Kshs.<span class="Dbcost">${Destination.Cost}</span></p>
    <button class="DBookBtn">Book Now!</button>
    `

    cardHolder.append(newCard)
});


// modal Operations

const ModalCloseBtn = document.querySelector("#modalCloseBtn")
const modalOverlay = document.querySelector("#ModalOverlay")
const BookBtn = document.querySelector("#BookBtn")

ModalCloseBtn.addEventListener("click", ()=>{
    modalOverlay.classList.remove("Open");
})

BookBtn.addEventListener("click", ()=>{
    modalOverlay.classList.add("Open");
})

window.addEventListener('click', (e)=>{
    if(e.target.classList.contains("ModalOverlay")){
        modalOverlay.classList.toggle("Open");
    }
})

// auto calculate cost
const BookerPlan = document.querySelector("#BookerPlan")
const ModalBookBtn = document.querySelector("#ModalBookBtn")
const BookerDestinationInput = document.querySelector("#BookerDest")
const CalCost = document.querySelector("#CalCost")

BookerDestinationInput.addEventListener("change", ()=>{
    // auto display the basic pay when user sets destination   
    let UserDestination = BookerDestinationInput.value;
    DestinationsList.forEach(d=>{
        if(UserDestination == d.Title){
            CalCost.value = d.Cost;
        }
    })

    
})




BookerPlan.addEventListener("blur", ()=>{
    // calculates the cost per package when user changes from basic
    let UserPlan = BookerPlan.value;
    let UserDestination = BookerDestinationInput.value;
    if (UserDestination) {
        DestinationsList.forEach(d=>{
            if(UserDestination == d.Title){
                let UserPlan = BookerPlan.value;
                if(UserPlan == "SilverCost"){
                    CalCost.value = d.SiverCost();
                }else if(UserPlan == "GoldCost"){
                    CalCost.value = d.GoldCost();
                }else if(UserPlan == "Basic") {
                    CalCost.value = d.Cost;
                }
            }
        })
        
    }
})




// prevent confirm button from reloading
const confirmBtn = document.querySelector("#cnfmbtn")

confirmBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    let UserDestination = BookerDestinationInput.value;
    if(UserDestination === "") {
        window.alert('Select Your Destination');
    }
})



// Booking from destination cards
window.addEventListener("click",(e)=>{
    if(e.target.classList == "DBookBtn"){
        let CardKids = e.target.parentElement.children;
        modalOverlay.classList.add("Open")
        BookerDest.value = CardKids[1].innerHTML;
        CalCost.value = CardKids[3].lastElementChild.innerText
    }
})

// modal submission
// const ModalBookBtn = document.querySelector("#ModalBookBtn")

// ModalBookBtn.addEventListener("click",()=>{

// })