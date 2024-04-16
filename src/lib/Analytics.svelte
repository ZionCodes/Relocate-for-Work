<script>
    import { page } from '$app/stores'
  
    $: {
      if (typeof gtag !== 'undefined') {
        gtag('config', 'G-DFFW0800WC', {
          page_title: document.title,
          page_path: $page.url.pathname,
        })
      }
    }
  </script>
  
  <svelte:head>
    <script
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-DFFW0800WC">
    </script>
    <script>
      window.dataLayer = window.dataLayer || []
  
      function gtag() {
        dataLayer.push(arguments)
      }
  
      gtag('js', new Date())
      gtag('config', 'G-DFFW0800WC')
    </script>
  </svelte:head>
  

  <!-- Google tag (gtag.js) -->
