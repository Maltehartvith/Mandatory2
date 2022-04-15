<script>
	import { useNavigate, useLocation } from "svelte-navigator";
    import { onMount } from "svelte";

	let user;
    
	const navigate = useNavigate();
	const location = useLocation();

    onMount(async () => {
        const response = await fetch("/api/users");
        const { data: usersArray } = await response.json();
        users = usersArray;
    });



	$: if (!$user) {
		navigate("/login", {
			state: { from: $location.pathname },
			replace: true,
		});
	}
</script>

{#if $user}
	<slot />
{/if}