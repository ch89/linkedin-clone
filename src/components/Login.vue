<template>
	<div class="flex flex-col items-center justify-center h-screen">
		<img src="https://logos-world.net/wp-content/uploads/2020/04/Linkedin-Logo-2011%E2%80%932019.png" alt="Logo" class="w-64">
		<button class="bg-linkedin-blue text-white px-4 py-2 rounded-lg font-bold w-64" @click="login">Sign In</button>
	</div>
</template>

<script>
	import { auth, provider } from "../firebase"

	export default {
		methods: {
			login() {
				auth.signInWithPopup(provider).catch(error => alert(error.message))
			}
		}
	}
</script>