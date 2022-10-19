import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import { initializeApp } from "firebase/app"

initializeApp({
	apiKey: "AIzaSyDQPXoCawBlWWuw1__FlVQUANxdYGQ3-mY",
	authDomain: "linkedin-clone-b57a4.firebaseapp.com",
	projectId: "linkedin-clone-b57a4",
	storageBucket: "linkedin-clone-b57a4.appspot.com",
	messagingSenderId: "249654819762",
	appId: "1:249654819762:web:6b3d41611f5cf8bce4c2ab",
	measurementId: "G-YNTNKXJ5DJ"
})

createApp(App).mount('#app')
