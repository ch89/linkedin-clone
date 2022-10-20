<script setup>
	import Navbar from "./components/Navbar.vue"
	import Profile from "./components/Profile.vue"
	import Feed from "./components/Feed.vue"
	import Sidebar from "./components/Sidebar.vue"
	import { ref } from "vue"
	import { useStore } from "vuex"
	import {
		getAuth,
		onAuthStateChanged,
		signInWithPopup,
		GoogleAuthProvider
	} from "firebase/auth"
	import { getFirestore, doc, setDoc } from "firebase/firestore"

	const store = useStore()

	onAuthStateChanged(getAuth(), user => {
		store.commit("auth", {
			uid: user.uid,
			name: user.displayName,
			avatar: user.photoURL,
			follows: []
		})

		if(user) {
			setDoc(doc(getFirestore(), `users/${user.uid}`), store.state.user)
		}
	})
</script>

<template>
	<template v-if="store.state.user">
		<navbar></navbar>
		<main class="max-w-screen-lg mx-auto p-4 grid grid-cols-[1fr_2fr_1fr] gap-4 items-start">
			<profile></profile>
			<feed></feed>
			<sidebar></sidebar>
		</main>
	</template>
	<div v-else class="h-screen grid place-items-center">
		<div class="bg-white shadow rounded-lg p-8 flex flex-col gap-4 w-96">
			<img src="/images/logo.png" alt="Logo" class="w-36 self-center">
			<form class="grid gap-4 text-sm">
				<input class="border px-4 py-2 rounded-lg outline-none" type="email" placeholder="Email">
				<input class="border px-4 py-2 rounded-lg outline-none" type="password" placeholder="Password">
				<button type="button" @click="signInWithPopup(getAuth(), new GoogleAuthProvider)" class="bg-blue-400 text-white py-2 rounded-lg font-bold">Sign In</button>
			</form>
		</div>
	</div>
</template>