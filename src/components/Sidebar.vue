<template>
	<div class="shadow-md rounded-lg overflow-hidden text-center bg-white">
		<img src="https://images.unsplash.com/photo-1587587004741-ea9a81b70bf9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" class="-mb-8 h-24 w-full object-cover">
		<img src="/images/avatar1.jpg" alt="Avatar" class="w-16 rounded-full inline-block border-2 border-white">
		<div class="p-4 border-b">
			<h3 class="font-bold">{{ user.displayName }}</h3>
			<span class="text-gray-500 text-sm">{{ user.email }}</span>
		</div>
		<div class="p-4">
			<div class="flex justify-between text-sm">
				<p class="text-gray-500">Who viewed you</p>
				<span class="text-linkedin-blue font-bold">54</span>
			</div>
			<div class="flex justify-between text-sm">
				<p class="text-gray-500">Views on post</p>
				<span class="text-linkedin-blue font-bold">78</span>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState } from "vuex"

	export default {
		computed: mapState(["user"])
	}
</script>