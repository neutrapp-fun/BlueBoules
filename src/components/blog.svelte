<script>
    import {createClient} from "@supabase/supabase-js";

    export let blog;

    import { Icon, ArrowSmUp } from "svelte-hero-icons";
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    const supabaseUrl = 'https://xdcuxkatfeggqpppxozd.supabase.co'
    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkY3V4a2F0ZmVnZ3FwcHB4b3pkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njk5MTg3MzMsImV4cCI6MTk4NTQ5NDczM30.lXzcXuFYte89BEF4Jf4LMSQI41Vvd-t4Ynl2LHF_gQk"
    const supabase = createClient(supabaseUrl, supabaseKey)
    async function upvote(id, upvote) {

        const {error} = await supabase
            .from('posts')
            .update({upvotes: upvote + 1})
            .eq('id', id)
        blog.upvotes +=1
    }

    console.log(blog.tags)
</script>

<div class="m-4 border-b pb-4 mb-6">
    <div class="flex ">
        <img class="rounded-full mr-4" src="https://picsum.photos/50/50?{getRandomInt(200)}" alt="">
        <div class="text-lg text-gray-700 flex items-center w-full">
            <div class="flex justify-between w-full">
                <h2>
                    Anonym{getRandomInt(2000)}
                    <span class="text-sm text-gray-600 ml-2">{(blog.tags != null ? blog.tags.split(",").join(" | "): "Aucun tag")}</span>
                </h2>
                <div class="flex content-center">
                    <button on:click={upvote(blog.id,blog.upvotes)}> <Icon src="{ArrowSmUp}"  size="25" class="ml-2 text-primary"/></button>
                    {blog.upvotes}
                </div>
            </div>
        </div>
    </div>
    <div class="flex flex-col align-left ml-16">
        <h2 class="text-left">{blog.content}</h2>
        <h4 class="text-left text-xs mt-2">{blog.date}</h4>
    </div>
</div>