import { useDragonballStore } from "@/stores/dragonballStore"
import { useQuery } from "@tanstack/vue-query";
import { storeToRefs } from "pinia";
import { getCharacters } from "@/dragonball/helpers/get-characters";
import { computed, watch } from "vue";
import { useToast } from "vue-toast-notification";

export const useDragonball = () => {
    // Store
    const dragonballStore = useDragonballStore();
    const { response, currentPage } = storeToRefs(dragonballStore);

    // Toaster
    const toaster = useToast();

    // Vue Query
    const queryKey = computed(() => ['characters', currentPage.value]);
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: queryKey.value,
        queryFn: () => getCharacters(currentPage.value, 20),
        enabled: computed(() => !!currentPage.value)
    });

    watch(currentPage, () => {
        refetch();
    });

    watch(data, (newData) => {
        if (newData) {
            dragonballStore.setResponse(newData);
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

    // Methods
    const setCurrentPage = (page: number) => {
        dragonballStore.setCurrentPage(page);
    }

    const returnTotalPagesInArray = (totalPages: number) => {
        return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    return {
        response,
        currentPage,
        isLoading,
        isError,
        error,
        setCurrentPage,
        returnTotalPagesInArray
    }
}
