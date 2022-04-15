<script>
    import { Route, Router, Link } from "svelte-navigator";
    import Singlebeer from "./Singlebeer.svelte";
    import { onMount } from "svelte";

    let beers = [];
    
    

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
                    <span>{beer.name}</span>
                    <br />
                    <span>{beer.price} kr</span>
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
        background-color: hsl(120, 100%, 97%, 0.5);

    }


    /* Responsive layout - makes the three columns stack on top of each other instead of next to each other */
    @media screen and (max-width: 600px) {
        .column {
            width: 100%;
        }
    }
</style>
