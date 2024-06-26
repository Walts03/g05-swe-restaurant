<template>
  <div
    class="font-sans lg:flex lg:items-center lg:justify-center lg:h-screen max-lg:py-4"
  >
    <div
      class="bg-gradient-to-br from-gray-200 to-gray-100 p-6 w-full max-w-5xl max-lg:max-w-xl mx-auto rounded-md"
    >
      <h2 class="text-3xl font-extrabold text-gray-800 text-center">
        Checkout
      </h2>

      <div class="grid lg:grid-cols-3 gap-6 mt-12">
        <div class="lg:col-span-2">
          <h3 class="text-lg font-bold text-gray-800">
            Add your card information
          </h3>

          <div class="flex gap-4 mt-4">
            <img
              src="https://readymadeui.com/images/visa.webp"
              class="w-12"
              alt="Visa"
            />
            <img
              src="https://readymadeui.com/images/american-express.webp"
              class="w-12"
              alt="American Express"
            />
            <img
              src="https://readymadeui.com/images/master.webp"
              class="w-12"
              alt="MasterCard"
            />
          </div>

          <form @submit.prevent="submit" class="mt-8" novalidate>
            <div class="grid gap-4 sm:grid-cols-2">
              <div>
                <input
                  v-model="cardholderName"
                  type="text"
                  placeholder="Name of card holder"
                  class="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-blue-500 outline-none"
                  :class="{ 'border-red-500': errors.cardholderName }"
                  required
                />
                <p
                  v-if="errors.cardholderName"
                  class="text-red-500 text-sm mt-1"
                >
                  Please enter the cardholder's name.
                </p>
              </div>
              <div>
                <input
                  v-model="postalCode"
                  type="text"
                  placeholder="Postal code"
                  class="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-blue-500 outline-none"
                  :class="{ 'border-red-500': errors.postalCode }"
                  pattern="^\d{4,6}$"
                  required
                />
                <p v-if="errors.postalCode" class="text-red-500 text-sm mt-1">
                  Please enter a valid postal code.
                </p>
              </div>
              <div class="col-span-full">
                <input
                  v-model="cardNumber"
                  type="text"
                  placeholder="Card number"
                  class="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-blue-500 outline-none"
                  :class="{ 'border-red-500': errors.cardNumber }"
                  pattern="^\d{16}$"
                  required
                />
                <p v-if="errors.cardNumber" class="text-red-500 text-sm mt-1">
                  Please enter a valid 16-digit card number.
                </p>
              </div>
              <div>
                <input
                  v-model="expDate"
                  type="text"
                  placeholder="EXP (MM/YY)"
                  class="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-blue-500 outline-none"
                  :class="{ 'border-red-500': errors.expDate }"
                  pattern="^(0[1-9]|1[0-2])\/\d{2}$"
                  required
                />
                <p v-if="errors.expDate" class="text-red-500 text-sm mt-1">
                  Please enter a valid expiration date (MM/YY).
                </p>
              </div>
              <div>
                <input
                  v-model="cvv"
                  type="text"
                  placeholder="CVV"
                  class="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-blue-500 outline-none"
                  :class="{ 'border-red-500': errors.cvv }"
                  pattern="^\d{3,4}$"
                  required
                />
                <p v-if="errors.cvv" class="text-red-500 text-sm mt-1">
                  Please enter a valid CVV (3 or 4 digits).
                </p>
              </div>
            </div>
            <button
              type="submit"
              class="mt-6 px-6 py-3.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
        </div>

        <div class="bg-white p-6 rounded-md">
          <h3 class="text-lg font-bold text-gray-800">Summary</h3>
          <ul class="text-gray-800 mt-4 space-y-2">
            <li
              v-for="item in cartItems"
              :key="item.name"
              class="flex justify-between text-sm"
            >
              {{ item.name }} (x{{ item.quantity }})
              <span class="font-bold">${{ item.price }}</span>
            </li>
            <hr class="my-2" />
            <li class="flex justify-between text-base font-bold">
              Total <span>${{ total }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cardholderName: "",
      postalCode: "",
      cardNumber: "",
      expDate: "",
      cvv: "",
      errors: {},
			cartItems: [],
      total: 0
    };
  },
  methods: {
    validateForm() {
      this.errors = {};

      if (!this.cardholderName) {
        this.errors.cardholderName = true;
      }
      if (!this.postalCode.match(/^\d{4,6}$/)) {
        this.errors.postalCode = true;
      }
      if (!this.cardNumber.match(/^\d{16}$/)) {
        this.errors.cardNumber = true;
      }
      if (!this.expDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
        this.errors.expDate = true;
      }
      if (!this.cvv.match(/^\d{3,4}$/)) {
        this.errors.cvv = true;
      }

      if (Object.keys(this.errors).length !== 0) {
				return false
      }
			return true
    },
		loadCart() {
			const cart = JSON.parse(localStorage.getItem('cart') || '{}');
			this.cartItems = Object.values(cart);
			this.total = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
		},
		submit: async function() {
			if (!this.validateForm()) {
				return
			}
			console.log(this.orderItemIds)
			const response = await fetch("http://localhost:8000/orders", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ items: this.orderItemIds }),
				credentials: "include",
			});
			const result = await response.json();
			if (response.ok) {
				this.$notify({
					type: "success",
					title: "Success",
					text: "Creating Order successfully!",
				});
				localStorage.removeItem('cart') 
				this.$router.push({ path: `/receipt/${result.id}` })
			} else {
				this.$notify({
					type: "error",
					title: "Error",
					text: `Error: ${result.detail || "Signup failed"}`,
				});
			}
		}
  },
	mounted() {
		this.loadCart();
	},
	computed: {
		orderItemIds() {
			return Object.values(this.cartItems).flatMap(item => Array(item.quantity).fill(item.id));
		}
	}
};
</script>

<style scoped>
.border-red-500 {
  border-color: #f87171;
}
</style>
