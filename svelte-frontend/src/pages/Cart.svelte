<script>
    import { cart } from "../store/cart.js";
    let cartArray = $cart.products;

    let totalPrice = 0;

    totalPriceCalc();

    

    function totalPriceCalc() {
        totalPrice = 0;
        cartArray.forEach((p) => {
            let sum = p.product.price * p.amount;
            totalPrice += Number(sum);
        });

        return totalPrice;
    }

    

</script>

<h1>Your cart</h1>
<table id="tableMid">
    <th style="height: 3%; width: 3%;" />
    <th>Product</th>
    <th>Amount</th>
    <th colspan="2">Price</th>
    

    {#each $cart.products as p}
        <tr>
            <td style="height: 3%; width: 3%;"
                ><img src={p.product.imgpath} alt={"picture"} /></td
            >
            <td>{p.product.name}</td>
            <td>
                <label>
                    <input
                        type="number"
                        bind:value={p.amount}
                        width="10%"
                        min=0
                        id="quantity"
                        on:change={totalPriceCalc}
                    />
                </label>
            </td>

            <td>{p.product.price}</td>
            
        </tr>
    {/each}
    <tr>
        <td colspan="4" style="text-align: right; ">Total Price: {totalPrice}</td>
        
    </tr>
</table>

<style>
    table {
        border-collapse: collapse;
        width: 50%;
        border-radius: 15px;
        
    }

    th {
        background-color: rgba(240, 230, 196, 0.863);
        text-align: center;
    }

    td,
    th {
        border: 1px solid rgb(50, 56, 56);
        text-align: left;
        width: 10%;
        padding: 5px;
    }

    tr:nth-child(even) {
        background-color: rgba(243, 236, 223, 0.877);
    }

    #tableMid {
        position: relative;
        left: 25%;
        width: 50%;
    }
    img {
        width: 100%;
        height: 100%;
    }
</style>
