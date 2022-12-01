<script>
    export let blog;
    console.log(blog)

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    let tag = blog.tags.split(";").join(' | ')
</script>

<div class="m-4">
    <div class="flex">
        <img class="rounded-full mr-4" src="https://picsum.photos/50/50?{getRandomInt(200)}" alt="">
        <h2 class="text-lg text-gray-700 flex items-center">Anonym{getRandomInt(2000)} <span
                class="text-sm text-gray-600">  - {tag}</span></h2>
    </div>
    <div class="flex flex-col align-left">
        <h2 class="ml-16 text-left">{blog.content}</h2>
        <h4 class="ml-16 text-left text-xs mt-2">{blog.date.split("T")[1]} - {blog.date.split("T")[0]}</h4>

    </div>

</div>