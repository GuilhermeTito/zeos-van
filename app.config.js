module.exports = {
    "expo": {
        "name": "zeos-van",
        "slug": "zeos-van",
        "version": "1.0.0",
        "scheme": "esquema-zeos-van",
        "orientation": "portrait",
        "icon": "./assets/icon.png",
        "userInterfaceStyle": "light",
        "splash": {
        "image": "./assets/splash.png",
        "resizeMode": "contain",
        "backgroundColor": "#ffffff"
        },
        "ios": {
        "supportsTablet": true
        },
        "android": {
        "adaptiveIcon": {
            "foregroundImage": "./assets/adaptive-icon.png",
            "backgroundColor": "#ffffff"
        },
        "package": "com.anonymous.zeosvan",
        "config": {
            "googleMaps": {
                "apiKey": process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY
            }
        }
        },
        "web": {
        "favicon": "./assets/favicon.png"
        },
        "plugins": [
        "expo-router"
        ],
        "extra": {
        "eas": {
            "projectId": "a30bb66c-9083-4e35-8277-68476eb850aa"
        }
        },
        "owner": "guilhermetito"
    }
}