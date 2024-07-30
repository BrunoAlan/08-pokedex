import { Pokemon } from '@/src/domain/entities/pokemon';
import { getPokemonById } from './get-pokemon-by-id';

export const getPokemonsByIds = async (id: number[]): Promise<Pokemon[]> => {
  try {
    const pokemonPromises = id.map(async (id) => {
      return getPokemonById(id);
    });
    return Promise.all(pokemonPromises);
  } catch (error) {
    throw new Error('Error getting pokemons by ids', error as Error);
  }
};
