<script setup lang="ts">
import { computed } from "vue";
import { useDragonball } from "../composables/useDragonball";
import InputCharacterSearch from "@/dragonball/components/InputCharacterSearch.vue";

const emit = defineEmits(["update:searchQuery"]);

const {
  setCurrentPage,
  returnTotalPagesInArray,
  response,
  currentPage,
  isLoading,
} = useDragonball();

const totalPages = computed(() => response?.value?.meta.totalPages || 1);
const pagesArray = computed(() =>
  returnTotalPagesInArray(response?.value?.meta.totalPages || 1)
);
</script>
<template>
  <header
    class="flex flex-col md:flex-row justify-between items-center gap-4 mt-6 px-4 max-w-5xl mx-auto"
  >
    <InputCharacterSearch class="w-full md:w-1/3" />
    <nav class="bg-white shadow-md rounded-lg p-3 w-full md:w-auto mx-auto">
      <ul class="flex items-center justify-center gap-2 flex-wrap">
        <li>
          <button
            @click="setCurrentPage(currentPage - 1)"
            :disabled="currentPage === 1 || isLoading"
            class="px-4 py-2 rounded-md transition-all duration-300 font-semibold text-sm md:text-base"
            :class="
              currentPage === 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-slate-600 text-white hover:bg-slate-500'
            "
          >
            Previous
          </button>
        </li>
        <li v-for="page in pagesArray" :key="page">
          <button
            @click="setCurrentPage(page)"
            :disabled="isLoading"
            class="px-4 py-2 rounded-md transition-all duration-300 font-semibold text-sm md:text-base"
            :class="
              currentPage === page
                ? 'bg-indigo-900 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            "
          >
            {{ page }}
          </button>
        </li>
        <li>
          <button
            @click="setCurrentPage(currentPage + 1)"
            :disabled="currentPage === totalPages || isLoading"
            class="px-4 py-2 rounded-md transition-all duration-300 font-semibold text-sm md:text-base"
            :class="
              currentPage === totalPages
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-slate-600 text-white hover:bg-slate-500'
            "
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>
