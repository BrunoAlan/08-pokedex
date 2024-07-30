import { pokeApi } from '@/src/config/api/pokeApi';
import { Pokemon } from '@/src/domain/entities/pokemon';
import { PokeAPIPokemon } from '@/src/infrastructure/interfaces/pokeapi.interfaces';
import { PokemonMapper } from '@/src/infrastructure/mappers/pokemon.mapper';

export const getPokemonById = async (id: string): Promise<Pokemon> => {
  try {
    const { data } = await pokeApi.get<PokeAPIPokemon>(`/pokemon/${id}`);
    const pokemon = await PokemonMapper.pokeApiPokemonToEntity(data);
    return pokemon;
  } catch (error) {
    throw new Error(`Error getting pokemon by id: ${id}`, error as Error);
  }
};
