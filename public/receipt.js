//Written by Jack Kryger Sørensen

const initialPrice = 50
const pricePrMinute = 3

function loadReceipt() {
    let params = new URLSearchParams(window.location.search)
    let carName = params.get("carName")
    let timeUsed = params.get("timeUsed")

    if (! timeUsed) {
        console.log("opening modal")
        document.getElementById("continueButton").onclick = function () {
            window.location.href = 'rental.html'
        }
        $('#noRentingModal').modal('show')
        return
    }

    let usagePrice = timeUsed * pricePrMinute
    let totalPrice = usagePrice + initialPrice

    document.getElementById("carNameLabel").innerText = carName
    document.getElementById("dateLabel").innerText = new Date().toLocaleDateString()
    document.getElementById("usedTimeLabel").innerText = timeUsed
    document.getElementById("initialPriceLabel").innerText = `${initialPrice}`
    document.getElementById("pricePrMinuteLabel").innerText = `${pricePrMinute}`
    document.getElementById("usagePriceLabel").innerText = `${usagePrice}`
    document.getElementById("totalPriceLabel").innerText = `${totalPrice}`
}