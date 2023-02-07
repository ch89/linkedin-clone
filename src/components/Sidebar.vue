<script setup>
	import {
		getFirestore,
		collection,
		onSnapshot,
		query,
		where,
		updateDoc,
		doc,
		deleteDoc,
		setDoc
	} from "firebase/firestore"
	import { getAuth } from "firebase/auth"
	import { ref } from "vue"
	import { useStore } from "vuex"

	const store = useStore()
	const { uid } = getAuth().currentUser
	const users = ref([])

	let follow = id => {
		if(store.state.follows.includes(id)) {
			deleteDoc(doc(getFirestore(), `users/${uid}/follows/${id}`))
		}
		else {
			setDoc(doc(getFirestore(), `users/${uid}/follows/${id}`), {})
		}
	}

	onSnapshot(
		query(collection(getFirestore(), "users"), where("uid", "!=", uid)),
		snapshot => users.value = snapshot.docs.map(doc => doc.data())
	)
</script>

<template>
	<div class="bg-white shadow rounded-lg p-4 grid gap-4">
		<header class="flex items-center justify-between">
			<h3 class="font-bold">Linkedin News</h3>
			<i class="fa-solid fa-circle-info text-blue-400"></i>
		</header>
		<div v-for="{ uid, displayName, photoURL } in users" class="flex items-center gap-4">
			<img :src="photoURL" alt="Avatar" class="w-10 h-10 object-cover rounded-full">
			<h3 class="text-sm font-semibold">{{ displayName }}</h3>
			<button @click="follow(uid)" class="ml-auto border border-blue-400 px-2 py-1 rounded-full text-xs font-semibold" :class="store.state.follows.includes(uid) ? 'bg-blue-400 text-white' : 'text-blue-400'">Follow</button>
		</div>
		<footer class="text-sm">Show all</footer>
	</div>
</template>