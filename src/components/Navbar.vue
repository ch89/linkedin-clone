<template>
	<nav class="shadow-md bg-white sticky top-0 z-10">
		<div class="max-w-screen-lg mx-auto flex items-center justify-between px-4 py-2">
			<div class="flex gap-4">
				<a href="#" class="text-linkedin-blue" @click="logout">
					<i class="fab fa-linkedin text-4xl"></i>
				</a>
				<div class="bg-linkedin-light-gray text-linkedin-dark-gray flex items-center rounded-lg px-4">
					<i class="fas fa-search mr-2"></i>
					<input class="bg-transparent focus:outline-none" placeholder="Search">
				</div>
			</div>
			<div class="flex items-center gap-4 text-linkedin-dark-gray">
				<a href="#" class="flex flex-col items-center hover:text-gray-800">
					<i class="fas fa-home text-xl"></i>
					<span class="text-sm">Home</span>
				</a>
				<a href="#" class="flex flex-col items-center hover:text-gray-800">
					<i class="fas fa-user-friends text-xl"></i>
					<span class="text-sm">My Network</span>
				</a>
				<a href="#" class="flex flex-col items-center hover:text-gray-800">
					<i class="fas fa-briefcase text-xl"></i>
					<span class="text-sm">Jobs</span>
				</a>
				<a href="#" class="flex flex-col items-center hover:text-gray-800">
					<i class="fas fa-comment text-xl"></i>
					<span class="text-sm">Messages</span>
				</a>
				<a href="#" class="flex flex-col items-center hover:text-gray-800">
					<i class="fas fa-bell text-xl"></i>
					<span class="text-sm">Notifications</span>
				</a>
			</div>
		</div>
	</nav>
</template>

<script>
	import { auth } from "../firebase"
	
	export default {
		methods: {
			logout() {
				auth.signOut()
			}
		}
	}
</script>