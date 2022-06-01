let initialPrice = 50
let pricePrMinute = 3

let timeChanger = null

let hours   = 0
let minutes = 0
let seconds = 0

function useCar() {
    if (! sessionStorage.getItem("rentedTime")) {
        sessionStorage.setItem("rentedTime", `${Date.now()}`)
        document.getElementById("returnCarButton").innerText = "Return car"
        startTimer()
    }

    let useCarButton = document.getElementById("useCarButton")
    if (sessionStorage.getItem("carLocked")) {
        useCarButton.innerText = "Unlock car"
        sessionStorage.removeItem("carLocked")
    } else {
        useCarButton.innerText = "Lock car"
        sessionStorage.setItem("carLocked", "locked")
    }
}

function startTimer() {
    let timerLabel = document.getElementById("timerLabel")
    let priceLabel = document.getElementById("priceLabel")

    timeChanger = setInterval(function () {
        seconds++
        if (seconds >= 60) {minutes++; seconds = 0}
        if (minutes >= 60) {hours++;   minutes = 0}

        let hourLabel
        let minuteLabel
        let secondLabel
        if (seconds >= 10) secondLabel = `${seconds}`; else secondLabel = `0${seconds}`
        if (minutes >= 10) minuteLabel = `${minutes}`; else minuteLabel = `0${minutes}`
        if (hours >= 10)   hourLabel   = `${hours}`;   else hourLabel   = `0${hours}`

        timerLabel.innerText = `${hourLabel}:${minuteLabel}:${secondLabel}`

        priceLabel.innerText = `${price()} DKK`
    }, 1000)
}

function time() {
    return minutes + (60 * hours)
}

function price() {
    return initialPrice + (pricePrMinute * time())
}

function goToReceipt() {
    let carName = ""
    let carString = sessionStorage.getItem("currentCar")
    if (carString) carName = JSON.parse(carString).name

    clearInterval(timeChanger)
    sessionStorage.removeItem("currentCar")
    sessionStorage.removeItem("rentedTime")
    sessionStorage.removeItem("carLocked")

    window.location.href = `receipt.html?carName=${carName}&timeUsed=${time()}`
}

function loadRental() {
    let carString = sessionStorage.getItem("currentCar")
    console.log(carString)
    if (! carString) {
        console.log("opening modal")
        document.getElementById("continueButton").onclick = function () {
            window.location.href = 'carsNearby.html'
        }
        $('#noRentingModal').modal('show')
        return
    }
    let car = JSON.parse(carString)
    document.getElementById("carNameLabel").innerText = car.name
    document.getElementById("carLocationLabel").innerText = car.location
    document.getElementById("carPowerLabel").innerText = car.power

    if (! sessionStorage.getItem("rentedTime")) {
        document.getElementById("returnCarButton").innerText = "Cancel"
    }

    loadTimer()
    document.getElementById("priceLabel").innerText = `${price()} DKK`
}

function loadTimer() {
    let now = Date.now()
    let rentedTime = sessionStorage.getItem("rentedTime")
    if (! rentedTime) return

    let timeSinceRented = now - rentedTime //milliseconds
    let secondsSinceRented = Math.floor(timeSinceRented / 1000)
    let minutesSinceRented = Math.floor(secondsSinceRented / 60)
    let hoursSinceRented   = Math.floor(minutesSinceRented / 60)

    hours = hoursSinceRented
    minutes = minutesSinceRented % 60
    seconds = secondsSinceRented % 60

    startTimer()
}

