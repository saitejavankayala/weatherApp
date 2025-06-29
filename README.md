
# 🌦️ Weather App (React Native)

A modern weather forecasting application built using **React Native**, allowing users to search for cities and view current weather along with a 5-day forecast. Includes unit toggling (Celsius/Fahrenheit), offline support, and error handling.

---

## 📽️ Demo

![Weather App Demo](./src/assets/weatherApp.gif)

---

## 📱 Features

- 🔍 **Search City**: Enter any city name to fetch real-time weather data.
- 🌤 **Current Weather**: View temperature, condition, humidity, and wind speed.
- 📅 **5-Day Forecast**: Shows weather details for the upcoming days.
- 🌡️ **Celsius/Fahrenheit Toggle**: Switch between metric and imperial units.
- ⚙️ **Settings Screen**: Manage unit preferences.
- 📶 **Graceful API Error Handling**: For invalid cities or network issues.
---

## 🔧 Folder Structure

```
src/
├── api/               # Weather API logic
│   └── weather.ts
├── assets/
│   └── images/        # Weather icons and app demo GIF
├── features/
│   ├── settings/      # Redux slice for settings
│   └── weather/       # Redux slice for weather data
├── navigation/        # App navigation
├── screens/           # Home and settings screens
├── store/             # Redux store config
```

---

## 🛠️ Tech Stack

- React Native 0.7x+
- TypeScript
- Redux Toolkit
- React Navigation
- OpenWeatherMap API
- AsyncStorage (Bonus)
- Expo Location (Bonus)
- Jest & React Native Testing Library

---

## 🧪 Testing

- Unit tests using **Jest**
- Component testing with **@testing-library/react-native**

```bash
npm test
```

---

## 🏗️ Installation

```bash
# Clone the repository
git clone https://github.com/saitejavankayala/WeatherApp_Assignment.git
cd WeatherApp_Assignment

# Install dependencies
npm install

# Run the app
npx react-native run-android   # For Android
npx react-native run-ios       # For iOS (macOS only)
```

---

## 📦 APK Build (Mandatory)

```bash
# Generate release APK
cd android
./gradlew assembleRelease

# APK will be in:
android/app/build/outputs/apk/release/app-release.apk
```

---

## 📄 Design Decisions

- Used **Redux Toolkit** for scalable state management.
- Error boundaries and loading states ensure smooth UX.
- Modular folder structure with clear separation of concerns.
- Weather icons enhance visual context based on conditions.

---

## ✅ Deliverables

- ✅ Clean and responsive UI
- ✅ Working functionality for all major features
- ✅ APK file included
- ✅ Bonus: Option to add location detection and offline caching

---

## 🔗 API Reference

- [OpenWeatherMap API](https://openweathermap.org/api)

---

## 🙌 Credits

Made with ❤️ by [@saitejavankayala](https://github.com/saitejavankayala)
