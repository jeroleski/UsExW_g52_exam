//Written by Jack Kryger Sørensen

function pageUsage() {
    let params = new URLSearchParams(window.location.search)
    if (params.get("usage") === "login") {
        document.getElementById("usedFor").innerText = "Log in using:"
    } else {
        document.getElementById("usedFor").innerText = "Sign up using:"
    }
}

function trySIgnIn(p) {
    try {
        firebaseSignIn(p)
    } catch (e) {
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
            window.location.href = 'profile.html?anonymous=true'
            return
    }

    firebase.auth().signInWithPopup(provider)
        .then(result => { //handled by onAuthStateChanged()
            let user = result.user
            sessionStorage.setItem("fullName", user.displayName)
            window.location.href = 'carsNearby.html'
        })
        .catch(error => {
            console.log(error)
        })
}

function trySignOut() {
    try {
        firebase.auth().signOut()
            .then(() => { //handled by onAuthStateChanged()
                sessionStorage.removeItem("fullName")
                window.location.href = 'index.html'
            })
            .catch(error => {
                console.log(error)
            })
    } catch (e) {
        sessionStorage.removeItem("fullName")
        window.location.href = "index.html"
    }
}

