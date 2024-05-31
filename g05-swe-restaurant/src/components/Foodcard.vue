<template>
  <div
    class="flex flex-col items-center justify-center w-full max-w-lg mx-auto"
  >
    <div
      class="w-full max-w-md mx-auto bg-white rounded-3xl shadow-xl overflow-hidden"
    >
      <div class="max-w-md mx-auto">
        <div
          class="h-[236px]"
          style="
            background-size: cover;
            background-position: center;
          "
					:style="{ backgroundImage: 'url(data:image/jpeg;base64,' + thumbnail + ')' }"
        ></div>
        <div class="p-4 sm:p-6">
          <p class="font-bold text-gray-700 text-[22px] leading-7 mb-1">
            {{ name }}
          </p>
          <div class="flex flex-row">
            <p class="text-[17px] font-bold text-[#0FB478]">${{ price }}</p>
          </div>

          <button
						@click="addItem"
            class="block mt-10 w-full px-4 py-3 font-medium tracking-wide text-center capitalize transition-colors duration-300 transform bg-[#FFC933] rounded-[14px] hover:bg-[#FFC933DD] focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-80"
          >
            Add Item
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  id: Number,
  name: String,
  price: Number,
  thumbnail: String,
});

const emits = defineEmits(['add-to-cart']);

const addItem = () => {
  emits('add-to-cart', { id: props.id, name: props.name, price: props.price, thumbnail: props.thumbnail });
};
</script>
