<script>
	import { useNavigate, useLocation, navigate } from "svelte-navigator";
    import { notifications } from '../notifications/notification.js'
	import Toast from '../notifications/Toast.svelte'
    
    let user = {};
    let responseMessage = "";
    const blankSpace = "                   ";
    async function login() {
        const res = await fetch(`/api/login`, {
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(user)
        })
        responseMessage = await res.text();

        if( res.status = 404 ){
            console.log("den er her")
        } else {
        setTimeout( () => {
            navigate("/", { replace: true })
        }, 5000);
    }
    }

    async function logout() {
        const res = await fetch(`/api/logout`);
        responseMessage = await res.text();
        setTimeout( () => {
            navigate("/", {replace:true});
        }, 1500);
    }

    function navigateToSignUp(){
        navigate("/signup", {replace: true})
    }

    function handleLogIn() {
        login();
        notifications.success(`You are now logged into ${user.username}. \n Redirecting you to the front page soon`, 9000);
    }
</script>

<h1>Login</h1>
<h3>{responseMessage}</h3>

	<input
		type="text"
		placeholder="Username"
        bind:value={user.username}
	/>
	<br />
	<input
		type="password"
		placeholder="Password"
        bind:value={user.password}
	/>
	<br />
    <Toast />
	<button type="submit" on:click={handleLogIn}>Login</button>
    
    <button on:click={logout}>Log out </button>
    <button on:click={navigateToSignUp}>Sign up</button>
        
    



<style>
    button{
        width: 5em;
        flex:1;
        margin: 0 1em;
    }
</style>