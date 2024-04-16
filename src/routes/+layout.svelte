<script>
	import "../app.pcss";
	import Email from "../lib/Email.svelte";
	import Footer from "../lib/Footer.svelte";
	import Navbar from "../lib/Navbar.svelte";
</script>

<Navbar />

<Email />
<slot></slot>
<Footer />

