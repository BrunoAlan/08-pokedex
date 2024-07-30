import { getPokemons } from '@/src/actions/pokemons';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import PokeballBg from '../../components/ui/PokeballBg';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { globalTheme } from '@/src/config/theme/global-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PokemonCard from '../../components/pokemons/PokemonCard';
const HomeScreen = () => {
  const { top } = useSafeAreaInsets();
  const queryClient = useQueryClient();
  const { dark } = useTheme();
  // just for one http request
  // const { data: pokemons = [], isLoading } = useQuery({
  //   queryKey: ['pokemons'],
  //   queryFn: () => getPokemons(0),
  //   staleTime: 1000 * 60 * 5, // 5 minutes
  // });

  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['pokemons', 'infinite'],
    initialPageParam: 0,
    queryFn: async (params) => {
      const pokemons = await getPokemons(params.pageParam);
      pokemons?.forEach((pokemon) => {
        queryClient.setQueryData(['pokemon', `${pokemon.id}`], pokemon);
      });

      return pokemons;
    },
    getNextPageParam: (lastPage, pages) => pages.length,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  return (
    <View style={globalTheme.globalMargin}>
      <PokeballBg style={styles.imgPosition} />
      <FlatList
        data={data?.pages.flat() ?? []}
        keyExtractor={(pokemon, index) => `${pokemon?.id}-${index}`}
        numColumns={2}
        style={{ paddingTop: top + 20 }}
        ListHeaderComponent={() => (
          <Text
            style={{ color: dark ? 'white' : 'black' }}
            variant='displayMedium'
          >
            Pokedex
          </Text>
        )}
        renderItem={({ item: pokemon }) => <PokemonCard pokemon={pokemon!} />}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.6}
        onEndReached={() => fetchNextPage()}
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
