<template>
  <div class="bg-gray-50">
    <Nav></Nav>
    <main>
      <router-view> </router-view>
    </main>
    <Footer></Footer>
  </div>
</template>
<script setup>
import Nav from "./Nav.vue";
import Footer from "./Footer.vue";
</script>
