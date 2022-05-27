function listenForChanges() {
    let form = document.getElementById("profileData");
    let backButton = document.getElementById("backButton")
    let saveButton = document.getElementById("saveButton")

    form.addEventListener("input", function () {
        backButton.classList.add("invisible")
        saveButton.classList.remove("invisible")
    });
}

function fillInData() {
    let fullName = sessionStorage.getItem("fullName")
    let birthday = sessionStorage.getItem("birthday")
    let creditCardNumber = sessionStorage.getItem("creditCardNumber")
    let creditCardExpiration = sessionStorage.getItem("creditCardExpiration")
    let creditCardVerify = sessionStorage.getItem("creditCardVerify")
    let driversLicense = sessionStorage.getItem("driversLicense")

    let errorMessages = verifyData(fullName, birthday, creditCardNumber, creditCardExpiration, creditCardVerify, driversLicense)
    if (errorMessages.length !== 0) {
        let dummyData = getDummyData()
        fullName = dummyData[0]
        birthday = dummyData[1]
        creditCardNumber = dummyData[2]
        creditCardExpiration = dummyData[3]
        creditCardVerify = dummyData[4]
        driversLicense = dummyData[5]
    }

    console.log(fullName)
    console.log(birthday)
    console.log(creditCardNumber)
    console.log(creditCardExpiration)
    console.log(creditCardVerify)
    console.log(driversLicense)

    document.getElementById("fullName").value = fullName
    document.getElementById("birthday").value = birthday
    document.getElementById("creditCardNumber").value = creditCardNumber
    document.getElementById("creditCardExpiration").value = creditCardExpiration
    document.getElementById("creditCardVerify").value = creditCardVerify
    document.getElementById("driversLicense").value = driversLicense
}

function saveData() {
    let fullName = document.getElementById("fullName").value
    let birthday = document.getElementById("birthday").value
    let creditCardNumber = document.getElementById("creditCardNumber").value
    let creditCardExpiration = document.getElementById("creditCardExpiration").value
    let creditCardVerify = document.getElementById("creditCardVerify").value
    let driversLicense = document.getElementById("driversLicense").value

    console.log(fullName)
    console.log(birthday)
    console.log(creditCardNumber)
    console.log(creditCardExpiration)
    console.log(creditCardVerify)
    console.log(driversLicense)

    let errorMessages = verifyData(fullName, birthday, creditCardNumber, creditCardExpiration, creditCardVerify, driversLicense)
    if (errorMessages.length !== 0) {
        setErrors(errorMessages)
        return
    }
    else removeErrors()

    sessionStorage.setItem("fullName", fullName)
    sessionStorage.setItem("birthday", birthday)
    sessionStorage.setItem("creditCardNumber", creditCardNumber)
    sessionStorage.setItem("creditCardExpiration", creditCardExpiration)
    sessionStorage.setItem("creditCardVerify", creditCardVerify)
    sessionStorage.setItem("driversLicense", driversLicense)

    document.getElementById("backButton").classList.remove("invisible")
    document.getElementById("saveButton").classList.add("invisible")
    }

function verifyData(fullName, birthday, creditCardNumber, creditCardExpiration, creditCardVerify, driversLicense) {
    let errors = []

    if (fullName == null || fullName.trim().length === 0) errors[errors.length] = "You must fill in your name!"

    if (birthday == null || birthday.trim().length === 0) errors[errors.length] = "You must fill in your date of birth!"

    if (creditCardNumber == null || creditCardNumber.length !== 16) errors[errors.length] = "The credit card must have exactly 16 digits!"
    else if (creditCardNumber.match(/^[0-9]+$/) == null) errors[errors.length] = "The credit card number must be digits only!"

    if (creditCardExpiration == null || creditCardExpiration.trim().length === 0) errors[errors.length] = "You must fill in your date of birth!"

    if (creditCardVerify == null || creditCardVerify.length !== 3) errors[errors.length] = "The verify number must have exactly 3 digits!"
    else if (creditCardVerify.match(/^[0-9]+$/) == null) errors[errors.length] = "The verify number must be digits only!"

    if (driversLicense == null || driversLicense.trim().length === 0) errors[errors.length] = "You must fill in the number on your drivers license!!"

    return errors
}


function setErrors(errorMessages) {
    let messages = ""
    for (let i = 0; i < errorMessages.length; i++) {
        messages += `- ${errorMessages[i]}\n`
    }

    let errorField = document.getElementById("errorField")
    errorField.innerText = messages
    errorField.classList.remove("invisible")
}

function removeErrors() {
    let errorField = document.getElementById("errorField")
    errorField.innerText = ""
    errorField.classList.add("invisible")
}

function getDummyData() {
    return ["Nanna Jensen", "1999-02-01", "1234567890123456", "2023-04", "123", "abc123def"]
}
