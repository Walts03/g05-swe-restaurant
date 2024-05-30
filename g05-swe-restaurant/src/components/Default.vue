<template>
  <div class="bg-gray-50">
		<notifications/>
    <Nav></Nav>
    <main>
      <router-view> </router-view>
    </main>
  </div>
</template>
<script setup>
import Nav from "./Nav.vue";
import Footer from "./Footer.vue";
</script>
