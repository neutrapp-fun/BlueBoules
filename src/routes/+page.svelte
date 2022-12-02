<script>
    import {blog} from '../store/blog_store.js'
    import Post from '../components/post.svelte'

    import {Icon, ChevronDown, Play} from "svelte-hero-icons";

    let filters = []

  let checkbox;
	let captcha = false;
  let disabled = true;

  function handleClick(event) {
    disabled = !checkbox.checked;

  }

</script>
<div class="flex bg-gray-50 h-screen text-gray-600">
    <div class="p-8 md:flex flex-col h-full justify-between hidden">
        <img src="logo.png" alt=""/>
        
        <form class="w-full max-w-sm p-8">
          <div class="text-center items-center justify-center ">
            <h1 class="text-xl text-[#5A5A5A] mb-6">Poster, pas de Taboo, Safe place</h1>
          </div>
          <div class="flex justify-center items-center mb-6">
            <div class="w-full">
              <input
                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#6A99C4]"
                id="inline-full-name"
                type="text"
                placeholder="Tags"
                required
              />
            </div>
          </div>
          <div class="flex justify-center mb-6">
            <div class="w-full">
              <textarea
                class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#6A99C4]"
                id="story"
                name="story"
                rows="5"
                cols="33"
                required
              />
            </div>
          </div>
          <div class=" mb-6">
            <div class="" />
            <label class=" block text-gray-500 font-bold">
              <input

                class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-bl"
                type="checkbox"
                bind:this={checkbox}
                on:click={handleClick}

              />
              <span class="text-sm"> je ne suis pas un robot </span>
            </label>
          </div>

          <div class="w-full group block buttons">
            <button {disabled} 
              class="absolute shadow transition bg-white hover:bg-[#6A99C4] focus:shadow-outline focus:outline-none text-slate-900 hover:text-white font-bold py-3 px-20 rounded "
              type="submit"
            >
              Envoyer
            </button>
          </div>
        </form>

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

<style>
  
	button:disabled {
    background-color: gray;
	}

  .buttons:hover button:disabled {
    @apply translate-x-64;
  }


</style>
