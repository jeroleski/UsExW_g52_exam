

function fillInData() {

}

function saveData() {
    let fullName = document.getElementById("fullName").value
    let birthday = document.getElementById("birthday").value
    let creditCardNumber = document.getElementById("creditCardNumber").value
    let creditCardExpiration = document.getElementById("creditCardExpiration").value
    let creditCardVerify = document.getElementById("creditCardVerify").value
    let driversLicense = document.getElementById("driversLicense").value

    sessionStorage.setItem("fullName", fullName)
    sessionStorage.setItem("birthday", birthday)
    sessionStorage.setItem("creditCardNumber", creditCardNumber)
    sessionStorage.setItem("creditCardExpiration", creditCardExpiration)
    sessionStorage.setItem("creditCardVerify", creditCardVerify)
    sessionStorage.setItem("driversLicense", driversLicense)
}



