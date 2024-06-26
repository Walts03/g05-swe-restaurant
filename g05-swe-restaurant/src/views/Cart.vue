<template>
  <!-- component -->
  <div class="flex flex-col min-h-screen">
    <div class="flex-grow">
      <!-- Your main content here -->
      <div class="bg-gray-100 pt-20">
        <h1 class="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div
          class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0"
        >
          <div class="rounded-lg md:w-2/3">
            <div
              v-for="item in Object.values(cartItems)"
              :key="item.id"
              class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
            >
              <img
								:src="'data:image/jpeg;base64,' + item.thumbnail"
                :alt="item.name"
                class="w-full rounded-lg sm:w-40"
              />
              <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div class="mt-5 sm:mt-0">
                  <h2 class="text-lg font-bold text-gray-900">
                    {{ item.name }}
                  </h2>
                </div>
                <div
                  class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6"
                >
                  <div class="flex items-center border-gray-100">
										<span
                      class="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                      @click="updateQuantity(item.name, item.quantity - 1)"
                    >
                      -
                    </span>
                    <span
                      class="h-8 w-8 border bg-white text-center text-xs outline-none flex justify-center items-center"
                    >
											{{ item.quantity }}
										</span>
                    <span
                      class="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                      @click="updateQuantity(item.name, item.quantity + 1)"
                    >
                      +
                    </span>
                  </div>
                  <div class="flex items-center space-x-4">
                    <p class="text-sm">${{ item.price * item.quantity }}</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
											@click="removeItem(item.name)"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Sub total -->
          <div
            class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3"
          >
            <div class="flex justify-between">
              <p class="text-lg font-bold">Total</p>
              <div class="">
                <p class="mb-1 text-lg font-bold">${{ total }}</p>
                <p class="text-sm text-gray-700">including VAT</p>
              </div>
            </div>
						<router-link to="/checkout">
							<button
								class="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
							>
								Check Out
							</button>
						</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const cartItems = ref({});

const loadCart = () => {
  cartItems.value = JSON.parse(localStorage.getItem('cart') || '{}');
};

const updateQuantity = (name, quantity) => {
  if (quantity < 1) return;
  const cart = JSON.parse(localStorage.getItem('cart') || '{}');
  cart[name].quantity = quantity;
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
};

const removeItem = (name) => {
  const cart = JSON.parse(localStorage.getItem('cart') || '{}');
  delete cart[name];
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
};

const subtotal = computed(() => {
  return Object.values(cartItems.value).reduce((sum, item) => sum + item.price * item.quantity, 0);
});

const total = computed(() => {
  return subtotal.value;
});

onMounted(() => {
  loadCart();
});
</script>
