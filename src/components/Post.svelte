<script>
	import { upVote } from '../store/blog_store.js';

	export let post;

	import { Icon, ArrowSmUp } from 'svelte-hero-icons';

	const onUpVotePressed = async (post) => {
		post.upvotes = await upVote(post.id);
	};
	function getRandomInt(max) {
		return Math.floor(Math.random() * max);
	}

	let timestamp = new Date(Date.parse(post.date));
	let date =
		timestamp.getHours() +
		':' +
		timestamp.getMinutes() +
		' ' +
		timestamp.getDate() +
		'/' +
		(timestamp.getMonth() + 1) +
		'/' +
		timestamp.getFullYear();
</script>

<div class="m-4 border-t border-gray-100 pt-4">
	<div class="flex w-full">
		<div class="text-lg text-gray-700 flex justify-between items-center w-full">
			<div>
				Anonym{getRandomInt(2000)}
				<span class="text-sm text-gray-600 ml-2">
					{post.tags == null ? 'Pas de Tag' : post.tags.split(',').join(' | ')}</span
				>
			</div>
			<div class="flex content-center">
				<button on:click|once={onUpVotePressed(post)}>
					<Icon src={ArrowSmUp} size="25" class="ml-2 text-primary" /></button
				>
				{post.upvotes}
			</div>
		</div>
	</div>
	<div class="flex flex-col align-left">
		<h2>{post.content}</h2>
		<h4 class="text-xs mt-2">{date}</h4>
	</div>
</div>
