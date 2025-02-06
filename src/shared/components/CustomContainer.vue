<script setup lang="ts">
import CharacterPagination from '@/dragonball/components/CharacterPagination.vue';
import CharactersList from '@/dragonball/components/CharactersList.vue';
</script>
<template>
  <section
    class="glass-container mx-10 my-4 flex flex-col p-5 min-h-[90vh]"
  >
  <CharacterPagination />
  <CharactersList />

  </section>
</template>
<style scoped>
.glass-container {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(15px);
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
