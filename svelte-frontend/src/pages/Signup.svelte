<script>
    import {navigate} from "svelte-navigator";
    import { notifications } from '../notifications/notification.js'
	import Toast from '../notifications/Toast.svelte'

    let newUser = {};
    let responseMessage = "";

async function signUp() {
        const res = await fetch(`/api/signup`, {
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(newUser)
        })
        responseMessage = await res.text();
        setTimeout( () => {
            navigate("/", {replace:true})
        }, 5000);
    }

    function clickHandler() {
        signUp()
        notifications.success(`An user with the username: ${newUser.username} has been created \n An email has been sent to ${newUser.email} \n
        \nRedirecting you to the front page soon`, 5000);
    }
</script>

<h1>Sign up</h1>

<form>
    <input type="text" placeholder="username" bind:value={newUser.username}/>
    <br>
    <input type="password" placeholder="password" bind:value={newUser.password}/>
    <br>
    <input type="email" placeholder="eMail@email.com" bind:value={newUser.email}/>
    <br>
    <button on:click={clickHandler}> Register </button>
    <Toast/>
</form>

