<script>
  import Hero from '../lib/Hero.svelte'
  export let data;

</script>

<Hero />
<div>
  
  <ul >
      {#each data?.records as record}
      <a href="{record.url}">
        <li class="flex px-3 justify-between max-w-screen-md gap-x-6 py-5 border border-gray-200 mb-3 rounded-lg flex-wrap items-center mx-auto">
          <div class="flex min-w-0 gap-x-4 items-center">
            <img class="h-12 w-12 flex-none rounded-full bg-gray-50" src='http://127.0.0.1:8090/api/files/jobs/{record.id}/{record.picture}' alt="">
            <div class="min-w-0 flex-auto">
              <span class="text-purple-800 text-sm ">{record.companyname}</span>
              <h3 class="md:text-sm leading-6 text-gray-900 font-bold mt-px max-w-xs">{record.title}</h3>
              <p class="mt-1 truncate text-xs leading-5 text-gray-500">{record.city}, {record.country}</p>
              <div class="inline-flex items-center rounded-full whitespace-nowrap border px-2.5 py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-secondary/80 text-purple-700 bg-purple-100">
                {record.tag}
              </div>
            </div>
          </div>
          <div class="flex flex-col items-end text-sm leading-6 text-gray-900 sm:flex-col-reverse ">
            <span class="mt-1 text-gray-500 text-sm flex">Aug 24</span>
            <!-- <span class="mt-1 text-gray-500 text-sm flex">Promoted</span> -->
          </div>
        </li>
      </a>
      {/each}
  </ul>
</div>

