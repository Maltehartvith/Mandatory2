<script>
    import { useNavigate, useLocation, navigate } from "svelte-navigator";
    import { notifications } from "../notifications/notification.js";
    import Toast from "../notifications/Toast.svelte";
    import { thePrivitizer } from "../privateRouter/PrivateRouteGuard.js"

    let user = {};
    let responseMessage = ""
    const storage = localStorage.getItem(`${thePrivitizer}`)
    
    async function login() {
        debugger
        const res = await fetch(`/api/login`, {
            headers: {
                "content-type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(user),
        });
        responseMessage = await res.text();
        console.log(responseMessage)
        if (res.status === 404) {
            notifications.warning("You have to type in the right login information. Try again.")

        } else {
            notifications.success(
            `You are now logged into ${user.username}. \n Redirecting you to the front page soon`,
            2000);
            localStorage.setItem(`${thePrivitizer}`, user.username);
            setTimeout(() => {
                navigate("/", { replace: true });
            }, 5000);
        }
    }

    async function logout() {
        const res = await fetch(`/api/logout`);
        responseMessage = await res.text();
        localStorage.removeItem(`${thePrivitizer}`)
        setTimeout(() => {
            navigate("/", { replace: true });
        }, 1500);
    }

    

</script>
{#if storage == null}
<h1>Login</h1>
<h3>{responseMessage}</h3>
<input type="text" placeholder="Username" bind:value={user.username} required/>
<br />
<input type="password" placeholder="Password" bind:value={user.password} required/>
<br />
<Toast />
<Toast />
<button type="submit" on:click={login}>Login</button>
{:else}
<h1><pre>You are already logged in.
Do you want to log out?</pre></h1>
<button on:click={logout}>Log out </button>
{/if}

<style>
    button {
        width: 5em;
        flex: 1;
        margin: 0 1em;
    }
</style>
