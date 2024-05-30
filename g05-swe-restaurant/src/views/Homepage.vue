<template>
  <div class="container px-6 py-8 mx-auto">
    <div
      class="flex items-center justify-between text-sm tracking-widest uppercase"
    >
      <p
        class="font-medium text-gray-700 dark:text-gray-700 focus:outline-none bg-transparent"
      >
        6 Items
      </p>
      <div class="flex items-center">
        <p class="font-medium text-gray-500 dark:text-black">Sort</p>
        <select
          class="font-medium text-gray-700 bg-transparent dark:text-gray-500 focus:outline-none"
        >
          <option value="#">Recommended</option>
          <option value="#">Size</option>
          <option value="#">Price</option>
        </select>
      </div>
    </div>
    <div
      class="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
    >
      <Foodcard
        v-for="item in paginatedItems"
        :key="item.id"
        :title="item.title"
        :price="item.price"
        :description="item.description"
      ></Foodcard>
    </div>
    <!-- Pagination Controls -->
    <div class="flex justify-center space-x-2 mt-4">
      <ul class="inline-flex -space-x-px text-sm">
        <li>
          <a
            href="#"
            @click="changePage(currentPage - 1)"
            class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            :class="{ 'cursor-not-allowed opacity-50': currentPage <= 1 }"
            :disabled="currentPage <= 1"
            >Previous</a
          >
        </li>
        <li v-for="n in totalPages" :key="n">
          <a
            href="#"
            @click="changePage(n)"
            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            :class="{
              'text-blue-600 bg-blue-50 dark:bg-gray-700': n === currentPage,
            }"
            >{{ n }}</a
          >
        </li>
        <li>
          <a
            href="#"
            @click="changePage(currentPage + 1)"
            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            :class="{
              'cursor-not-allowed opacity-50': currentPage >= totalPages,
            }"
            :disabled="currentPage >= totalPages"
            >Next</a
          >
        </li>
      </ul>
    </div>
  </div>
  <Footerview></Footerview>
</template>
<script setup>
import Foodcard from "../components/Foodcard.vue";
import Footerview from "../components/Footer.vue";
import { ref, computed } from "vue";

const foodItems = ref([
  {
    id: 1,
    title: "Pizza",
    price: "12$",
    description: "A delicious cheese pizza with a crispy crusty.",
  },
  {
    id: 2,
    title: "Burger",
    price: "13$",
    description: "Juicy beef burger with lettuce, tomato, and secret sauce.",
  },
  {
    id: 3,
    title: "Sushi",
    price: "14$",
    description: "Fresh salmon sushi rolls with avocado and cucumber.",
  },
  {
    id: 4,
    title: "Sushi",
    price: "14$",
    description: "Fresh salmon sushi rolls with avocado and cucumber.",
  },
  {
    id: 5,
    title: "Sushi",
    price: "14$",
    description: "Fresh salmon sushi rolls with avocado and cucumber.",
  },
  {
    id: 6,
    title: "Sushi",
    price: "14$",
    description: "Fresh salmon sushi rolls with avocado and cucumber.",
  },
  {
    id: 7,
    title: "Sushi",
    price: "14$",
    description: "Fresh salmon sushi rolls with avocado and cucumber.",
  },
  // Add more items as needed
]);

const itemsPerPage = 6;
const currentPage = ref(1);

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return foodItems.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(foodItems.value.length / itemsPerPage);
});

function changePage(page) {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
}
</script>
