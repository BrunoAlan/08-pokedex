import { pokeApi } from '@/src/config/api/pokeApi';
import { Pokemon } from '@/src/domain/entities/pokemon';
import { PokeAPIPokemon } from '@/src/infrastructure/interfaces/pokeapi.interfaces';
import { PokemonMapper } from '@/src/infrastructure/mappers/pokemon.mapper';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
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
