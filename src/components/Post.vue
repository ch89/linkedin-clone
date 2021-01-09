<template>
	<div class="shadow-md bg-white rounded-lg post">
		<div class="p-4">
			<div class="flex items-start mb-4">
				<img src="https://media-exp1.licdn.com/dms/image/C4E0BAQEYohR_WeiftA/company-logo_100_100/0/1592899517072?e=1617840000&v=beta&t=I1oxFxB6zSlVHI7QVElj6EEF4fvmElCCwdhL82KWKT8" alt="Avatar" class="w-12 mr-4">
				<div>
					<h3 class="text-sm font-bold">{{ post.name }}</h3>
					<p class="text-gray-500 text-xs">Description</p>
				</div>
				<button class="text-linkedin-dark-gray ml-auto" @click="$emit('remove', post)">
					<i class="fas fa-ellipsis-h"></i>
				</button>
			</div>
			<p class="text-sm">{{ post.message }}</p>
		</div>
		<img :src="post.image" alt="Image" v-if="post.image" class="h-64 w-full object-cover">
		<div class="flex items-center justify-evenly text-linkedin-dark-gray p-4">
			<button class="flex items-center gap-2 focus:outline-none">
				<i class="far fa-thumbs-up"></i>
				<span class="text-sm font-semibold">Like</span>
			</button>
			<button class="flex items-center gap-2 focus:outline-none">
				<i class="fas fa-share"></i>
				<span class="text-sm font-semibold">Comment</span>
			</button>
			<button class="flex items-center gap-2 focus:outline-none">
				<i class="fas fa-paper-plane"></i>
				<span class="text-sm font-semibold">Share</span>
			</button>
			<button class="flex items-center gap-2 focus:outline-none">
				<i class="far fa-thumbs-up"></i>
				<span class="text-sm font-semibold">Send</span>
			</button>
		</div>
	</div>
</template>

<script>
	export default {
		props: ["post"]
	}
</script>