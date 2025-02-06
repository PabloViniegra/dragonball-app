<script setup lang="ts">
import { useDragonball } from "@/dragonball/composables/useDragonball";
import { match as parseKiValue } from "@/shared/helpers/unit-helper";
import { useDragonballCharacter } from "../composables/useDragonballCharacter";
import { useRouter } from "vue-router";
import CustomLoader from "@/shared/components/CustomLoader.vue";

const router = useRouter();

const { response, isLoading } = useDragonball();
const { prefetchCharacter } = useDragonballCharacter("");

const getKiPercentage = (ki: string, maxKi: string) => {
  const currentKi = parseKiValue(ki);
  const maxKiValue = parseKiValue(maxKi);

  if (!currentKi || !maxKiValue || maxKiValue === 0) return 0;
  if (currentKi >= maxKiValue) return 100;

  return Math.min((currentKi / maxKiValue) * 100, 100);
};
</script>
<template>
  <div class="container mx-auto p-4">
    <div
      v-if="isLoading"
      class="flex flex-row justify-center min-h-[70vh] items-center"
    >
      <CustomLoader :customClass="'size-24 text-white'" />
    </div>
    <div
      v-else-if="response"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
    >
      <article
        v-for="character in response?.items"
        :key="character.id"
        @mouseover="prefetchCharacter(character.id)"
        @click="
          router.push({ name: 'Character', params: { id: character.id } })
        "
        class="character-card bg-white/90 rounded-lg shadow-lg shadow-white overflow-hidden transform transition hover:-translate-y-2 hover:shadow-xl hover:cursor-pointer"
      >
        <div class="h-48 overflow-hidden flex justify-center mt-3">
          <img
            :src="character.image"
            :alt="character.name"
            class="h-44 object-fill"
          />
        </div>
        <div class="p-4">
          <h2 class="text-lg font-bold mb-2 font-roboto text-center">
            {{ character.name }}
          </h2>
          <p class="text-pretty font-roboto font-medium text-sm line-clamp-3">
            {{ character.description }}
          </p>
          <div class="mt-4">
            <h3 class="text-sm font-semibold text-gray-600">Ki Level</h3>
            <div
              class="relative w-full h-3 bg-gray-300 rounded-full overflow-hidden mt-1"
            >
              <div
                class="h-full bg-green-500 transition-all duration-500"
                :style="{
                  width: `${getKiPercentage(character.ki, character.maxKi)}%`,
                }"
              ></div>
            </div>
            <p class="text-xs text-gray-500 mt-1">
              {{ character.ki }} / {{ character.maxKi }}
            </p>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>
