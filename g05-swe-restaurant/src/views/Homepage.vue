<template>
  <div class="container px-6 py-8 mx-auto lg:h-screen mt-20">
    <div
      class="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
    >
      <Foodcard
        v-for="item in paginatedItems"
        :key="item.id"
        :name="item.name"
        :price="item.price"
				@add-to-cart="addToCart"
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
</template>

<script setup>
import Foodcard from "../components/Foodcard.vue";
import { ref, computed } from "vue";

const foodItems = ref([
  {
    id: 1,
    name: "Pizza",
    price: 12,
    description: "A delicious cheese pizza with a crispy crusty.",
  },
  {
    id: 2,
    name: "Burger",
    price: 13,
    description: "Juicy beef burger with lettuce, tomato, and secret sauce.",
  },
  {
    id: 3,
    name: "Sushi",
    price: 14,
    description: "Fresh salmon sushi rolls with avocado and cucumber.",
  },
  {
    id: 4,
    name: "Sushi",
    price: 14,
    description: "Fresh salmon sushi rolls with avocado and cucumber.",
  },
  {
    id: 5,
    name: "Sushi",
    price: 14,
    description: "Fresh salmon sushi rolls with avocado and cucumber.",
  },
  {
    id: 6,
    name: "Sushi",
    price: 14,
    description: "Fresh salmon sushi rolls with avocado and cucumber.",
  },
  {
    id: 7,
    name: "Sushi",
    price: 14,
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

const addToCart = (item) => {
  let cart = JSON.parse(localStorage.getItem('cart')) || {};
	if (cart[item.name]) {
		++cart[item.name].quantity;
	} else {
		cart[item.name] = { name: item.name, price: item.price, quantity: 1};
	}
  localStorage.setItem('cart', JSON.stringify(cart));
};
</script>
