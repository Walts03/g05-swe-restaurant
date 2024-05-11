<template>
  <div
    class="space-y-6 lg:w-1/5 lg:px-2 bg-gray-900 rounded-3xl shadow-xl text-white"
  >
    <h1 class="text-2xl font-bold pt-5 pl-5">Menu</h1>
    <nav class="pl-5">
      <ul>
        <!-- Foods Dropdown -->
        <li>
          <a
            href="#"
            class="flex items-center py-2 px-5 text-lg hover:bg-sky-700 rounded-full"
            @click="toggleDropdown('foods')"
          >
            <i class="fa fa-utensils mr-2" aria-hidden="true"></i>
            Foods
          </a>
          <div
            v-show="activeDropdown === 'foods'"
            class="bg-white text-black w-full shadow-lg rounded"
          >
            <a
              href="#"
              class="block px-4 py-2 text-sm hover:bg-gray-200 rounded"
              >Appetizers</a
            >
            <a
              href="#"
              class="block px-4 py-2 text-sm hover:bg-gray-200 rounded"
              >Main courses</a
            >
            <a
              href="#"
              class="block px-4 py-2 text-sm hover:bg-gray-200 rounded"
              >Desserts</a
            >
          </div>
        </li>
        <!-- Drinks Dropdown -->
        <li>
          <a
            href="#"
            class="flex items-center py-2 px-5 text-lg hover:bg-sky-700 rounded-full"
            @click="toggleDropdown('drinks')"
          >
            <i class="fa fa-cocktail mr-1" aria-hidden="true"></i>
            Drinks
          </a>
          <div
            v-show="activeDropdown === 'drinks'"
            class="bg-white text-black w-full shadow-lg rounded"
          >
            <a href="#" class="block px-4 py-2 text-sm hover:bg-gray-200"
              >Cocktails</a
            >
            <a href="#" class="block px-4 py-2 text-sm hover:bg-gray-200"
              >Juices</a
            >
            <a href="#" class="block px-4 py-2 text-sm hover:bg-gray-200"
              >Sodas</a
            >
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeDropdown: null,
    };
  },
  methods: {
    toggleDropdown(menu) {
      this.activeDropdown = this.activeDropdown === menu ? null : menu;
    },
  },
};
</script>

<style>
/* Ensure the dropdown takes space and pushes content below it */
.dropdown-content {
  transition: max-height 0.35s ease-out;
  overflow: hidden;
  max-height: 0; /* Initial state - not visible */
}

.dropdown-content.show {
  max-height: 500px; /* Maximum height when expanded */
}
</style>
