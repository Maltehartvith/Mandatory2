<script>
    import { onMount } from "svelte";
    import { cart } from "../store/cart.js";
    import { notifications } from '../notifications/notification.js'
	import Toast from '../notifications/Toast.svelte'
    

    let beer = "";
    let imgFilePath = "";
    let myUrl = window.location.href;
    let searchName = myUrl.slice(myUrl.lastIndexOf("/") + 1);
    const beerName = searchName.replace("%20", " ");

    onMount(async () => {
        const response = await fetch(`/api/beers/${beerName}`);
        const { data: singleBeer } = await response.json();
        beer = singleBeer;

        let imgpathname = singleBeer.imgpath;
        const path = imgpathname.replace(".", "");
        imgFilePath = path;
    });

    function addToCart(product) {
        cart.update((cartValue) => {
            let foundProduct = cartValue.products.find(
                (p) => p.product.id == product.id
            );
            let quantity = Number(document.getElementById("quantity").value)
            if (foundProduct) {
                foundProduct.amount += quantity;
            } else {
                cartValue.products.push({ product, amount: quantity });
            }

            console.log(cartValue);
            console.log(document.getElementById("quantity").value);

            return cartValue;
        });
    }

    function clickHandler() {
        let quantity = Number(document.getElementById("quantity").value)
        addToCart(beer);
        
        notifications.success(`${quantity}x ${beer.name} was added to the cart `, 1000);
    }
    
</script>

<h1>{beer.name}</h1>
<img src={imgFilePath} alt="beer img" width="50%" height="50%" />

<label>
    <input type="number" value="1" min="1" width="10%" id="quantity" />
    <button on:click={clickHandler} >Tilføj</button>
    <Toast />
</label>
