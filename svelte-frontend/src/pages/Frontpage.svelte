<script>
    import { store } from "../store/generalStore.js";
    import { Route, Router, Link } from "svelte-navigator";
    import SingleBeer from "./Singlebeer.svelte";
</script>

<div class="row">
    {#each $store.products as product}
        <div class="column">
            <Router primary={false}>
                <Link to="/singlebeer/{product.id}">
                <br />
                <img
                    src={product.imgPath}
                    alt={product.name}
                    width="50%"
                    height="50%"
                />
                <br />
                <span>{product.name}</span>
                <br />
                <span>{product.price} kr</span>
                </Link>

                <Route path="/singlebeer/{product.id}" component={SingleBeer} />
            </Router>
        </div>
    {/each}
</div>

<style>
    .row {
        display: flex;
        flex-wrap: wrap;
    }

    .column {
        width: 33%;
        height: 100px;
    }

    /* Responsive layout - makes the three columns stack on top of each other instead of next to each other */
    @media screen and (max-width: 600px) {
        .column {
            width: 100%;
        }
    }
</style>
