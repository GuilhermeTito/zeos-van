import { Stack } from "expo-router"

export default function LayoutLogin(){
    return (
        <Stack screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="motorista" />
            <Stack.Screen name="passageiro" />
        </Stack>
    )
}