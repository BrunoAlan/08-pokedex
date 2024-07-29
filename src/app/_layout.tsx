import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack initialRouteName='Pokemon'>
      <Stack.Screen name='index' />
      <Stack.Screen name='pokemon' />
      <Stack.Screen name='search' />
    </Stack>
  );
}
