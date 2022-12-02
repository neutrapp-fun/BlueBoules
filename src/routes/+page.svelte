<script>
    import {blog} from '../store/blog_store.js'
    import Post from '../components/post.svelte'

    import {Icon, ChevronDown, Play} from "svelte-hero-icons";

	import supabase from '../lib/supabase';

	async function getTags() {
		const { data, error } = await supabase.from('tags').select();

		tags = data;
	}
	getTags();


    let postContent = "";
    let postTags = ""

    async function addPost(){
        const { data, error } = await supabase
            .from('posts')
            .insert({ content: postContent, status: 0, upvotes: 0})
            .select()

        let post_id = data[0].id

        postTags = postTags.split(";")
        let tagsGetError = false
        let tagsError = []
        for(const tag of postTags){
            const { data, error } = await supabase
            .from('tags')
            .select('*')
            .eq('name', tag.toUpperCase())

            let dataResult = data

            if(data.length == 0){
                tagsGetError = true
                tagsError.push(tag)
            }else{

                const { data, error } = await supabase
                .from('posts_tags')
                .insert({fk_posts: post_id, fk_tags: dataResult[0].id})
            }
        }
    }

    async function getBlogs(){
        let { data, error } = await supabase
            .rpc('get_posts_by_tags', {
                tags_1 : (filters[0] == null ? "": filters[0]), 
                tags_2: (filters[1] == null ? "": filters[1]), 
                tags_3: (filters[2] == null ? "": filters[2])
            })

            blog.set(data)
    };

	let tags = [];
	let tagSelected = 'FILTRE';


	let filters = [];
	function addTag() {
		if(filters.length == 0){
			filters = [tagSelected]
		}else{
			if(tagSelected != "FILTRE")
		    	filters = [...filters, tagSelected].filter((val, index, newlist)=> newlist.indexOf(val) == index)
		}
        
        getBlogs()
	}
    function removeTag(tag){
        filters = filters.filter(function(value, index, arr){ 
        return value != tag;
        })
        getBlogs()
    }

	let checkbox;
	let captcha = false;
	let disabled = true;


	function handleClick(event) {
		disabled = !checkbox.checked;
	}

</script>



<div class="flex bg-gray-50  text-gray-600">
	<div class="p-8 md:flex flex-col h-full justify-between hidden">
        <h2 class="text-3xl text-blue-700 font-bold">Mes Questions Indiscrètes</h2>

		<div class="w-full rounded-md mt-12">
			<div class="items-center justify-center ">
				<h1 class="text-xl text-[#5A5A5A] mb-6">Ecrivez, pas de Taboo, Safe place</h1>
			</div>
			<div class="flex justify-center items-center mb-6">
				<div class="w-full">
					<input
						bind:value={postTags}
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
						bind:value={postContent}
						class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-[#6A99C4]"
						rows="5"
						cols="33"
                		placeholder="Je ne sais pas comment faire plaisir à mon partenaire....."
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

			<div class="w-full group buttons">
				<button
					{disabled}
					class="shadow transition bg-white hover:bg-[#6A99C4] focus:shadow-outline focus:outline-none text-slate-900 hover:text-white font-bold py-3 px-20 rounded "
                    on:click={addPost}
				>
					Envoyer
				</button>
			</div>
		</div>
		<a href="/game">
			<div
				class="mt-8 w-full h-48 relative flex flex-col items-center justify-center rounded-none hover:rounded-xl transition-all duration-300"
			>
				<img src="game/img_01.webp" class="absolute w-full h-48 z-10 rounded-none hover:rounded-xl"/>
				<p class="text-center text-white font-bold text-xl z-50">Blue Boules <br />The Game</p>
				<Icon src={Play} solid size="30" class="mt-4 text-white z-50" />
			</div>
		</a>
	</div>
	<div class="grow bg-white p-4 md:p-10">
		<div class="flex justify-between mb-4">
			<div class="justify-center sm:justify-start flex w-full ml-4 text-xl">
                Blog <span class="text-lg">- Retrouvez ici tout les posts anonymes</span>
            </div>
			<div class="flex items-center space-x-2">
				{#each filters as a}
                    <button on:click={removeTag(a)}>
                        <div class="p-1 rounded-xl border border-gray-100">{a}</div>
                    </button>
				{/each} 
			</div>
			<select
				bind:value={tagSelected}
				on:change={addTag}
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2"
			>
				<option selected>FILTRE</option>
				{#each tags as tag}

					<option value={tag.name}>{tag.name}</option>
				{/each}
			</select>
		</div>

        {#each $blog as post}
            <Post {post}></Post>
        {/each}
    </div>
    <div class="w-52 p-8 hidden md:block">
        <h2 class="text-md mb-4">Tendances Top BBL </h2>
        <div class="flex flex-col text-sm text-gray-900">
            <a href="/">#Femme - 15k</a>
            <a href="/">#Femme - 15k</a>
            <a href="/">#Femme - 15k</a>
        </div>
		<div class="flex flex-col mt-8">
			<a class="m-2" href="https://discord.gg/yBJsbQFF">
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
</div>


<style>
	button:disabled {
		background-color: gray;
	}
	.buttons:hover button:disabled {
		@apply translate-x-64;
	}
</style>