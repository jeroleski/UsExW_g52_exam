const auth = firebase.auth()
const googleProvider = new firebase.auth.GoogleAuthProvider()
const facebookProvider = new firebase.auth.FacebookAuthProvider()

auth.onAuthStateChanged(user => {
    if (user) { //user is signed in
        //go to rent car map

    } else {//user is signed out
        //go back to log in page

    }
})

function pageUsage() {
    let params = new URLSearchParams(window.location.search)
    if (params.get("usage") === "login") {
        document.getElementById("usedFor").innerText = "Log in using:"
    } else {
        document.getElementById("usedFor").innerText = "Sign up using:"
    }
}

function signIn(p) {
    let provider
    switch (p) {
        case "google":
            provider = googleProvider
            break
        case "facebook":
            provider = facebookProvider
            break
        default:
            return
    }

    auth.signInWithPopup(provider)
        .then(result => {
            let user = result.user
            console.log("signed in as:")
            console.log(user)
            sessionStorage.setItem("user", user)
        })
        .catch(error => {
            console.log(error)
        })
}

function signOut() {
    auth.signOut()
        .then(() => {
            console.log("user has signed out")
            sessionStorage.removeItem("user")
        })
        .catch(error => {
            console.log(error)
        })
}

