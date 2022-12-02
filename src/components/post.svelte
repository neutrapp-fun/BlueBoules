<script>
    import {upVote} from "../store/blog_store.js";

    export let post;

    import { Icon, ArrowSmUp } from "svelte-hero-icons";
    const onUpVotePressed = async (post) => {
        console.log("press")
        post.votes = await upVote(post.id);

    }
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
</script>

<div class="m-4">
    <div class="flex ">
        <img class="rounded-full mr-4" src="https://picsum.photos/50/50?{getRandomInt(200)}" alt="">
        <div class="text-lg text-gray-700 flex items-center w-full">
            <div class="flex justify-between w-full">
                <h2>
                    Anonym{getRandomInt(2000)}
                    <span class="text-sm text-gray-600"> - {post.tags}</span>
                </h2>
                <div class="flex content-center">
                    <button on:click|once={onUpVotePressed(post)}> <Icon src="{ArrowSmUp}"  size="25" class="ml-2 text-primary"/></button>
                    {post.upvotes}
                </div>
            </div>
        </div>
    </div>
    <div class="flex flex-col align-left">
        <h2 class="ml-16 text-left">{post.content}</h2>
        <h4 class="ml-16 text-left text-xs mt-2">{post.date}</h4>

    </div>

</div>