<script>
    import { Route, Router, Link } from "svelte-navigator";
    import Frontpage from "../pages/Frontpage.svelte";
    import Infopage from "../pages/Infopage.svelte";
    import About from "../pages/About.svelte";
    import Contact from "../pages/Contact.svelte";
    import Cart from "../pages/Cart.svelte";
    import Singlebeer from "../pages/Singlebeer.svelte";
    import Login from "../pages/Login.svelte";
    import { onDestroy } from 'svelte';
    import { cart } from "../store/cart.js"
    import Signup from "../pages/Signup.svelte"
    import PrivateRouteGuard from "../privateRouter/PrivateRouteGuard.svelte";

    let cartArray = $cart.products;
    let totalAmount = 0;
    

    const unsubscribe = cart.subscribe(p => {
        totalAmount = 0;
        cartArray.forEach( p => {
            let sum = p.amount;
            totalAmount += Number(sum);
        });
	});

    
	onDestroy(unsubscribe);
</script>

<nav>
    <Router primary={false}>

        <div class="cart">
            {#if totalAmount > 0}
            <span class="counter">
                
                {totalAmount}
                
            </span>
            {/if}
            <br>
            <Link to="/cart"
                ><img
                    src="./images/PinClipart.com_supermarket-clipart_4857762.png"
                    alt="cartlol"
                    width="5%"
                    height="5%"
                /></Link
            >

        </div>

        <div class="full-nav-bar">

            <div class="nav-button">
                <Link to="/">Frontpage</Link>
            </div>
            
            <div class="nav-button">
                <Link to="/infopage">Info page</Link>
            </div>


            <div class="nav-button">
                <Link to="/about">About us</Link>
            </div>

            <div class="nav-button">
                <Link to="/contact">Contact</Link>
            </div>

            <div class="nav-button">
                <Link to="/login">Login</Link>
            </div>
            
            <Route path="/" component={Frontpage} />
            <Route path="/infopage" component={Infopage} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/singlebeer/:name" component={Singlebeer} />
            
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/cart" component={Cart} />
            
        </div>
    </Router>
</nav>

<style>
    .full-nav-bar {
        flex: 1;
        width: fit-content;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }

    .nav-button {
        border: 0.1em solid black;
        display: inline;
        text-align: center;
        background-color: white;
    }

    .cart {
        flex: 1;
        position: absolute;
        right: 10%;
        top: 5%;
        transform: translateX(50%);
        text-align: center;
    }

    .counter {
        flex: 1;
        position: absolute;
        right: 48%;
        top: 25%;
        transform: translateX(50%);
        border: 1px solid black;
        width: fit-content;
        padding: 0 0.3em;
        border-radius: 35%;
        background-color: brown;
        opacity: 85%;
        cursor: default;
        color: whitesmoke;
        pointer-events: none;
        font-size: small;
    }

</style>
