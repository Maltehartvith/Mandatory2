<script>
    import { Route, Router, Link } from "svelte-navigator";
    import Frontpage from "../pages/Frontpage.svelte";
    import Infopage from "../pages/Infopage.svelte";
    import About from "../pages/About.svelte";
    import Contact from "../pages/Contact.svelte";
    import Cart from "../pages/Cart.svelte";
    import Singlebeer from "../pages/Singlebeer.svelte";
    import Login from "../pages/Login.svelte";
    import { onDestroy } from "svelte";
    import { cart } from "../store/cart.js";
    import Signup from "../pages/Signup.svelte";

    //eventlistener to check if you are logged in or not. And if you are, it displays your username under the profile. 
    let user = localStorage.getItem(PRIVITIZER);
    document.addEventListener(
        "DOMContentLoaded",
        function () {
            const display = document.getElementById("display-username");
            const notLog = "You are not logged in";
            if (user !== null) {
                display.innerText = user;
            } else if (user === null) {
                display.innerText = notLog;
            }
        },
        false
    );

    //a little counter, that appers over the cart when you add items to the cart.
    let totalAmount = 0;
    const unsubscribe = cart.subscribe((p) => {
        totalAmount = 0;
        $cart.products.forEach((p) => {
            let sum = p.amount;
            totalAmount += Number(sum);
        });
    });

    onDestroy(unsubscribe);
</script>

<!--the full nav bar, and also the cart and user/login icons, where I use Router, link and route to direct the user around.-->
<nav>
    <Router primary={false}>
        <div class="login-cart-container">
            <div class="login-class">
                <Link to="/login">
                    <img
                        src="./images/Sample_User_Icon.png"
                        alt="userlol"
                        height="auto"
                        width="60px"
                    />
                </Link>
                <div id="display-username" />
            </div>

            <div class="cart">
                {#if totalAmount > 0}
                    <span class="counter">
                        {totalAmount}
                    </span>
                {/if}
                <br />

                <Link to="/cart">
                    <img
                        src="./images/PinClipart.com_supermarket-clipart_4857762.png"
                        alt="cartlol"
                        height="auto"
                        width="50px"
                    />
                </Link>
            </div>
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
                <Link to="/signup">Signup</Link>
            </div>

            <Route path="/login" component={Login} />
            <Route path="/cart" component={Cart} />
            <Route path="/singlebeer/:name" component={Singlebeer} />
            <Route path="/" component={Frontpage} />
            <Route path="/infopage" component={Infopage} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/signup" component={Signup} />     
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
    #display-username {
        font-size: 10px;
    }
    .cart,
    .login-class {
        float: right;
    }

    .login-class {
        float: left;
        margin-top: 10px;
    }

    .login-cart-container {
        position: absolute;
        width: 180px;
        max-height: 40px;
        right: 30%;
        top: 9%;
        transform: translateX(100%) translateY(-50%);
    }

    .counter {
        flex: 1;
        position: absolute;
        top: 30%;
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
