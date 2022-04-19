
import { navigate } from "svelte-navigator";
import { notifications } from "../notifications/notification.js";


//This is the function that redirects you to the login page, if you are nogt signed in.
//it instanciate the access to localstorage.PRIVITIZER. If there's none, you will get redirected to login site.
//This is why I have a .env, so it is hidden for users that arent logged in.
export function isLoggedIn () {
    const access = localStorage.getItem(`${PRIVITIZER}`)
    
    if (access === null){
        navigate("/login", { replace: true }) 
        notifications.danger("You have to log in to see the site.", 1000)
    }
    return false
}




