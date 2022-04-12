<script>


	import Nav from "./components/Nav.svelte"

</script>

<main>
	<img src="./images/bottles.jpg" alt="bottles">
	
	<h1>Static beers</h1>
	<Nav/>
	
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
		
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

	img{
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		opacity: 0.5;
		z-index: -1;
	  }
</style>