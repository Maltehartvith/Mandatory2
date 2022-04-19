<script>
    import { notifications } from "../notifications/notification.js";
    import Toast from "../notifications/Toast.svelte";

    let newUser = {};
    let responseMessage = "";
    //Signup method that fetches the signup post method from backend. 
    async function signUp() {
        const res = await fetch(`/api/signup`, {
            headers: {
                "content-type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(newUser),
        });

        responseMessage = await res.text();
        if (res.status === 404) {
            notifications.warning(responseMessage, 2000);
        } else {
            notifications.success(
                `An user with the username: ${newUser.username} has been created \n An email has been sent to ${newUser.email}`,
                5000
            );
        }
    }
</script>

<h1>Sign up</h1>
<Toast />

<input 
    type="text" 
    placeholder="username" 
    bind:value={newUser.username} 
    required
/>
<br />
<input
    type="password"
    placeholder="password"
    min="3"
    bind:value={newUser.password}
    required
/>
<br />
<input 
    type="email" 
    placeholder="eMail@email.com" 
    bind:value={newUser.email} 
    required
/>
<br />
<button on:click={signUp}> Register </button>
