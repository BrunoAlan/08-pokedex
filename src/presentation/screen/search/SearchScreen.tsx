import { globalTheme } from '@/src/config/theme/global-theme';
import { Pokemon } from '@/src/domain/entities/pokemon';
import { FlatList, View, StyleSheet } from 'react-native';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PokemonCard from '../../components/pokemons/PokemonCard';
import { useQuery } from '@tanstack/react-query';
import {
  getPokemonsByIds,
  getPokemonsNamesWithId,
} from '@/src/actions/pokemons';
import { useMemo, useState } from 'react';
import FullScreenLoader from '../../components/ui/FullScreenLoader';
import { useDebouncedValue } from '../../hooks/useDebounceValue';
import PokeballBg from '../../components/ui/PokeballBg';
const SearchScreen = () => {
  const { top } = useSafeAreaInsets();
  const [term, setTerm] = useState('');
  const value = useDebouncedValue(term, 500);
  const { isLoading, data: pokemonNameList = [] } = useQuery({
    queryKey: ['pokemons', 'all'],
    queryFn: () => getPokemonsNamesWithId(),
  });

  const pokemonNameIdList = useMemo(() => {
    if (!isNaN(Number(value))) {
      const pokemon = pokemonNameList.find(
        (pokemon) => pokemon.id === Number(value)
      );
      return pokemon ? [pokemon] : [];
    }

    if (value.length === 0) return [];
    if (value.length < 3) return [];

    return pokemonNameList.filter((pokemon) =>
      pokemon.name.includes(term.toLowerCase())
    );
  }, [value]);

  const { data: pokemons, isLoading: isLoadingPokemons } = useQuery({
    queryKey: ['pokemons', 'by', pokemonNameIdList],
    staleTime: 1000 * 60 * 60, // 1 hour
    queryFn: () =>
      getPokemonsByIds(pokemonNameIdList.map((pokemon) => pokemon.id)),
  });

  if (isLoading) return <FullScreenLoader />;

  return (
    <View style={[globalTheme.globalMargin, { paddingTop: top }]}>
      <PokeballBg style={styles.imgPosition} />
      <TextInput
        mode='flat'
        autoCorrect={false}
        autoFocus
        placeholder='Search Pokemon'
        value={term}
        onChangeText={setTerm}
      />
      {isLoadingPokemons && <ActivityIndicator style={{ paddingTop: 20 }} />}
      <FlatList
        data={pokemons as Pokemon[]}
        keyExtractor={(pokemon, index) => `${pokemon?.id}-${index}`}
        numColumns={2}
        style={{ paddingTop: top + 20 }}
        renderItem={({ item: pokemon }) => <PokemonCard pokemon={pokemon!} />}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.6}
        ListFooterComponent={<View style={{ height: 160 }} />}
      />
    </View>
  );
};
export default SearchScreen;

const styles = StyleSheet.create({
  imgPosition: {
    position: 'absolute',
    top: -100,
    right: -100,
  },
});
