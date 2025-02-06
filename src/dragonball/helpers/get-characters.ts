import { dragonballApi } from "@/dragonball/api/dragonballApi";
import type { ListCharacterResponse, ShortCharacter } from "@/dragonball/interfaces/DragonBall";

export const getCharacters = async (page: number = 1, limit: number): Promise<ListCharacterResponse> => {
    const { data } = await dragonballApi.get<ListCharacterResponse>(`/characters?page=${page}&limit=${limit}`);
    return data;
};


export const getCharactersByName = async (name: string): Promise<ShortCharacter[]> => {
    const { data } = await dragonballApi.get<ShortCharacter[]>(`/characters?name=${name}`);
    return data;
}
