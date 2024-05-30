<script>
import Email from "../../../lib/Email.svelte";
import SvelteSeo from "svelte-seo";
export let data;
</script>

<SvelteSeo
  title='{data.records.title}'
  description='{data.records.introduction}'
  keywords="visa sponsorship jobs, relocation support jobs, relocation support, visa sponsorship, work abroad, relocate for work, relocate, move abroad"
  openGraph={{
  title: `${data.records.title}`,
  description: `${data.records.introduction}`,
  image: `https://connected-animal.pockethost.io/api/files/jobs/${data.records.id}/${data.records.thumbnail}`,
  type: "article",
  site_name: "Relocate for Work Blog",
  }}
  twitter={{
  card: "summary_large_image",
  site: "@RelocateforWork",
  title: `${data.records.title}`,
  description: `${data.records.introduction}`,
  image: `https://connected-animal.pockethost.io/api/files/jobs/${data.records.id}/${data.records.thumbnail}`,
  }}
/>


<nav class="flex max-w-3xl mx-auto" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
      <li class="inline-flex items-center">
        <a href="/" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
          <svg class="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
          </svg>
          Home
        </a>
      </li>
      <li>
        <div class="flex items-center">
          <svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
          </svg>
          <a href="/blog" class="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Blog</a>
        </div>
      </li>
      <li aria-current="page">
        <div class="flex items-center">
          <svg class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
          </svg>
          <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">{data.records.title}</span>
        </div>
      </li>
    </ol>
</nav>
  
<main class="pt-4 pb-16 lg:pt-8 lg:pb-24 bg-white dark:bg-gray-900 antialiased">
    <div class="flex justify-between px-4 mx-auto max-w-screen-3xl">
        <article class="mx-auto w-full max-w-3xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <header class="mb-4 lg:mb-6 not-format">
                <address class="flex items-center mb-6 not-italic">
                    <div class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                      <img class="mr-4 w-16 h-16 rounded-full" src={`https://connected-animal.pockethost.io/api/files/${data.records.author.collectionName}/${data.records.author.id}/${data.records.author.picture}`} alt={data.records.author.name}>
                        <div>
                            <a href="/" rel="author" class="text-xl font-bold text-gray-900 dark:text-white">{data.records.author.name}</a>
                            <p class="text-base text-gray-500 dark:text-gray-400">{data.records.author.title}</p>
                            <p class="text-base text-gray-500 dark:text-gray-400"><time pubdate datetime="2022-02-08" title="February 8th, 2022">{data.records.created}</time></p>
                        </div>
                    </div>
                </address>
                <h1 class="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">{data.records.title}</h1>
            </header>
            <p class="lead text-xl mt-5 mb-5">{data.records.introduction}</p>
            <p class='mb-3 text-gray-500 dark:text-gray-400 text-base leading-relaxed'>{@html data.records.article}</p>
        </article>
    </div>
  </main>

  <Email />