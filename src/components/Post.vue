<script setup>
	import moment from "moment"
	import {
		getFirestore,
		doc,
		deleteDoc,
		updateDoc,
		arrayUnion,
		arrayRemove
	} from "firebase/firestore"
	import { getStorage, ref as storageRef, deleteObject } from "firebase/storage"
	import { getAuth } from "firebase/auth"

	const props = defineProps(["post"])
	const { uid } = getAuth().currentUser

	let like = e => {
		updateDoc(doc(getFirestore(), `posts/${props.post.id}`), {
			likes: props.post.likes.includes(uid) ? arrayRemove(uid) : arrayUnion(uid)
		})
	}

	let remove = e => {
		deleteDoc(doc(getFirestore(), `posts/${props.post.id}`))
		deleteObject(storageRef(getStorage(), props.post.id))
	}
</script>

<template>
	<div class="bg-white shadow rounded-lg">
		<div class="p-4 grid gap-4">
			<div class="flex gap-4 items-start">
				<img :src="post.avatar" alt="Avatar" class="w-12 h-12 object-cover rounded-full">
				<div>
					<h3 class="font-bold">{{ post.name }}</h3>
					<p class="text-sm text-gray-500">{{ moment(post.timestamp?.toDate()).fromNow() }}</p>
				</div>
				<button class="ml-auto" @click="remove">
					<i class="fa-solid fa-ellipsis"></i>
				</button>
			</div>
			<p>{{ post.message }}</p>
		</div>
		<img :src="post.photo" alt="Photo" class="w-full">
		<div class="p-4 flex justify-evenly">
			<button @click="like" class="flex items-center gap-2">
				<i class="fa-heart" :class="post.likes.includes(uid) ? 'fa-solid text-red-400' : 'fa-regular'"></i>
				<span class="text-sm">{{ post.likes.length }}</span>
			</button>
			<button class="flex items-center gap-2">
				<i class="fa-regular fa-comment"></i>
				<span class="text-sm">0</span>
			</button>
			<button class="flex items-center gap-2">
				<i class="fa-solid fa-share"></i>
				<span class="text-sm">0</span>
			</button>
			<button class="flex items-center gap-2">
				<i class="fa-regular fa-paper-plane"></i>
				<span class="text-sm">0</span>
			</button>
		</div>
	</div>
</template>