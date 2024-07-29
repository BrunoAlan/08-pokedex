import { getPokemons } from '@/src/actions/pokemons/get-pokemons';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
const HomeScreen = () => {
  getPokemons();
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button mode='contained'>Press me</Button>
    </View>
  );
};
export default HomeScreen;
