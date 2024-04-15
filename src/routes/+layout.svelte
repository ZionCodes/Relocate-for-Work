<script>
	import "../app.pcss";
	import Alert from "../lib/Alert.svelte";
	import Footer from "../lib/Footer.svelte";
	import Navbar from "../lib/Navbar.svelte";
</script>

<Alert />
<Navbar />


<slot></slot>

<Footer />

