<script setup>
	import Post from "./Post.vue"
	import { ref } from "vue"
	import { getAuth } from "firebase/auth"
	import { useStore } from "vuex"
	import {
		getFirestore,
		collection,
		onSnapshot,
		setDoc,
		doc,
		serverTimestamp,
		query,
		orderBy,
		where
	} from "firebase/firestore"
	import {
		getStorage,
		ref as storageRef,
		uploadString,
		getDownloadURL
	} from "firebase/storage"

	const store = useStore()
	const user = getAuth().currentUser
	const posts = ref([])
	const message = ref("")
	const photo = ref(null)
	const loading = ref(false)

	let reader = new FileReader
	reader.addEventListener("load", e => photo.value = reader.result)
	let preview = e => reader.readAsDataURL(e.target.files[0])

	let add = async e => {
		loading.value = true

		let docRef = doc(collection(getFirestore(), "posts"))

		let data = {
			name: user.displayName,
			avatar: user.photoURL,
			uid: user.uid,
			message: message.value,
			likes: [],
			timestamp: serverTimestamp()
		}

		if(photo.value) {
			let photoRef = storageRef(getStorage(), docRef.id)
			await uploadString(photoRef, photo.value, "data_url")
			data.photo = await getDownloadURL(photoRef)
		}

		await setDoc(docRef, data)

		message.value = ""
		photo.value = null
		loading.value = false
	}

	let unsubscribe

	onSnapshot(
		collection(getFirestore(), `users/${user.uid}/follows`),
		snapshot => {
			let uids = snapshot.docs.map(doc => doc.id)

			store.commit("follows", uids)

			if(unsubscribe) unsubscribe()

			unsubscribe = onSnapshot(
				query(
					collection(getFirestore(), "posts"),
					where("uid", "in", [user.uid, ...uids]),
					orderBy("timestamp", "desc")
				),
				snapshot => posts.value = snapshot.docs.map(doc => ({
					id: doc.id,
					...doc.data()
				}))
			)
		}
	)
</script>

<template>
	<div class="grid gap-4">
		<div class="bg-white shadow p-4 rounded-lg grid gap-4">
			<form class="flex" @submit.prevent="add">
				<input placeholder="Write a post" class="border px-4 py-2 rounded-l-lg flex-1 outline-none" v-model.trim="message" required>
				<button class="bg-blue-400 text-white px-4 rounded-r-lg text-sm font-semibold" :class="{ loading, 'opacity-50 cursor-not-allowed': ! message }" :disabled="loading">Send</button>
			</form>
			<img :src="photo" v-if="photo" @click="photo = null" class="w-36 rounded-lg cursor-pointer">
			<div class="flex justify-evenly">
				<label class="flex items-center gap-2 cursor-pointer">
					<i class="fa-solid fa-camera text-xl text-[#70B5F9]"></i>
					<span class="text-sm font-semibold">Photo</span>
					<input type="file" accept="image/*" hidden @change="preview">
				</label>
				<button class="flex items-center gap-2">
					<i class="fa-solid fa-video text-xl text-[#E7A33E]"></i>
					<span class="text-sm font-semibold">Video</span>
				</button>
				<button class="flex items-center gap-2">
					<i class="fa-solid fa-calendar-check text-xl text-[#CEA2CC]"></i>
					<span class="text-sm font-semibold">Event</span>
				</button>
				<button class="flex items-center gap-2">
					<i class="fa-solid fa-newspaper text-xl text-[#7FC15E]"></i>
					<span class="text-sm font-semibold">Article</span>
				</button>
			</div>
		</div>
		<post v-for="post in posts" :key="post.id" :post="post"></post>
	</div>
</template>

<style scoped>
	.loading {
		@apply text-transparent cursor-not-allowed grid place-items-center after:absolute after:w-4 after:h-4 after:border-2 after:border-white after:rounded-full after:border-r-transparent after:border-t-transparent after:animate-spin;
	}
</style>