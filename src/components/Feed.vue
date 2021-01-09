<template>
	<div class="flex flex-col gap-4">
		<div class="shadow-md p-4 bg-white rounded-lg">
			<form class="mb-4" @submit.prevent="add">
				<div class="border rounded-full px-4 py-2 flex items-center gap-2 text-linkedin-dark-gray">
					<i class="fas fa-pen"></i>
					<input class="flex-1 focus:outline-none" placeholder="Write a post" v-model="form.message">
				</div>
				<!-- <div class="border rounded-full px-4 py-2 flex items-center gap-2 text-linkedin-dark-gray">
					<i class="fas fa-pen"></i>
					<input class="flex-1 focus:outline-none" placeholder="Image URL" v-model="form.image">
				</div> -->
				<button class="hidden">Add</button>
			</form>
			<div class="flex items-center justify-evenly">
				<button class="flex items-center gap-2 focus:outline-none">
					<i class="far fa-image text-xl" style="color: #70B5F9"></i>
					<span class="text-sm text-gray-500 font-semibold">Photo</span>
				</button>
				<button class="flex items-center gap-2 focus:outline-none">
					<i class="fab fa-youtube text-xl" style="color: #E7A33E"></i>
					<span class="text-sm text-gray-500 font-semibold">Video</span>
				</button>
				<button class="flex items-center gap-2 focus:outline-none">
					<i class="far fa-calendar-check text-xl" style="color: #CEA2CC"></i>
					<span class="text-sm text-gray-500 font-semibold">Event</span>
				</button>
				<button class="flex items-center gap-2 focus:outline-none">
					<i class="far fa-calendar-alt text-xl" style="color: #7FC15E"></i>
					<span class="text-sm text-gray-500 font-semibold">Write Article</span>
				</button>
			</div>
		</div>
		<transition-group name="posts">
			<post v-for="post in posts" :key="post.id" :post="post" @remove="remove"></post>
		</transition-group>
	</div>
</template>

<script>
	import Post from "./Post"
	import { db } from "../firebase"
	import firebase from "firebase"
	import { mapState } from "vuex"

	export default {
		components: { Post },
		computed: mapState(["user"]),
		created() {
			db.collection("posts").orderBy("time", "desc").onSnapshot(snapshot => {
				this.posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
			})
		},
		data() {
			return {
				form: {},
				// posts: [
				// 	{ id: 1, message: "Hello", image: "https://images.unsplash.com/photo-1609965803451-43c6e8d7b346?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" },
				// 	{ id: 2, message: "Whats up?", image: "https://images.unsplash.com/photo-1609964729554-a02fb2a04830?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=701&q=80" },
				// 	{ id: 3, message: "Nice dude", image: "https://images.unsplash.com/photo-1609927707561-62c9ca117a37?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80" },
				// ]
				posts: []
			}
		},
		methods: {
			add() {
				db.collection("posts").add({
					...this.form,
					name: this.user.displayName,
					time: firebase.firestore.FieldValue.serverTimestamp()
				}).then(() => this.form = {})
			},
			remove(post) {
				db.collection("posts").doc(post.id).delete()
			}
		}
	}
</script>

<style>
	/*.posts-enter-active {
		animation: bounce 1s;
	}

	.posts-leave-active {
		animation: bounce 1s reverse;
	}

	@keyframes bounce {
		0% {
			transform: scale(0);
		}
		50% {
			transform: scale(1.2);
		}
		100% {
			transform: scale(1);
		}
	}*/

	.post {
		transition: 1s;
	}

	.posts-enter-from, .posts-leave-to {
		opacity: 0;
		/*transform: scale(0) rotate(360deg);*/
		/*transform: translateY(-100%);*/
	}
</style>