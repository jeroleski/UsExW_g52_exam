const auth = firebase.auth()
const googleProvider = new firebase.auth.GoogleAuthProvider()
const facebookProvider = new firebase.auth.FacebookAuthProvider()
const appleProvider = new firebase.auth.OAuthProvider('apple.com')


function signIn(p) {
    let provider
    switch (p) {
        case "google":
            provider = googleProvider
            break
        case "facebook":
            provider = facebookProvider
            break
        case "apple":
            provider = appleProvider
            break
        default:
            return
    }

    auth.signInWithPopup(provider)
        .then(result => {
            let user = result.user
            console.log(user)
        })
        .catch(error => {
            console.log(error)
        })
}

