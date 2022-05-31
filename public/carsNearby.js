//TODO: check that a car with session key "currentCar" is not rented when renting a new car
//TODO: Receipt
//TODO: Make a timer on rental
//TODO: fix firebase login
//TODO: make profile use user data

class Car {
    constructor(name, location, power) {
        this.name = name
        this.location = location
        this.power = power
    }
}
function openConfirmation(name) {
    let cars = getDummyData()
    let car = cars.get(name)

    if (car == null) return

    document.getElementById("nameLabel").innerText = car.name
    document.getElementById("locationLabel").innerText = car.location
    document.getElementById("powerLabel").innerText = "Power: "+car.power+"%"


    let conBtn = document.getElementById("continueButton")
    conBtn.onclick = function () {
        window.location.href = `carInfo.html?name=${car.name}&carLocation=${car.location}&power=${car.power}`
    }

    $('#carSelectModal').modal('show')
}


function getDummyData() {
    let car1 = new Car("Laura", "Rued Langgaards Vej 7, 2300 København", 85)
    let car2 = new Car("Connie", "Kongens Nytorv 34, 1050 København", 69)
    let car3 = new Car("Johan", "Nørre Voldgade 82, 1358 København", 42)
    let car4 = new Car("Wilhelm", "Vester Voldgade 10, 1552 København", 100)
    let car5 = new Car("Sanne", "Ny Vestergade 10, 1471 København K", 5)

    let cars = new Map()
    cars.set(car1.name, car1)
    cars.set(car2.name, car2)
    cars.set(car3.name, car3)
    cars.set(car4.name, car4)
    cars.set(car5.name, car5)
    return cars
}


function loadCarInfoPage(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    let name = urlParams.get("name")
    let carLocation = urlParams.get('carLocation')
    let power = "Power: "+urlParams.get('power')+"%";
    document.getElementById('carName').innerText=name;
    document.getElementById('location').innerText=carLocation;
    document.getElementById('power').innerText=power;

    document.getElementById('confirm').onclick= function () {setCurrentCar(name, carLocation, power); window.location.href = 'rental.html'}
}

function setCurrentCar(name, carLocation, power){
    let currentCar = new Car(name, carLocation, power);
    sessionStorage.setItem("currentCar", currentCar);
}

function currentCarName(){
    if(sessionStorage.getItem("currentCar") == null) return;
    document.getElementById('carName').innerText=sessionStorage.getItem("currentCar").name;
}

function currentCarLocation(){
    if(sessionStorage.getItem("currentCar") == null) return;
    document.getElementById('location').innerText=sessionStorage.getItem("currentCar").location;
}

function currentCarPower(){
    if(sessionStorage.getItem("currentCar") == null) return;
    document.getElementById('power').innerText=sessionStorage.getItem("currentCar").power;
}