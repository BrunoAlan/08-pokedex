import { Stack } from 'expo-router';
import { ThemeContextProvider } from '../presentation/context/ThemeContext';

export default function RootLayout() {
  return (
    <ThemeContextProvider>
      <Stack initialRouteName='Pokemon'>
        <Stack.Screen name='index' />
        <Stack.Screen name='pokemon' />
        <Stack.Screen name='search' />
      </Stack>
    </ThemeContextProvider>
  );
}
