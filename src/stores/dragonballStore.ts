import type { Character, ListCharacterResponse, ShortCharacter } from "@/dragonball/interfaces/DragonBall";
import { defineStore } from "pinia"
import { ref } from "vue";

export const useDragonballStore = defineStore('dragonball', () => {

    const response = ref<ListCharacterResponse>();
    const filter = ref<ShortCharacter[]>([]);
    const currentPage = ref<number>(1);
    const selectedCharacter = ref<Character | null>(null);

    const setResponse = (data: ListCharacterResponse) => {
        response.value = data;
    }

    const setCurrentPage = (page: number) => {
        currentPage.value = page;
    }

    const setFilters = (data: ShortCharacter[]) => {
        filter.value = data;
    }

    const setSelectedCharacter = (data: Character) => {
        selectedCharacter.value = data;
    }

    const clearSelectedCharacter = () => {
        selectedCharacter.value = null;
    }

    return {
        response,
        currentPage,
        filter,
        selectedCharacter,
        setResponse,
        setCurrentPage,
        setFilters,
        setSelectedCharacter,
        clearSelectedCharacter
    }
});
