

<!-- <h2 class="mb-4 text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl dark:text-white">Sign up for our newsletter</h2> -->

<!-- <section class="bg-white dark:bg-gray-900">
    <div class="py-4 px-4 mx-auto max-w-screen-lg lg:py-8 lg:px-6 flex flex-wrap">
        <div class="w-full md:w-1/2 px-4 mb-0 md:mb-0">
            
            <p class="mx-auto mb-8 max-w-2xl font-light text-gray-500 md:mb-12 sm:text-xl dark:text-gray-400">Stay up to date with the latest Jobs delivered straight to your email.</p>
        </div>
        <div class="w-full md:w-1/2 px-4">
            <form method="post" action="?/createmail">
                <div class="items-center mx-auto mb-0 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
                    <div class="relative w-full">
                        <label for="email" class="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email address</label>
                        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                        </div>
                        <input class="block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter your email" type="email" id="email" name='email' required>
                    </div>
                    <div>
                        <button type="submit" class="py-3 px-5 w-full text-sm font-medium text-center text-white rounded-lg border cursor-pointer bg-primary-700 border-primary-600 sm:rounded-none sm:rounded-r-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Subscribe</button>
                    </div>
                </div>
                <div class="mx-auto max-w-screen-sm text-sm text-left text-gray-500 newsletter-form-footer dark:text-gray-300">We care about the protection of your data. <a href="/" class="font-medium text-primary-600 dark:text-primary-500 hover:underline">Read our Privacy Policy</a>.</div>
            </form>
        </div>
    </div>
  </section>
   -->

   <!-- lib/email.svelte -->

<!-- lib/email.svelte -->

<script>
    const createEmail = async (email) => {
  const response = await fetch('?/createmail', {
    method: 'POST',
    body: new URLSearchParams({ email }),
  });

  if (response.ok) {
    const result = await response.json();
    return result.message || 'Email submitted successfully!';
  } else {
    throw new Error('Failed to submit email');
  }
};

let showAlert = false;
let alertMessage = '';

const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    alertMessage = await createEmail(event.target.email.value);
    showAlert = true;
    setTimeout(() => {
      showAlert = false;
    }, 3000);
  } catch (error) {
    console.error(error);
    alertMessage = 'Failed to submit email';
    showAlert = true;
    setTimeout(() => {
      showAlert = false;
    }, 3000);
  }
};

  </script>
  {#if showAlert}
  <div class="fixed top-0 left-0 right-0 p-4 text-center text-sm text-green-800 bg-green-300 dark:bg-gray-800 dark:text-green-400 z-50" role="alert">
    <span class="font-medium">{alertMessage}</span>
  </div>
    {/if}
  <section class="bg-white dark:bg-gray-900">
    <div class="py-4 px-4 mx-auto max-w-screen-lg lg:py-8 lg:px-6 flex flex-wrap">
      <div class="w-full md:w-1/2 px-4 mb-0 md:mb-0">
        <p class="mx-auto mb-8 max-w-2xl font-light text-gray-500 md:mb-12 sm:text-xl dark:text-gray-400">Stay up to date with the latest Jobs delivered straight to your email.</p>
      </div>
      <div class="w-full md:w-1/2 px-4">
        <form on:submit={handleSubmit}>
          <div class="items-center mx-auto mb-0 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
            <div class="relative w-full">
              <label for="email" class="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email address</label>
              <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
              </div>
              <input class="block p-3 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter your email" type="email" id="email" name='email' required>
            </div>
            <div>
              <button type="submit" class="py-3 px-5 w-full text-sm font-medium text-center text-white rounded-lg border cursor-pointer bg-primary-700 border-primary-600 sm:rounded-none sm:rounded-r-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Subscribe</button>
            </div>
          </div>
          <!-- <div class="mx-auto max-w-screen-sm text-sm text-left text-gray-500 newsletter-form-footer dark:text-gray-300">We care about the protection of your data. <a href="/" class="font-medium text-primary-600 dark:text-primary-500 hover:underline">Read our Privacy Policy</a>.</div> -->
        </form>
      </div>
    </div>
  </section>
  
  
  