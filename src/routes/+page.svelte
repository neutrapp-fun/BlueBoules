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


    let postContent = ""
    let postTags = ""

    async function addPost(){
        console.log(postContent)
        // const { data, error } = await supabase
		// 	.from('posts')
		// 	.insert({ content: postContent, status: 0, upvotes: 0})
		// 	.select()
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

</script>
<div class="flex bg-gray-50  text-gray-600">
    <div class="p-8 md:flex h-full flex-col justify-between hidden">
        <div>
            <h2 class="text-3xl">Mes Questions Indiscrètes</h2>
            <div class="flex flex-col mt-8">
                <a class="m-2" href="/">Soumettre un article</a>
                <a class="m-2" href="/">
                    <div class="flex">
                        Rejoindre le discord
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" class="w-5 h-5 ml-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"/>
                        </svg>
                    </div>
                </a>
                <a class="m-2" href="/">Contact</a>
            </div>
        </div>

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
					<span class="text-sm">Je ne suis pas un robot </span>
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

            </div>
        </a>
    </div>
    <div class="grow bg-white p-4 md:p-10">
        <div class="md:hidden text-3xl m-5">Mes Questions Indiscrètes</div>
        <div class="flex justify-between flex-col md:flex-row">

            <div>
                {#each filters as tag}
                    <div>{tag}</div>
                {/each}
            </div>
            <div class="justify-center sm:justify-start flex w-full ml-4 text-xl">
                Blog <span class="text-lg">- Retrouvez ici tout les posts anonymes</span>
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
            <a href="/">#Femme - 15k</a>
            <a href="/">#Femme - 15k</a>
            <a href="/">#Femme - 15k</a>
        </div>
        <div>
            <a class="m-2" href="/">
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
