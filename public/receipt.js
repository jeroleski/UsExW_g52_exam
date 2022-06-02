//Written by Jack Kryger Sørensen

const initialPrice = 50
const pricePrMinute = 3

function loadReceipt() {
    let params = new URLSearchParams(window.location.search)
    let carName = params.get("carName")
    let timeUsed = params.get("timeUsed")

    if (! timeUsed) {
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
    document.getElementById("usedTimeLabel").innerText = `${timeUsed} minutes`
    document.getElementById("initialPriceLabel").innerText = `${initialPrice} DKK`
    document.getElementById("pricePrMinuteLabel").innerText = `${pricePrMinute} DKK`
    document.getElementById("usagePriceLabel").innerText = `${usagePrice} DKK`
    document.getElementById("totalPriceLabel").innerText = `${totalPrice} DKK`
}