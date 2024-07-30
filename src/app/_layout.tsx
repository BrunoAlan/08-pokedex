import { Stack } from 'expo-router';
import { ThemeContextProvider } from '../presentation/context/ThemeContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name='index' />
          <Stack.Screen name='[id]' />
          <Stack.Screen name='search' />
        </Stack>
      </ThemeContextProvider>
    </QueryClientProvider>
  );
}
