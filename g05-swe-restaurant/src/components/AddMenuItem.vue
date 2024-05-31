<template>
  <div class="lg:h-screen">
    <div class="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Add Menu Item
        </h2>
        <p class="mt-2 text-lg leading-8 text-gray-600">Add Your Meals</p>
      </div>
      <form action="#" method="POST" class="mx-auto mt-16 max-w-xl sm:mt-20">
        <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div class="sm:col-span-2">
            <label
              for="name"
              class="block text-sm font-semibold leading-6 text-black"
              >Name</label
            >
            <div class="mt-2.5">
              <input
                type="text"
                name="name"
                id="name"
                autocomplete="name"
                class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div class="sm:col-span-2">
            <label
              for="price"
              class="block text-sm font-semibold leading-6 text-red-600"
              >Price</label
            >
            <div class="mt-2.5">
              <input
                type="price"
                name="price"
                id="price"
                autocomplete="price"
                class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div class="sm:col-span-2">
            <div class="flex items-center justify-center w-full">
              <label
                for="dropzone-file"
                class="flex flex-col items-center justify-center w-full h-64 border-2 shadow-sm ring-1 ring-inset shadow-blue-500 ring-blue-300 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-white dark:bg-white hover:bg-gray-300 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-300"
              >
                <div
                  class="flex flex-col items-center justify-center pt-5 pb-6"
                >
                  <svg
                    class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">Click to upload</span> or drag
                    and drop
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input id="dropzone-file" type="file" class="hidden" />
              </label>
            </div>
          </div>
        </div>
        <div class="mt-10">
          <button
            type="submit"
            class="block w-full rounded-md bg-cyan-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
