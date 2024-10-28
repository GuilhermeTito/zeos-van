import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Tabs } from 'expo-router'

export default function TabLayoutPassageiro() {
return (
    <Tabs screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "brown"
    }}>
        <Tabs.Screen
            name="(index)"
            options={{
            title: "Home",
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
            }}
        />
        <Tabs.Screen
            name="configuracoes"
            options={{
            title: "Configurações",
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
            }}
        />
    </Tabs>    
    )
}
