<script setup>
	import { getAuth, signOut } from "firebase/auth"

	const { photoURL } = getAuth().currentUser
</script>

<template>
	<nav class="bg-white shadow sticky top-0 z-10">
		<div class="max-w-screen-lg mx-auto p-4 flex gap-4">
			<i class="fa-brands fa-linkedin text-4xl text-blue-500"></i>
			<form class="bg-gray-100 text-gray-500 flex items-center gap-2 px-4 rounded-lg border">
				<i class="fa-solid fa-magnifying-glass"></i>
				<input placeholder="Search" class="bg-transparent outline-none">
			</form>
			<div class="flex items-center gap-4 text-xl ml-auto">
				<i class="fa-solid fa-house"></i>
				<i class="fa-regular fa-user"></i>
				<i class="fa-regular fa-heart"></i>
				<i class="fa-regular fa-comment"></i>
				<i class="fa-regular fa-bell"></i>
				<img :src="photoURL" alt="Avatar" class="w-8 h-8 object-cover rounded-full cursor-pointer" @click="signOut(getAuth())">
			</div>
		</div>
	</nav>
</template>