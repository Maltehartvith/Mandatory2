<script>
    import { navigate } from "svelte-navigator";
    import { notifications } from "../notifications/notification.js";
    import Toast from "../notifications/Toast.svelte";

    let user = {};
    let responseMessage = "";
    //is used to check if the user is logged on. If they are, they shouldn't be allowed to login again. 
    const storage = localStorage.getItem(`${PRIVITIZER}`);

    //fetching the login post method from backend
    async function login() {
        const res = await fetch(`/api/login`, {
            headers: {
                "content-type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(user),
        });
        responseMessage = await res.text();

        if (res.status === 404) {
            notifications.warning(
                "You have to type in the right login information. Try again.",
                2000
            );
        } else {
            notifications.success(
                `You are now logged into ${user.username}. \n Redirecting you to the front page soon`,
                2000
            );
            //Inserts the PRIVITIZER from the .env file into localstorage. 
            localStorage.setItem(`${PRIVITIZER}`, user.username);
            setTimeout(() => {
                navigate("/", { replace: true });
                location.reload();
            }, 2000);
        }
    }

    //logout methods. Fetches the logout method from backend. As it should. 
    async function logout() {
        const res = await fetch(`/api/logout`);
        responseMessage = await res.text();
        localStorage.removeItem(`${PRIVITIZER}`);
        setTimeout(() => {
            navigate("/login", { replace: true });
            location.reload();
        }, 1500);
    }
</script>

{#if storage == null}
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
    <button type="submit" on:click={login}>Login</button>
{:else}
    <h1>
        <pre>You are already logged in.
Do you want to log out?</pre>
    </h1>
    <button on:click={logout}>Log out </button>
{/if}

<style>
    button {
        width: 5em;
        flex: 1;
        margin: 0 1em;
    }
</style>
