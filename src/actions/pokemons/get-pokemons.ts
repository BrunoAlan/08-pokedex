import { pokeApi } from '@/src/config/api/pokeApi';
import { Pokemon } from '@/src/infrastructure/interfaces/pokemon';

export const getPokemons = async () => {
  try {
    const url = '/pokemon';
    const { data } = await pokeApi.get(url);
    return data.results as Pokemon[];
  } catch (error) {
    console.error(error);
  }
};
