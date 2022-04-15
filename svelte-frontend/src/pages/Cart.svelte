<script>
    import { cart } from "../store/cart.js";

    let cartArray = $cart.products;

    let totalPrice = 0;

    let productToDelete = "";

    let createModalClass = "hidden-modal";

    totalPriceCalc();

    function totalPriceCalc() {
        totalPrice = 0;
        cartArray.forEach((p) => {
            let sum = p.product.price * p.amount;
            totalPrice += Number(sum);
        });

        return totalPrice;
    }

    //hælp
    function confirmDelete(id) {
        cart.update((cartValue) => {
            cartValue.products = cartValue.products.filter(
                (beer) => beer.product.id != id
            );
            cartArray = $cart.products;
            totalPriceCalc();
            hideModal();
            return cartValue;
        });
    }

    function hideModal() {
        createModalClass = "fading-modal";
    }

console.log($cart.products)
</script>

<h1>lol</h1>
<table id="tableMid">
    <th colspan="2">Product</th>
    <th>Amount</th>
    <th>Price</th>
    

    {#each $cart.products as p}
        <tr>
            <td class="img-class">
                <img src={p.product.imgpath} alt={"picture"} />
                
                
            </td>
            <!--Hertil -->
            <td class="product-name">
                {p.product.name}
                
                <button
                    on:click={() => {
                        createModalClass = "shown-modal";
                        productToDelete = p.product;
                    }}
                    id="remove-button"
                >
                    X
                </button>
            </td>

            <td class="quantity-class">
                
                    <input
                        type="number"
                        bind:value={p.amount}
                        min="1"
                        id="quantity"
                        on:change={totalPriceCalc}
                    />
            
            </td>

            <td class="price-class">{p.product.price} kr</td>
            
        </tr>
    {/each}
    <tr>
        <td colspan="3" style="text-align: right; border-right:none">Total Price: </td>
        <td colspan="2" style="text-align: center; border-left:none">{totalPrice} kr</td>
    </tr>
</table>

<div
    
    
    class={createModalClass}
    id="crModalDiv"
>
    <h1>Are you sure you want to delete this item from your cart?</h1>

    <div class="modalBtns">
        <button
            on:click={() => confirmDelete(productToDelete.id)}>Yes</button
        >
        <button on:click={() => createModalClass = "fading-modal"}>No</button>
    </div>
</div>

<style>
    /*TABLE CSS*/
    table {
        border-collapse: collapse;
        width: 30%;
        border-radius: 15px;
        
    }

    th {
        background-color: rgba(240, 230, 196, 0.863);
        text-align: center;
    }

    td,
    th, tr {
        border: 1px solid rgb(50, 56, 56);
        text-align: center;
        padding: 5px;
    }
    
    tr:nth-child(even) {
        background-color: rgba(243, 236, 223, 0.877);
    }
    tr:nth-child(odd) {
        background-color: rgba(224, 223, 221, 0.979);
    }
    tr:last-child{
        background-color: rgba(243, 236, 223, 0.877);
    }

    #tableMid {
        position: relative;
        left: 25%;
        width: 50%;
    }
  

    /*SIMPLE CSS FOR SINGLE ELEMENTS AND CLASSES*/
    .quantity-class, .price-class{
        width:10%;
    }

    .remove-class{
        width: 5%;
    }
    #remove-button{
        box-shadow: 1px 3px #888888;
        right: -5%;
        color: red;
        position: absolute;
        top: 1%;
        border-radius: 50%;
        margin-top: 10px;
        padding: 0.1em 0.3em 0.1em 0.3em;
    }
    
    input[type="number"]{
        width: 100%;
        text-align: center;
    }
    .product-name{
        border: none;     
        transform: translateX(-6%);
    }



    /*IMG CSS*/
    .img-class{
       height: 40%; 
       width: 8%;
       text-align: center;
    }
    td.img-class{
        border-right-style: none;
    }
    img {
        width: 100%;
        height: 100%;
    }


    

    /* MODAL CSS */
    .shown-modal, .fading-modal {
        background-color: rgba(255, 255, 255, 0.98);
        border: 1px solid black;
        padding: 18px;
        display: block;
        position: absolute;
        width: 500px;
        left: 50%;
        top: 32%;
        transform: translateX(-50%);
        z-index: 1;
        border-radius: 7px;
    }
    .shown-modal{
        animation: showBox 1s forwards;    
    }

    @keyframes showBox{
        0%{
            opacity: 0;
        }
        100%{
            opacity: 1;
        }
    }

    .hidden-modal {
        display: none;
    }

    .fading-modal {
        animation: hideBox 0.5s forwards;
        
    }

    @keyframes hideBox{
        0%{
            opacity: 1;
        }
        100%{
            opacity: 0;
            display:none;
            pointer-events: none;
            
        }
        
    }

</style>
