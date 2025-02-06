import { dragonballApi } from "@/dragonball/api/dragonballApi";
import type { Character } from "@/dragonball/interfaces/DragonBall";

export const getCharacter = async (id: string): Promise<Character> => {
    const { data } = await dragonballApi.get<Character>(`/characters/${id}`);
    return data;
}
