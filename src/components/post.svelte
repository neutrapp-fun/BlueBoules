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


let timestamp = new Date(Date.parse(post.date))
let date = timestamp.getHours()+
          ":"+timestamp.getMinutes()+
          " "+timestamp.getDate()+
          "/"+(timestamp.getMonth()+1)+
          "/"+timestamp.getFullYear()

</script>

<div class="border-b pb-4 mb-6">
    <div class="flex ">
        <img class="rounded-full mr-4" src="https://picsum.photos/50/50?%7BgetRandomInt(200)%7D" alt="">
        <div class="text-lg text-gray-700 flex items-center w-full">
            <div class="flex justify-between w-full">
                <h2>
                    Anonym{getRandomInt(2000)}
                    <span class="text-sm text-gray-600 ml-2">{(post.tags !=null ? post.tags.split(",").join(" | ") :"Pas de tag")}</span>
                </h2>
                <div class="flex content-center hover:bg-gray-100 pr-3 transition-all duration-300 rounded-xl">
                    <button on:click|once={onUpVotePressed(post)}> <Icon src="{ArrowSmUp}"  size="25" class="ml-2 text-primary"/></button>
                    {post.upvotes}
                </div>
            </div>
        </div>
    </div>
    <div class="flex flex-col align-left">
        <h2 class="ml-16 text-left">{post.content}</h2>
        <h4 class="ml-16 text-left text-xs mt-2">{date}</h4>

    </div>

</div>