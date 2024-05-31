<template>
  <div
    class="font-[sans-serif] lg:flex lg:items-center lg:justify-center lg:h-screen"
  >
    <div
      class="bg-white rounded-lg shadow-lg px-8 py-10 w-full max-w-5xl max-lg:max-w-xl mx-auto"
    >
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center">
          <img
            class="h-8 w-8 mr-2"
            src="https://tailwindflex.com/public/images/logos/favicon-32x32.png"
            alt="Logo"
          />
          <div class="text-gray-700 font-semibold text-lg">
            Your Company Name
          </div>
        </div>
        <div class="text-gray-700">
          <div class="font-bold text-xl mb-2">INVOICE</div>
          <div class="text-sm">Date: {{ orderDate }}</div>
          <div class="text-sm">Invoice #: {{ order.id }}</div>
        </div>
      </div>
      <div class="border-b-2 border-gray-300 pb-8 mb-8">
        <h2 class="text-2xl font-bold mb-4">Bill To:</h2>
        <div class="text-gray-700 mb-2">{{ order?.customer?.name }}</div>
      </div>
      <table class="w-full text-left mb-8">
        <thead>
          <tr>
            <th class="text-gray-700 font-bold uppercase py-2">Name</th>
            <th class="text-gray-700 font-bold uppercase py-2">Quantity</th>
            <th class="text-gray-700 font-bold uppercase py-2">Price</th>
            <th class="text-gray-700 font-bold uppercase py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr
						v-for="item in orderItems"
					>
            <td class="py-4 text-gray-700">{{ item.name }}</td>
            <td class="py-4 text-gray-700">{{ item.quantity }}</td>
            <td class="py-4 text-gray-700">${{ item.price }}</td>
            <td class="py-4 text-gray-700">${{ item.price * item.quantity }}</td>
					</tr>
        </tbody>
      </table>
      <div class="flex justify-end mb-8">
        <div class="text-gray-700 mr-2">Total:</div>
        <div class="text-gray-700 font-bold text-xl">${{ total }}</div>
      </div>
      <div class="border-t-2 border-gray-300 pt-8 mb-8">
        <div class="text-gray-700 mb-2">
          Payment is due within 30 days. Late payments are subject to fees.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, computed, onMounted } from 'vue';
import { notify } from "@kyvg/vue3-notification";

const order = ref({ items: [] })

const orderDate = computed(() => (new Date(order.value.created_at)).toLocaleDateString('en-AU'))
const orderItems = computed(() => {
	let items = {}
	order.value.items.forEach(item => {
		item = item.item
		if (items[item.name]) {
			items[item.name].quantity++
		} else {
			items[item.name] = {
				name: item.name,
				price: item.price,
				quantity: 1,
			}
		}
	})
	return Object.values(items);
});
const total = computed(() => {
	let sum = 0;
	order.value.items.forEach(item => {
		sum += item.item.price
	})
	return sum
});


const router = useRouter()
const route = useRoute()

onMounted(async () => {
	const response = await fetch(`http://localhost:8000/orders/${route.params.id}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	});

	const result = await response.json();
	if (response.ok) {
		order.value = result;
		console.log(result);
	} else {
		notify({
			type: "error",
			title: "Error",
			text: `Error: ${result.detail || "View receipt failed"}`,
		});
		router.push({ name: "Homepage" })
	}
})

</script>
