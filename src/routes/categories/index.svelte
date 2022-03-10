<svelte:head>
    <title>Accessible games | Créer une nouvelle catégorie</title>
</svelte:head>

<h1>Créer une nouvelle catégorie</h1>

<form action="/categories" method="post">
    <input type="text" name="category">
    <input type="submit">
</form>
