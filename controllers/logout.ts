import AsyncStorage from "@react-native-async-storage/async-storage"
import { router } from "expo-router"

export default function logout() {
    AsyncStorage.setItem("accessToken", "")
    router.replace("/")
}