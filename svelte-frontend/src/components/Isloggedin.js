
import { navigate } from "svelte-navigator";
import { thePrivitizer } from "../privateRouter/PrivateRouteGuard.js";



export async function isLoggedIn () {
    const store = localStorage.getItem(`${thePrivitizer}`)
    if (store === null)
        navigate("/login", { replace: true }) 
    
    return false
}




