<template>
  <router-view />
</template>

<script setup>
import { useUserStore } from '../src/stores/user'
useUserStore().getUser()
// import { defineComponent } from 'vue'

// defineComponent({
//   name: 'App'
// })
</script>
