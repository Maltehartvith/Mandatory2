<script>
    import { onMount } from "svelte";
    
    let beer = "";

    let myUrl = window.location.href
    let searchName = myUrl.slice(myUrl.lastIndexOf('/') + 1)
    const beerName = searchName.replace("%20", " ");
    
    
    onMount(async () => {
        const response = await fetch(`/api/beers/${beerName}`);

        const { data: singleBeer } = await response.json();
        console.log(singleBeer)
        beer = singleBeer;
    });
    console.log(beer)
    
</script>

<h1>{beer.name}</h1>

