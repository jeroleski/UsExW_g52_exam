const auth = firebase.auth()
const googleProvider = new firebase.auth.GoogleAuthProvider()
const facebookProvider = new firebase.auth.FacebookAuthProvider()

auth.onAuthStateChanged(user => {
    if (user) { //user is signed in
        sessionStorage.setItem("fullName", user.displayName)
        console.log(user.displayName)
        window.location.href = 'carsNearby.html'
    } else {//user is signed out
        sessionStorage.removeItem("fullName")
        window.location.href = 'index.html'
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
            window.location.href = 'carsNearby.html'
            return
    }

    auth.signInWithPopup(provider)
        .then(result => {
            let user = result.user
            console.log("signed in as:")
            console.log(user)
        })
        .catch(error => {
            console.log(error)
        })
}

function signOut() {
    auth.signOut()
        .then(() => {
            console.log("the user has signed out")
            window.location.href = "index.html"
        })
        .catch(error => {
            console.log(error)
        })
}

