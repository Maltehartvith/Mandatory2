<script>
    import { onMount } from "svelte";
    import { cart } from "../store/cart.js"
    
    let beer = "";
    let imgFilePath = "";
    let myUrl = window.location.href
    let searchName = myUrl.slice(myUrl.lastIndexOf('/') + 1)
    const beerName = searchName.replace("%20", " ");


    onMount(async () => {
        const response = await fetch(`/api/beers/${beerName}`);
        const { data: singleBeer } = await response.json();
        beer = singleBeer;
        
        let imgpathname = singleBeer.imgpath
        const path = imgpathname.replace(".", "");
        imgFilePath = path;
        
    });

    function addToCart(product){

        cart.update( cartValue => {
            let foundProduct = cartValue.products.find(p => p.product.id == product.id)
            
            let quantity = document.getElementById('quantity').value;

            cartValue.products.push({product, amount:quantity});

            console.log(document.getElementById('quantity').value)
            return cartValue;
        })
    }

</script>

<h1>{beer.name}</h1>
<img src={imgFilePath} alt="beer img" width="50%" height="50%">

<label>
<input type=number value=1 min=1 width="10%" id="quantity">
<button on:click={ () => addToCart(beer)}>Tilføj</button>
</label>
