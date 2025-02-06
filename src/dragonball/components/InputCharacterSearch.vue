<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from "vue";
import SearchIcon from "@/shared/components/icons/SearchIcon.vue";
import { useDragonballFilter } from "@/dragonball/composables/useDragonballFilter";
import { useRouter } from "vue-router";

const router = useRouter();

const { filter, searchQuery, isLoading } = useDragonballFilter();

const searchInput = ref<HTMLInputElement | null>(null);
const isFocused = ref<boolean>(false);

const handleShortcut = (event: KeyboardEvent) => {
  if (event.ctrlKey && event.key.toLocaleLowerCase() === "k") {
    event.preventDefault();
    searchInput.value?.focus();
  }
};

const showDropdown = computed(
  () => searchQuery.value.length > 0 && filter.value.length > 0
);

const selectCharacter = (characterId: number) => {
  searchQuery.value = "";
  router.push({ name: "Character", params: { id: characterId } });
};

onMounted(() => {
  window.addEventListener("keydown", handleShortcut);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleShortcut);
});
</script>
<template>
  <div class="relative w-full md:w-96 px-2 md:px-0">
    <div class="relative">
      <input
        v-model="searchQuery"
        @focus="isFocused = true"
        @blur="isFocused = false"
        ref="searchInput"
        type="text"
        placeholder="Search a character..."
        class="w-full pr-10 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none shadow-md text-gray-700 placeholder-gray-400 font-roboto text-sm md:text-base"
      />
      <SearchIcon class="absolute left-3 top-3 text-gray-400 size-5" />
      <svg
        v-if="searchQuery !== ''"
        xmlns="http://www.w3.org/2000/svg"
        width="128"
        class="size-6 absolute right-3 top-3 text-gray-400 hover:bg-slate-300 p-1 rounded-full cursor-pointer"
        @click="searchQuery = ''"
        height="128"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="m6.4 18.308l-.708-.708l5.6-5.6l-5.6-5.6l.708-.708l5.6 5.6l5.6-5.6l.708.708l-5.6 5.6l5.6 5.6l-.708.708l-5.6-5.6z"
        />
      </svg>
      <div
        v-show="!isFocused && searchQuery === ''"
        class="absolute right-3 top-3 flex items-center gap-1 bg-gray-200/40 px-2 py-1 rounded-md text-xs font-semibold text-gray-600"
      >
        <span class="bg-gray-300/50 px-1 py-0.5 rounded text-xs">Ctrl</span>
        <span class="bg-gray-300/50 px-1 py-0.5 rounded text-xs">K</span>
      </div>
    </div>
    <div v-if="isLoading" class="absolute right-10 top-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="size-5 text-gray-400"
        width="128"
        height="128"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z"
          opacity=".5"
        />
        <path
          fill="currentColor"
          d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"
        >
          <animateTransform
            attributeName="transform"
            dur="1s"
            from="0 12 12"
            repeatCount="indefinite"
            to="360 12 12"
            type="rotate"
          />
        </path>
      </svg>
    </div>
    <ul
      v-else-if="showDropdown && filter.length > 0"
      class="absolute w-full bg-white border border-gray-300 rounded-lg mt-2 shadow-md z-10 max-h-60 overflow-y-auto text-sm md:text-base"
    >
      <li
        v-for="character in filter"
        :key="character.id"
        @click="selectCharacter(character.id)"
        class="px-4 py-3 hover:bg-gray-200 cursor-pointer flex items-center gap-3"
      >
        <img
          :src="character.image"
          :alt="character.name"
          class="size-10 rounded-full object-scale-down"
        />
        <span class="text-gray-800 font-semibold font-roboto">{{
          character.name
        }}</span>
      </li>
    </ul>
  </div>
</template>
