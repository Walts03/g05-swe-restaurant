<template>
  <div>
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
      <div
        class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4"
      >
        <router-link
          to="/"
          class="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <!-- <img
            src="https://flowbite.com/docs/images/logo.svg"
            class="h-8"
            alt="Flowbite Logo"
          /> -->
          <span
            class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
            >My Restaurant</span
          >
        </router-link>
      </div>
    </nav>
    <nav class="bg-gray-50 dark:bg-gray-700">
      <div class="max-w-screen-xl px-4 py-3 mx-auto">
        <div class="flex items-center">
          <ul
            class="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm"
          >
            <li>
              <router-link
                to="/"
                class="text-gray-900 dark:text-white hover:underline"
                aria-current="page"
                >Home
              </router-link>
            </li>

            <li>
              <router-link
                class="text-sm text-blue-600 dark:text-blue-500 hover:underline"
                to="/analytics"
                >Analytics</router-link
              >
            </li>
            <li>
              <router-link
                class="text-sm text-blue-600 dark:text-blue-500 hover:underline"
                to="/menuitems"
                >Orders</router-link
              >
            </li>
            <li>
              <router-link
                class="text-sm text-blue-600 dark:text-blue-500 hover:underline"
                to="/cart"
                >Cart</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>
<script setup></script>
