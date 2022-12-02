<script>
    import {blog} from '../store/blog_store.js'
    import Post from '../components/post.svelte'

    import {Icon, ChevronDown, Play} from "svelte-hero-icons";

    let filters = []

</script>
<div class="flex bg-gray-50 h-screen text-gray-600">
    <div class="p-8 md:flex flex-col h-full justify-between hidden">
        <img src="logo.png" alt=""/>
        <a href="/game">
            <div class="bg-black w-full h-48 flex flex-col items-center justify-center rounded-none hover:rounded-xl transition-all duration-300">
                <p class="text-center text-white font-bold text-xl">Blue Boules <br>The Game</p>
                <Icon src={Play} solid size="30" class="mt-4 text-white"/>

            </div>
        </a>
    </div>
    <div class="grow bg-white p-4 md:p-10">

        <div class="flex justify-between mb-4">
            <img src="logo.png" alt="" class="h-6 md:hidden flex"/>
            <div>
                {#each filters as tag}
                    <div>{tag}</div>
                {/each}
            </div>
            <button class="flex items-center justify-end hover:bg-gray-100 px-2 transition-all duration-300 rounded-xl">
                Filter 
                <Icon src={ChevronDown} solid size="30" class="ml-2 text-primary"/>
            </button>

        </div>

        {#each $blog as post}
            <Post {post}></Post>
        {/each}
    </div>
    <div class="w-52 p-8 hidden md:block">
        <h2>Tendances Top BBL </h2>
    </div>
</div>
