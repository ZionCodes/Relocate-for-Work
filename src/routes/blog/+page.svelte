<script>
    import SvelteSeo from "svelte-seo";
    export let data;
</script>

<svelte:head>
    <SvelteSeo
    title='Relocate For Work | Blog'
    description='Insights and resources for securing visa sponsorship jobs and relocation support jobs, moving abroad and more.'
    keywords="visa sponsorship jobs, relocation support jobs, relocation support, visa sponsorship, work abroad, relocate for work, relocate, move abroad"
    openGraph={{
    title: "Relocate For Work | Blog",
    description:
      "Insights and resources for securing visa sponsorship jobs and relocation support jobs, moving abroad and more.",
    image: "https://res.cloudinary.com/dbvvslwpj/image/upload/f_auto,q_auto/c1ng5xtxmksgjwenulzv",
    url: "https://relocateforwork.com/blog",
    type: "website",
    site_name: "Relocate for Work Blog",
    }}
    twitter={{
    card: "summary_large_image",
    site: "@RelocateforWork",
    title: "Relocate For Work | Blog",
    description:
      "Insights and resources for securing visa sponsorship jobs and relocation support jobs, moving abroad and more.",
    image: "https://res.cloudinary.com/dbvvslwpj/image/upload/f_auto,q_auto/c1ng5xtxmksgjwenulzv",
    }}
  />
</svelte:head>


<section class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
            <h2 class="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Our Blog</h2>
            <p class="font-light text-gray-500 sm:text-xl dark:text-gray-400">We use an agile approach to test assumptions and connect with the needs of your audience early and often.</p>
        </div> 
        
        <div>
            <ul class="grid gap-8 lg:grid-cols-3">
                {#each data?.records as record}
                  <li class="flex">
                    <a href='/blog/{encodeURIComponent(record.title.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, ''))}' class="block relative overflow-hidden w-full">
                        <article class="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 flex flex-col h-full min-h-[400px]">
                            <img
                              src={`http://127.0.0.1:8090/api/files/posts/${record.id}/${record.thumbnail}`}
                              alt="Thumbnail"
                              class="w-full h-48 object-cover"
                            >
                          <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            <a href="/">{record.title}</a>
                          </h2>
                          <p class="mb-5 font-light text-gray-500 dark:text-gray-400 flex-grow overflow-hidden text-ellipsis line-clamp-3">
                            {record.introduction}
                          </p>
                          <div class="flex justify-between items-center mt-auto">
                            <div class="flex items-center space-x-4">
                              <img
                                class="w-7 h-7 rounded-full"
                                src={`http://127.0.0.1:8090/api/files/author/${record.field.id}/${record.field.picture}`}
                                alt="Author avatar"
                              />
                              <span class="font-medium dark:text-white">
                                {record.field.name}
                              </span>
                            </div>
                            <span class="text-sm">{record.created}</span>
                          </div>
                        </article>
                    </a>
                  </li>
                {/each}
            </ul>                                  
        </div>
        
        
    
    </div>
  </section>
