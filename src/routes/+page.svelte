<script>
    import {blog} from '../store/blog_store.js'
    import Blog from '../components/blog.svelte'

    import {Icon, ChevronDown} from "svelte-hero-icons";
</script>
<div class="flex bg-grey-500 h-full flex-col md:flex-row">
    <div class="flex-auto sm:w-96 w-64 row">
        <h1 class="text-3xl w-full">Blue Boules<span class="text-9xl text-blue-600">..</span></h1>
    </div>
    <div class="flex-auto w-80 ">

        {#each $blog as article}
            <Blog blog={article}></Blog>
        {/each}
    </div>
    <div class="flex-auto  lg:w-96 text-center">
        <h2>Tendances : </h2>
    </div>
</div>