import { Stack } from "expo-router"

export default function LayoutMotorista(){
    return (
        <Stack screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="index" />
        </Stack>
    )
}