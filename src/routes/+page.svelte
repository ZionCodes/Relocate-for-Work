<script>
  import SvelteSeo from "svelte-seo";
  import Email from '../lib/Email.svelte';
  import Hero from '../lib/Hero.svelte'
  export let data;

</script>

<SvelteSeo
  title="Relocate for Work: Find Visa Sponsorship and Relocation Support Jobs"
  description="Land your dream job and move abroad! Relocate for Work connects you with visa sponsorship and relocation support jobs."
  canonical="https://relocateforwork.com"
  keywords="visa sponsorship jobs, relocation support jobs, relocation support, visa sponsorship, work abroad, relocation assistance, relocate for work, relocate"
  openGraph={{
    title: "Find Visa Sponsorship and Relocation Assistance Jobs | RelocateForWork.com",
    description:
      "Land your dream job and move abroad!",
    image: "https://res.cloudinary.com/dbvvslwpj/image/upload/f_auto,q_auto/c1ng5xtxmksgjwenulzv",
    url: "https://relocateforwork.com",
    type: "website",
    site_name: "Relocate for Work",
  }}
  twitter={{
    card: "summary_large_image",
    site: "@RelocateforWork",
    title: "Find Visa Sponsorship and Relocation Assistance Jobs | RelocateForWork.com",
    description:
      "Land your dream job and move abroad!",
    image: "https://res.cloudinary.com/dbvvslwpj/image/upload/f_auto,q_auto/c1ng5xtxmksgjwenulzv",
  }}
/>

<Hero />
<Email />
<ul class='mb-12'>
  {#each data?.records as record}
    <li class="relative">
      <a href={`/jobs/${encodeURIComponent(record.title.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, ''))}-${encodeURIComponent(record.companyname.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, ''))}-${encodeURIComponent(record.city.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, ''))}-${record.id}`} class={`relative flex px-3 justify-between max-w-screen-md gap-x-6 py-5 border border-gray-200 mb-3 rounded-lg flex-wrap items-center mx-auto transition-colors duration-200
          ${record.tier_1 ? 'bg-yellow-100 hover:bg-yellow-100' : 'hover:bg-gray-100'}`}>

          {#if record.tier_2}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="grey" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute top-4 right-4" transform="rotate(45 12 12)">
            <path d="M12 17v5"/>
            <path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z"/>
          </svg>
          {/if}
          
        <div class="flex min-w-0 flex-1 gap-x-4 items-center">
          <img class="h-16 w-16 flex-none rounded-full bg-gray-50 object-cover" src='https://connected-animal.pockethost.io/api/files/jobs/{record.id}/{record.picture}' alt="">
          <div class="min-w-0 flex-auto">
            <span class="text-primary-600 dark:text-primary-500 text-sm ">{record.companyname}</span>
            <p class="md:text-sm leading-6 text-gray-900 font-bold mt-px max-w-xs">{record.title}</p>
            <p class="mt-1 truncate text-xs leading-5 text-gray-500">{record.city}, {record.country}</p>
            <div class="inline-flex items-center rounded-full whitespace-nowrap border px-2.5 py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent text-primary-800 dark:text-primary-800 bg-blue-50">
              {record.tag}
            </div>
          </div>
        </div>
        <div class="flex flex-col items-end text-sm leading-6 text-gray-900 sm:flex-col-reverse">
          <!-- <span class="mt-1 text-purple-500 text-sm flex">Promoted</span> -->
          <span class="text-gray-500 text-sm flex">{record.created}</span>
        </div>
      </a>
    </li>
  {/each}
</ul>

<Email />
