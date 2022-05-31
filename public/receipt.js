const initialPrice = 50
const pricePrMinute = 3

function loadReceipt() {
    let car = sessionStorage.getItem("currentCar")
    let rentedTime = sessionStorage.getItem("rentedTime")
    let timeUsed = parseInt(rentedTime)

    if (! rentedTime || isNaN(timeUsed)) {
        console.log("opening modal")
        document.getElementById("continueButton").onclick = function () {
            window.location.href = 'rental.html'
        }
        $('#noRentingModal').modal('show')
        return
    }

    sessionStorage.removeItem("currentCar")
    sessionStorage.removeItem("rentedTime")

    let usagePrice = timeUsed * pricePrMinute
    let totalPrice = usagePrice + initialPrice

    document.getElementById("carNameLabel").innerText = car.name
    document.getElementById("dateLabel").innerText = new Date().toLocaleDateString()
    document.getElementById("usedTimeLabel").innerText = `${timeUsed}`
    document.getElementById("initialPriceLabel").innerText = `${initialPrice}`
    document.getElementById("pricePrMinuteLabel").innerText = `${pricePrMinute}`
    document.getElementById("usagePriceLabel").innerText = `${usagePrice}`
    document.getElementById("totalPriceLabel").innerText = `${totalPrice}`
}