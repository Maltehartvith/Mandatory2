<script>
    import { onMount } from "svelte";
    import { cart } from "../store/cart.js";
    import { notifications } from "../notifications/notification.js";
    import Toast from "../notifications/Toast.svelte";
    import { isLoggedIn } from "../privateRouter/IsloggedIn.js";

    isLoggedIn();

    let beer = "";
    let imgFilePath = "";
    //Takes the name of the beer out of the url. I could have made the api to fetch on id instead of name, 
    //but i fancy that the name is the url instead. 
    let myUrl = window.location.href;
    let searchName = myUrl.slice(myUrl.lastIndexOf("/") + 1);
    const beerName = searchName.replace("%20", " ");

    onMount(async () => {
        const response = await fetch(`/api/beers/${beerName}`);
        const { data: singleBeer } = await response.json();
        beer = singleBeer;

        //apparently the img file path also fucks with this svelte site, so i made this instead, which works like a charm!
        let imgpathname = singleBeer.imgpath;
        const path = imgpathname.replace(".", "");
        imgFilePath = path;
    });

    //simple method to save the product to the cart with its desired quantity
    function addToCart(product) {
        cart.update((cartValue) => {
            let foundProduct = cartValue.products.find(
                (p) => p.product.id == product.id
            );
            let quantity = Number(document.getElementById("quantity").value);
            if (foundProduct) {
                foundProduct.amount += quantity;
            } else {
                cartValue.products.push({ product, amount: quantity });
            }
            return cartValue;
        });
    }

    //clickhandler for our add to cart button
    function clickHandler() {
        let quantity = Number(document.getElementById("quantity").value);
        addToCart(beer);

        notifications.success(
            `${quantity}x ${beer.name} was added to the cart `,
            1000
        );
    }
</script>

<h1>{beer.name}</h1>
<img src={imgFilePath} alt="beer img" width="50%" height="50%" />

<label>
    <input type="number" value="1" min="1"  id="quantity" />
    <button on:click={clickHandler}>Add to cart</button>
    <Toast />
</label>

<div class="description">
    {beer.description}
</div>

<style>
    .description{
        width: 19em; 
        position: absolute;
        right: 30%;
        left:30%;
        text-align: left;
        background-color: hsl(0, 0%, 66%, 0.6);
    }

    input[type="number"] {
        width: 5em;
        text-align: center;
    }
</style>