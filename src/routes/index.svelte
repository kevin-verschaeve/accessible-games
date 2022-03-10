<script>
    export let games;
    export let search;
    export let categories;

    let categoryForm;
</script>

<svelte:head>
    <title>Accessible games | Trouver un jeu qui me correspond</title>
</svelte:head>

<h1>Accessible games</h1>

<form action="/" method="get" id="form-search">
    Rechercher
    <input type="text" name="search" value="{search}">
    <input type="submit">
</form>

<form action="/" method="post" class="form-game-create">
    Ajouter un jeu
    <input type="url" name="game">
    <input type="submit">
</form>

<ul>
{#each games as game}
    <li>
        <p>
            <a href="{game.name}" title="Télécharger le jeu">{game.name}</a>
        </p>

        {#each game.categories as category}
            <div class="category">
                <a href="/?search={category}">{category}</a>

                <form action="/?_method=DELETE" method="post" class="form-category-delete">
                    <input type="hidden" name="game" value="{game.name}">
                    <input type="hidden" name="category" value="{category}">
                    <input type="submit" value="&cross;" title="Supprimer">
                </form>
            </div>
        {/each}

        <button on:click={() => categoryForm === game.name ? categoryForm = null : categoryForm = game.name}>+</button>
        <form action="/?_method=PATCH" method="post" class="form-category-add" class:hidden={categoryForm !== game.name}>
            <legend>Ajouter une catégorie</legend>
            <input type="hidden" name="game" value="{game.name}">
            <select name="category">
                {#each categories as category}
                    <option>{category}</option>
                {/each}
            </select>
            <input type="submit">
        </form> 
    </li>
{/each}
</ul>

<style>
    .form-category-add {
        padding: 30px;
    }

    .form-category-delete {
        display: inline;
    }

    .form-category-delete input[type="submit"] {
        background: none;
        border: none;
        cursor: pointer;
        color: blue;
        margin: 0;
        padding: 0;
    }

    .category {
        border: 1px solid black;
        background: rgb(228, 228, 228);
        display: inline-block;
        padding: 5px;
        border-radius: 5px;
    }
</style>
