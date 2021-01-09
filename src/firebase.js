import firebase from "firebase"

let app = firebase.initializeApp({
	apiKey: "AIzaSyBYuLUlTBiq0arCGZDDPEslTKHnG612s9I",
	authDomain: "linkedin-clone-56c3c.firebaseapp.com",
	projectId: "linkedin-clone-56c3c",
	storageBucket: "linkedin-clone-56c3c.appspot.com",
	messagingSenderId: "461931223984",
	appId: "1:461931223984:web:a033d83e61996e2b9b1475",
	measurementId: "G-8N8Z536MTM"
})

const db = app.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { db, auth, provider }