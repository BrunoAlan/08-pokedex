import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';

export default function RootLayout() {
  return (
    <PaperProvider>
      <Stack initialRouteName='Pokemon'>
        <Stack.Screen name='index' />
        <Stack.Screen name='pokemon' />
        <Stack.Screen name='search' />
      </Stack>
    </PaperProvider>
  );
}
