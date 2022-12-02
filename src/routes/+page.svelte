<script>
    import {blog} from '../store/blog_store.js'
    import Post from '../components/post.svelte'

    import {Icon, ChevronDown, Play} from "svelte-hero-icons";

    let filters = []

</script>
<div class="flex bg-gray-50  text-gray-600">
    <div class="p-8 md:flex h-full flex-col justify-between hidden">
        <div>
            <div>

                <h2 class="text-3xl">Mes Questions Indiscrètes</h2>

            </div>
            <div class="flex flex-col mt-8">
                <a class="m-2" href="">Soumettre un article</a>
                <a class="m-2" href="">
                    <div class="flex">
                        Rejoindre le discord
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" class="w-5 h-5 ml-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"/>
                        </svg>
                    </div>
                </a>
                <a class="m-2" href="">Contact</a>
            </div>
        </div>

        <a href="/game" class="mt-32">
            <div class="bg-black w-full h-48 flex flex-col items-center justify-center rounded-none hover:rounded-xl transition-all duration-300">
                <p class="text-center text-white font-bold text-xl">Blue Boules <br>The Game</p>
                <Icon src={Play} solid size="30" class="mt-4 text-white"/>

            </div>
        </a>
    </div>
    <div class="grow bg-white p-4 md:p-10">
        <div class="md:hidden text-3xl m-5">Mes Questions Indiscrètes
        </div>
        <div>
            <div class=" flex-row mt-8 mb-4  md:hidden flex ">
                <a class="m-2 text-center" href="">Soumettre un article</a>
                <a class="m-2 text-center" href="">Rejoindre le discord</a>
                <a class="m-2 text-center" href="">Contact</a>
                <a class="m-2 text-center" href="/game">Mise en situation</a>
            </div>
        </div>
        <div class="flex justify-between flex-col md:flex-row">

            <div>
                {#each filters as tag}
                    <div>{tag}</div>
                {/each}
            </div>
            <div class="justify-center sm:justify-start flex w-full ml-4 text-xl mb-4">
                Blog - Retrouvez ici tout les posts anonymes
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
        <h2 class="text-md mb-4">Tendances Top BBL </h2>
        <div class="flex flex-col text-sm text-gray-900">
            <a>#Femme - 15k</a>
            <a>#FEMME - 15k</a>
            <a>#FEMME - 15k</a>
        </div>
        <div>
            <a class="m-2" href="">
                <div class="flex">
                    Rejoindre le discord
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="w-5 h-5 ml-4">
                        <path stroke-linecap="round" stroke-linejoin="round"
                              d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"/>
                    </svg>
                </div>
            </a>
        </div>
    </div>
</div>
