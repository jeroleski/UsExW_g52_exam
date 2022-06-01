class Car {
    constructor(name, location, power) {
        this.name = name
        this.location = location
        this.power = power
    }
}

function loadCarInfoPage(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    let name = urlParams.get("name")
    let carLocation = urlParams.get('location')
    let power = "Power: "+urlParams.get('power')+"%";
    document.getElementById('carName').innerText=name;
    document.getElementById('location').innerText=carLocation;
    document.getElementById('power').innerText=power;

    document.getElementById('confirm').onclick= function () {setCurrentCar(name, carLocation, power); window.location.href = 'rental.html'}
}

function setCurrentCar(name, carLocation, power){
    let currentCar = new Car(name, carLocation, power)
    sessionStorage.setItem("currentCar", JSON.stringify(currentCar))
}

function currentCarName(){
    if(sessionStorage.getItem("currentCar") == null) return ""
    let carString = document.getElementById('carName').innerText=sessionStorage.getItem("currentCar")
    return JSON.parse(carString).name;
}

function currentCarLocation(){
    if(sessionStorage.getItem("currentCar") == null) return ""
    let carString = document.getElementById('location').innerText=sessionStorage.getItem("currentCar")
    return JSON.parse(carString).location
}

function currentCarPower(){
    if(sessionStorage.getItem("currentCar") == null) return 0
    let carString = document.getElementById('power').innerText=sessionStorage.getItem("currentCar")
    return JSON.parse(carString).power
}