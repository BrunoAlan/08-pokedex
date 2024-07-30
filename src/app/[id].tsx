import { useLocalSearchParams } from 'expo-router';
import PokemonScreen from '../presentation/screen/pokemon/PokemonScreen';
import { useQuery } from '@tanstack/react-query';
import { getPokemonById } from '../actions/pokemons';
import FullScreenLoader from '../presentation/components/ui/FullScreenLoader';

const Pokemon = () => {
  // get query params

  const { id: pokemonId } = useLocalSearchParams();
  const { data: pokemon, isLoading } = useQuery({
    queryKey: ['pokemons', pokemonId],
    queryFn: () => getPokemonById(pokemonId as string),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  if (isLoading) {
    return <FullScreenLoader color={pokemon?.color} />;
  }

  return <PokemonScreen pokemon={pokemon} />;
};
export default Pokemon;
