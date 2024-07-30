import { getPokemons } from '@/src/actions/pokemons';
import { useQuery } from '@tanstack/react-query';
import PokeballBg from '../../components/ui/PokeballBg';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text } from 'react-native-paper';
import { globalTheme } from '@/src/config/theme/global-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PokemonCard from '../../components/pokemons/PokemonCard';
const HomeScreen = () => {
  const { top } = useSafeAreaInsets();
  const { data: pokemons = [], isLoading } = useQuery({
    queryKey: ['pokemons'],
    queryFn: () => getPokemons(0),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <View style={globalTheme.globalMargin}>
      <PokeballBg style={styles.imgPosition} />
      <FlatList
        data={pokemons}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2}
        style={{ paddingTop: top + 20 }}
        ListHeaderComponent={() => <Text variant='displayMedium'>Pokedex</Text>}
        renderItem={({ item: pokemon }) => <PokemonCard pokemon={pokemon} />}
      />
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  imgPosition: {
    position: 'absolute',
    top: -100,
    right: -100,
  },
});
