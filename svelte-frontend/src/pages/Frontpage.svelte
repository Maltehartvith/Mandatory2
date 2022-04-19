<script>
    import { Router, Link } from "svelte-navigator";
    import { onMount } from "svelte";
    import { isLoggedIn } from "../privateRouter/IsloggedIn.js";
    isLoggedIn();

    let beers = [];

    //fetches our beers and inserts them into the beers array, so they can be displayed 
    onMount(async () => {
        const response = await fetch("/api/beers");
        const { data: beersArray } = await response.json();
        beers = beersArray;
    });

</script>

<div class="row">
    {#each beers as beer}
        <div class="column">
            <Router primary={false}>
                <Link to="/singlebeer/{beer.name}">
                    <br />
                    <img
                        src={beer.imgpath}
                        alt={beer.name}
                        width="auto"
                        height="80%"
                    />
                    <br />
                    <div class="beer-name-price">
                    {beer.name}
                    <br />
                    {beer.price} kr
                    </div>
                </Link>
            </Router>
        </div>
    {/each}
</div>

<style>
    .row {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        max-width: 600px;
    }

    .column {
        width: 33%;
        height: 10em;
        margin: 1em 0em 0.5em;
        padding: 0em 0em 2em;
        
    }
    .beer-name-price{
        background-color: hsl(0, 0%, 66%, 0.6);
        text-align: center;
        margin-left: 40px;
        margin-right: 40px;
    }
    /* Responsive layout - makes the three columns stack on top of each other instead of next to each other */
    @media screen and (max-width: 600px) {
        .column {
            width: 100%;
        }
    }
</style>
