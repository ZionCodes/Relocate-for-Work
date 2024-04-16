<script>
	import "../app.pcss";
	import Footer from "../lib/Footer.svelte";
	import Navbar from "../lib/Navbar.svelte";
	import Analytics from '$lib/analytics.svelte'
</script>


<Analytics />
<Navbar />
<slot></slot>
<Footer />

  