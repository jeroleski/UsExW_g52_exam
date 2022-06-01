//Written by Jack Kryger Sørensen

function pageUsage() {
    let params = new URLSearchParams(window.location.search)
    if (params.get("usage") === "login") {
        document.getElementById("usedFor").innerText = "Log in using:"
    } else {
        document.getElementById("usedFor").innerText = "Sign up using:"
    }
}

function isLoggedIn() {
    try {
        !!firebase.auth().currentUser
    } catch (e) {
        return false
    }
}

function trySIgnIn(p) {
    try {
        firebaseSignIn(p)
    } catch (e) {
        console.log("opening modal")
        $('#noFirebaseModal').modal('show')
    }
}

function firebaseSignIn(p) {
    let provider
    switch (p) {
        case "google":
            provider = new firebase.auth.GoogleAuthProvider()
            break
        case "facebook":
            provider = new firebase.auth.FacebookAuthProvider()
            break
        default:
            window.location.href = 'carsNearby.html'
            return
    }

    firebase.auth().onAuthStateChanged(user => {
        if (user) { //user is signed in
            sessionStorage.setItem("fullName", user.displayName)
            console.log(user.displayName)
            window.location.href = 'carsNearby.html'
        } else {//user is signed out
            sessionStorage.removeItem("fullName")
            window.location.href = 'index.html'
        }
    })

    firebase.auth().signInWithPopup(provider)
        .then(result => {
            let user = result.user
            console.log("signed in as:")
            console.log(user)
        })
        .catch(error => {
            console.log(error)
        })
}

function trySignOut() {
    try {
        auth.signOut()
            .then(() => {
                console.log("the user has signed out")
                window.location.href = "index.html"
            })
            .catch(error => {
                console.log(error)
            })
    } catch (e) {
        sessionStorage.removeItem("fullName")
        window.location.href = "index.html"
    }
}

