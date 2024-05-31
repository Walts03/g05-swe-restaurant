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

          <form @submit.prevent="validateForm" class="mt-8" novalidate>
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
            <li class="flex justify-between text-sm">
              Product 1 <span class="font-bold">$100.00</span>
            </li>
            <li class="flex justify-between text-sm">
              Product 2 <span class="font-bold">$50.00</span>
            </li>
            <li class="flex justify-between text-sm">
              Product 3 <span class="font-bold">$75.00</span>
            </li>
            <li class="flex justify-between text-sm">
              Tax <span class="font-bold">$25.00</span>
            </li>
            <hr class="my-2" />
            <li class="flex justify-between text-base font-bold">
              Total <span>$450.50</span>
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

      if (Object.keys(this.errors).length === 0) {
        alert("Form submitted successfully!");
      }
    },
  },
};
</script>

<style scoped>
.border-red-500 {
  border-color: #f87171;
}
</style>
