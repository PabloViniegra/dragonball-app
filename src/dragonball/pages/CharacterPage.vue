<script setup lang="ts">
import { useRoute } from "vue-router";
import { useDragonballCharacter } from "@/dragonball/composables/useDragonballCharacter";
import { computed, ref, type Ref } from "vue";
import CustomLoader from "@/shared/components/CustomLoader.vue";

const route = useRoute();
const id = route.params.id;

const { selectedCharacter, isLoading } = useDragonballCharacter(id.toString());

const character = computed(() => selectedCharacter.value);
</script>
<template>
  <main class="flex flex-col items-center p-4 sm:p-6 min-h-screen w-full">
    <div v-if="isLoading" class="flex justify-center items-center h-[80vh]">
      <CustomLoader :customClass="'size-24 text-white'" />
    </div>
    <section
      v-else-if="selectedCharacter"
      class="container w-full max-w-4xl bg-white/10 p-5 sm:p-8 rounded-lg shadow-lg backdrop-blur-md"
    >
      <header class="flex flex-col items-center text-center">
        <h1
          class="font-golos text-4xl font-black text-white capitalize drop-shadow-lg"
        >
          {{ character?.name }}
        </h1>
      </header>
      <section
        class="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mt-6 sm:mt-8 items-center"
      >
        <Motion
          :initial="{ opacity: 0, y: 100 }"
          :enter="{ opacity: 1, y: 0, scale: 1 }"
          :variants="{ custom: { scale: 2 } }"
          :hovered="{ scale: 1.2 }"
          :delay="200"
          :duration="1200"
        >
          <div class="flex justify-center">
            <img
              class="w-44 sm:w-64 h-auto object-cover rounded-lg shadow-lg hover:scale-105 transition-transform"
              :src="character?.image"
              :alt="character?.name"
            />
          </div>
        </Motion>
        <div class="flex flex-col gap-6">
          <MotionGroup preset="slideVisibleRight" :duration="600">
            <div class="flex flex-col gap-1">
              <h2 class="text-lg font-bold font-golos text-white uppercase">
                Raza
              </h2>
              <p class="text-md font-medium text-white/80">
                {{ character?.race }}
              </p>
            </div>
            <div class="flex flex-col gap-1">
              <h2 class="text-lg font-bold font-golos text-white uppercase">
                Ki
              </h2>
              <p class="text-md font-medium text-white/80">
                {{ character?.ki }}
              </p>
            </div>
            <div class="flex flex-col gap-1">
              <h2 class="text-lg font-bold font-golos text-white uppercase">
                Afiliación
              </h2>
              <p class="text-md font-medium text-white/80">
                {{ character?.affiliation }}
              </p>
            </div>
          </MotionGroup>
        </div>
      </section>
      <section class="mt-12 px-6">
        <MotionGroup preset="slideVisibleBottom" :duration="600">
          <h2 class="text-2xl font-bold font-golos text-white mb-3">
            Descripción
          </h2>
          <p class="text-lg text-white/80 leading-relaxed">
            {{ character?.description }}
          </p>
        </MotionGroup>
      </section>
      <section v-if="character?.originPlanet" class="mt-12 px-6">
        <MotionGroup preset="popVisible" :duration="600">
        <h2 class="text-2xl font-bold font-golos text-white mb-3">
          Planeta de Origen
        </h2>
        <div
          class="flex items-center gap-5 bg-white/10 p-5 rounded-lg shadow-md backdrop-blur-lg"
        >
          <img
            class="w-16 sm:w-24 h-16 sm:h-24 rounded-lg shadow-md object-cover hover:scale-105 transition-transform"
            :src="character.originPlanet.image"
            :alt="character.originPlanet.name"
          />
          <div>
            <h3 class="text-xl font-semibold text-white">
              {{ character.originPlanet.name }}
            </h3>
            <p
              class="text-sm font-medium"
              :class="
                character.originPlanet.isDestroyed
                  ? 'text-red-500'
                  : 'text-green-400'
              "
            >
              {{ character.originPlanet.isDestroyed ? "Destruido" : "Activo" }}
            </p>
          </div>
        </div>
    </MotionGroup>
      </section>
      <section v-if="character?.transformations.length" class="mt-12 px-6">
        <MotionGroup preset="slideVisibleLeft" :duration="600">
          <h2 class="text-2xl font-bold font-golos text-white mb-5">
            Transformaciones
          </h2>
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
          >
            <article
              v-for="transformation in character.transformations"
              :key="transformation.id"
              class="bg-white/10 p-5 rounded-lg shadow-md flex flex-col items-center text-center backdrop-blur-lg hover:scale-105 transition-transform shadow-gray-100/40"
            >
              <img
                class="size-28 sm:size-36 object-contain rounded-lg shadow-md"
                :src="transformation.image"
                :alt="transformation.name"
              />
              <h3 class="text-lg font-semibold text-white mt-3">
                {{ transformation.name }}
              </h3>
              <p class="text-md text-white/80 font-medium mt-1">
                Ki: {{ transformation.ki }}
              </p>
            </article>
          </div>
        </MotionGroup>
      </section>
    </section>
  </main>
</template>
