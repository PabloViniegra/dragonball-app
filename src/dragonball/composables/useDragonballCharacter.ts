import { useDragonballStore } from "@/stores/dragonballStore";
import { getCharacter } from "@/dragonball/helpers/get-character";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import { storeToRefs } from "pinia";
import { watch } from "vue";
import { useToast } from "vue-toast-notification";


export const useDragonballCharacter = (id: string) => {

    // Store
    const dragonballStore = useDragonballStore();
    const { selectedCharacter } = storeToRefs(dragonballStore);

    // Toaster
    const toaster = useToast();

    // Query Client
    const queryClient = useQueryClient();

    // Vue Query Hook
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['character', id],
        queryFn: () => getCharacter(id),
        enabled: !!id
    });

    const prefetchCharacter = (id: number) => {
        queryClient.prefetchQuery({
            queryKey: ["character", id],
            queryFn: () => getCharacter(id.toString()),
        });
    };

    watch(data, (newData) => {
        if (newData) {
            dragonballStore.setSelectedCharacter(newData);
        }
    }, { immediate: true });

    watch(isError, (newIsError) => {
        if (newIsError) {
            console.error(error.value?.message);
            toaster.error('An error occurred while fetching character.', {
                duration: 3000,
                dismissible: true
            });
        }
    })

    return {
        selectedCharacter,
        isLoading,
        isError,
        error,
        prefetchCharacter
    }

}
