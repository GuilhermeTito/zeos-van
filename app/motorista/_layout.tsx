import { Stack } from 'expo-router/stack';

export default function LayoutMotorista() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  )
}
