<script>
    import {blog} from '../store/blog_store.js'
    import Blog from '../components/blog.svelte'
</script>
<div class="flex bg-grey-500 h-full">
    <div class="flex-auto w-96 row">
        <h1 class="text-3xl w-full">Blue Boules<span class="text-9xl text-blue-600">..</span></h1>
    </div>
    <div class="flex-auto w-full text-center">
        {#each $blog as article}
                <Blog blog={article}></Blog>
            {/each}
    </div>
    <div class="flex-auto w-64 text-center">
        03
    </div>
</div>