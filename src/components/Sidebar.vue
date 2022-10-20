<script setup>
	import {
		getFirestore,
		collection,
		onSnapshot,
		query,
		where,
		updateDoc,
		doc,
		arrayUnion,
		arrayRemove
	} from "firebase/firestore"
	import { getAuth } from "firebase/auth"
	import { ref } from "vue"
	import { useStore } from "vuex"

	const store = useStore()
	const { uid } = getAuth().currentUser
	const users = ref([])

	let follow = id => {
		console.log(store.state.user.follows.includes(id))
		
		updateDoc(doc(getFirestore(), `users/${uid}`), {
			follows: store.state.user.follows.includes(id) ? arrayRemove(id) : arrayUnion(id)
		})
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
		<div v-for="{ uid, name, avatar } in users" class="flex items-center gap-4">
			<img :src="avatar" alt="Avatar" class="w-10 h-10 object-cover rounded-full">
			<h3 class="text-sm font-semibold">{{ name }}</h3>
			<button @click="follow(uid)" class="ml-auto border border-blue-400 px-2 py-1 rounded-full text-xs font-semibold" :class="store.state.user.follows.includes(uid) ? 'bg-blue-400 text-white' : 'text-blue-400'">Follow</button>
		</div>
		<footer class="text-sm">Show all</footer>
	</div>
</template>