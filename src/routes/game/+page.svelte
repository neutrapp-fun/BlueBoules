<script>
    import { Icon, ArrowSmRight } from "svelte-hero-icons";

    let gameStart = false

    let dangerCount = 0

    let gameState = 0

    let gameData = [
        {
            text: "Vous vous trouvez dans une soirée étudiante. La soirée bat son plein. Après quelque shot de vodka, vous remarquez une personne et décider de l'aborder. Suite à vos échanges langoureux, la personne fait le premier pas et décide de vous embrassez. Que faites vous ?",
            actions: [
                {
                    text: "Je la repousse car je n'ai pas de protection orale",
                    state: 1
                },
                {
                    text: "Je l'embrasse en retour",
                    state: 2
                }
            ],
            img: "/game/img_01.webp"
        },
        {
            text: "Vous la repoussez et vous lui faites la remarque que vous n'avez aucune protection orale. Elle se fout de votre gueule et vous indique qu'il n'y aucun risque de transmission d'IST lors d'un baiser (il faut sortir de sa grotte).",
            actions: [
                {
                    text: "Je passe à la suite",
                    state: 1
                },
            ],
            img: "/game/img_02.webp"
        },
        {
            text: "Vous vous éclipsez puis vous embrassez. Vous décidez de prendre la situation en main. Suite a la demande de consentement, vous passez à l'étape suivante. Vos mains glissent doucement et un choix s'offre à vous.",
            actions: [
                {
                    text: "Je refuse de masturber la personne car je risque d'avoir une IST",
                    state: 1
                },
                {
                    text: "Je souhaite lui faire plaisir",
                    state: 1
                },
            ],
            img: "/game/img_03.webp"
        },
        {
            text: "A noter que : Certaines IST peuvent être « manuportées », c’est-à-dire transmises par le biais des mains, quand il y a échange ou contact de fluides (sécrétions vaginales ou sperme). C’est le cas des infections à chlamydia, à papillomavirus (HPV) ou encore de l’herpès.",
            actions: [
                {
                    text: "Je passe à la suite",
                    state: 1
                }
            ],
            img: "/game/img_04.webp"
        },
        {
            text: "Suite à vos échanges érotiques, la personne s'apprête à vous faire du sexe oral",
            actions: [
                {
                    text: "J'utilise une protection telle qu'une digue dentaire ou un met un préservatif",
                    state: 1
                },
                {
                    text: "Je ne me protège que lors du rapport, sinon c'est inutile et les sensations sont moindres",
                    state: 2
                }
            ],
            img: "/game/img_04.webp"
        },
        {
            text: "La personne vous avoue ne pas se protéger pour les rapports oraux mais suite à votre proposition, accepte et passe à l'acte",
            actions: [
                {
                    text: "Je passe à la suite",
                    state: 2
                },
            ],
            img: "/game/img_04.webp"
        },
        {
            text: "Attention : Plusieurs IST peuvent être transmises lors d’un cunnilingus ou d’une fellation, comme la chlamydiose, l’hépatite B, la syphilis, l’herpès ou l'infection à papillomavirus (HPV).",
            actions: [
                {
                    text: "Je met une protection et passe à la suite",
                    state: 1
                },
            ],
            img: "/game/img_04.webp"
        },
        {
            text: "Étant équipé comme il faut, les deux personnes prirent plaisir tout la nuit.",
            actions: [
                {
                    text: "Voir mon score",
                    state: 1
                },
            ],
            img: "/game/img_04.webp"
        },

    ]

        function continueGame(state){
            gameState+=state
        }


</script>

<svelte:head>
	<title>Blue Boules | Game</title>
</svelte:head>

<div class="w-full flex flex-row">
    {#if !gameStart}

    <img src="game/home.webp" class="w-full h-screen object-cover object-bottom" alt=""/>
    <div class="px-4 py-10 w-2/5  flex flex-col justify-between">
        <div class="space-y-4">
            <p class="text-gray-700 text-xl">
                Bienvenue dans une journée ordinaire !
            </p>
            <p>
                Vous vous réveillez dans un lit confortable dans votre chambre, prêt à affronter tout ce que la journée pourrait vous apporter.
            </p>
            <p>
                Vous sortez du lit, vous habillez et descendez pour le petit-déjeuner. Vous appréciez le petit déjeuner avec votre famille, puis commencez votre journée.
            </p>
            <p>
                Vous vous préparez pour l'école et sortez. Vous avez une journée chargée de cours, d'amis et d'activités devant vous, et vous avez hâte de commencer. Aujourd'hui va être une journée incroyable !
            </p>


            <label for="pp-sexe" class="block mb-2 text-sm font-medium text-gray-900">Votre sexe</label>
            <select id="pp-sexe" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:focus:border-blue-500">
                <option selected value="homme">Je suis un homme</option>
                <option value="femme">Je suis une femme</option>
                <option value="autre">Autre</option>
            </select>

            <label for="p-sexe" class="block mb-2 text-sm font-medium text-gray-900">Sexe de votre partenaire</label>
            <select id="p-sexe" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:focus:border-blue-500">
                <option selected value="homme">Il est un homme</option>
                <option value="femme">Elle est une femme</option>
                <option value="autre">Autre</option>
            </select>
        </div>

        <button on:click={() => gameStart = true} class="flex items-center justify-end">
            Commencer l'aventure
            <Icon src="{ArrowSmRight}" solid size="30" class="ml-2 text-primary"/>
        </button>
    </div>
    {:else}

        <img src={gameData[gameState].img} class="z-10 w-full h-screen object-cover object-bottom absolute" alt=""/>
        <div class="z-50 w-full h-screen flex flex-col justify-end pb-8 px-32">
            <div class= "bg-white/75 rounded p-4">
                {gameData[gameState].text}
            </div>
            <div class="space-x-4 flex my-8">
                {#each gameData[gameState].actions as action}
                    <button on:click={continueGame(action.state)} class="flex-1 bg-white/50 p-4 rounded hover:bg-white/75 transition-all duration-300">
                        {action.text}
                    </button>
                {/each}

            </div>
        </div>
    {/if}
</div>