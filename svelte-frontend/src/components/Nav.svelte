<script>
    import { Route, Router, Link } from "svelte-navigator";
    import Frontpage from "../pages/Frontpage.svelte";
    import Infopage from "../pages/Infopage.svelte";
    import About from "../pages/About.svelte";
    import Contact from "../pages/Contact.svelte";
    import Cart from "../pages/Cart.svelte";
    import Singlebeer from "../pages/Singlebeer.svelte";
    
    

</script>

<nav>
    <div class="cart">
        <Router primary={false}>
            <Link to="/cart"><img src="./PinClipart.com_supermarket-clipart_4857762.png" alt="cartlol" width="5%" height="5%"/></Link>
            <Route path="/cart" component={Cart} />
        </Router> 
        
    </div>

    <div class="full-nav-bar">

    
        <Router primary={false}>

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

            <Route path="/" component={Frontpage} />
            <Route path="/infopage" component={Infopage} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/singlebeer/:name" component={Singlebeer} />
        </Router>
    </div>

</nav>



<style>
    .full-nav-bar {
        flex: 1;
        width: fit-content;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }

    .nav-button{
        border: 0.1em solid black;
        display: inline;
        text-align: center;
        background-color: white;
    }

    .cart{
        flex: 1;
        position: absolute;
        right: 10%;
        top: 5%;
        transform: translateX(50%);
    }

</style>
