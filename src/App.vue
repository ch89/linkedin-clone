<template>
	<template v-if="$store.state.user">
		<navbar></navbar>
		<main class="max-w-screen-lg mx-auto p-4">
			<sidebar></sidebar>
			<feed></feed>
			<widgets></widgets>
		</main>
	</template>
	<login v-else></login>
</template>

<script>
	import Navbar from "./components/Navbar"
	import Sidebar from "./components/Sidebar"
	import Feed from "./components/Feed"
	import Widgets from "./components/Widgets"
	import Login from "./components/Login"
	import { auth } from "./firebase"
	
	export default {
		components: { Navbar, Sidebar, Feed, Widgets, Login },
		created() {
			auth.onAuthStateChanged(user => this.$store.commit("auth", user))
		}
	}
</script>

<style>
	main {
		display: grid;
		grid-template-columns: 1fr 2fr 1fr;
		gap: 1rem;
		align-items: start;
	}
</style>