import { getCharactersByName } from "@/dragonball/helpers/get-characters";
import { useDragonballStore } from "@/stores/dragonballStore";
import { useQuery } from "@tanstack/vue-query";
import { storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";
import { useToast } from "vue-toast-notification";

export const useDragonballFilter = () => {

    // Store
    const dragonballStore = useDragonballStore();
    const { filter } = storeToRefs(dragonballStore);

    // Toaster
    const toaster = useToast();

    const searchQuery = ref<string>("")

    const queryKey = computed(() => ['filters', searchQuery.value]);
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey,
        queryFn: () => getCharactersByName(searchQuery.value),
        enabled: () => !!searchQuery.value
    })

    watch(searchQuery, (newValue) => {
        if (newValue.length > 0) {
            refetch();
        }
    })

    watch(data, (newData) => {
        if (newData) {
            dragonballStore.setFilters(newData);
        }
    }, { immediate: true });

    watch(isError, (newIsError) => {
        if (newIsError) {
            console.error(error.value?.message);
            toaster.error('An error occurred while fetching characters.', {
                duration: 3000,
                dismissible: true
            });
        }
    })

    return {
        filter,
        searchQuery,
        isLoading,
        isError,
        error
    }

}
