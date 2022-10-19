<script setup>
	import { getAuth } from "firebase/auth"
	import moment from "moment"

	const user = getAuth().currentUser
</script>

<template>
	<div class="bg-white shadow rounded-lg overflow-hidden text-center">
		<img src="/images/banner.avif" alt="Banner" class="h-24 w-full object-cover">
		<img :src="user.photoURL" alt="Avatar" class="w-16 h-16 object-cover rounded-full inline-block -mt-8 border-2 border-white">
		<div class="p-4 border-b">
			<h3 class="font-bold">{{ user.displayName }}</h3>
			<p class="text-sm text-gray-500">Joined {{ moment(user.metadata.creationTime).format("YYYY-MM-DD") }}</p>
		</div>
		<div class="p-4 text-sm">
			<div class="flex justify-between">
				<p>Who viewed you</p>
				<span class="font-semibold text-blue-500">0</span>
			</div>
			<div class="flex justify-between">
				<p>Views on post</p>
				<span class="font-semibold text-blue-500">0</span>
			</div>
		</div>
	</div>
</template>