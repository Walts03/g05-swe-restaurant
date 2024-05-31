<template>
  <div class="bg-gray-50">
		<notifications/>
    <Nav></Nav>
    <main>
      <router-view> </router-view>
    </main>
		<Footer/>
  </div>
  <Footer></Footer>
</template>
<script setup>
import Nav from "./Nav.vue";
import Footer from "./Footer.vue";
</script>
