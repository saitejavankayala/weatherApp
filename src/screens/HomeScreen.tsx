import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    ImageBackground,
    Animated,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '../features/weather/weatherSlice';
import { RootState } from '../store';

// Inline utility functions
const getWeatherBackground = (condition: string) => {
    switch (condition?.toLowerCase()) {
        case 'clear':
            return require('../assets/images/clear_weather.jpg');
        case 'clouds':
            return require('../assets/images/cloudy_weather.jpg');
        case 'rain':
            return require('../assets/images/rain_weather.jpg');
        case 'snow':
            return require('../assets/images/snow_weather.jpg');
        case 'thunderstorm':
            return require('../assets/images/thunderstorm_weather.jpg');
        default:
            return require('../assets/images/default_weather.jpg');
    }
};

const getWeatherIcon = (condition: string) => {
    switch (condition?.toLowerCase()) {
        case 'clear':
            return '☀️';
        case 'clouds':
            return '☁️';
        case 'rain':
            return '🌧️';
        case 'snow':
            return '❄️';
        case 'thunderstorm':
            return '⛈️';
        case 'mist':
        case 'fog':
            return '🌫️';
        default:
            return '🌈';
    }
};

const getDayName = (dt_txt: string) => {
    const date = new Date(dt_txt);
    return date.toLocaleDateString('en-US', { weekday: 'short' }); // Mon, Tue, etc.
};

const HomeScreen = () => {
    const [city, setCity] = useState('');
    const dispatch = useDispatch();
    const { current, forecast, loading, error } = useSelector((state: RootState) => state.weather);
    const unit = useSelector((state: RootState) => state.settings.unit);
    const lastCity = useRef<string | null>(null);

    const handleSearch = () => {
        if (city.trim()) {
            dispatch(fetchWeather({ city, unit }) as any);
            lastCity.current = city;
        }
    };

    useEffect(() => {
        if (lastCity.current) {
            dispatch(fetchWeather({ city: lastCity.current, unit }) as any);
        }
    }, [unit]);

    const screenBg = current ? getWeatherBackground(current.weather[0].main) : null;

    return (
        <ImageBackground source={screenBg} resizeMode="cover" style={styles.background}>
            <View style={styles.overlay}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter city"
                    value={city}
                    onChangeText={setCity}
                />
                <Button title="Get Weather" onPress={handleSearch} />
                {loading && <ActivityIndicator size="large" />}
                {error && <Text style={styles.error}>{error}</Text>}

                {current && (
                    <View style={styles.card}>
                        <Text style={styles.text}>City: {current.name}</Text>
                        <Text style={styles.text}>Temperature: {current.main.temp}°</Text>
                        <Text style={styles.text}>
                            Condition: {getWeatherIcon(current.weather[0].main)} {current.weather[0].description}
                        </Text>
                        <Text style={styles.text}>Humidity: {current.main.humidity}%</Text>
                        <Text style={styles.text}>Wind: {current.wind.speed} m/s</Text>
                    </View>
                )}

                <FlatList
                    horizontal
                    data={forecast}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) => {
                        const condition = item.weather?.[0]?.main || '';
                        const icon = getWeatherIcon(condition);
                        const day = getDayName(item.dt_txt);
                        const bg = getWeatherBackground(condition);
                        const fadeAnim = new Animated.Value(0);

                        Animated.timing(fadeAnim, {
                            toValue: 1,
                            duration: 800,
                            useNativeDriver: true,
                        }).start();

                        return (
                            <Animated.View style={{ opacity: fadeAnim }}>
                                <ImageBackground
                                    source={bg}
                                    style={styles.forecastCard}
                                    imageStyle={{ borderRadius: 10 }}
                                >
                                    <Text style={styles.forecastText}>{day}</Text>
                                    <Text style={styles.forecastText}>{icon}</Text>
                                    <Text style={styles.forecastText}>{item.main.temp}°</Text>
                                </ImageBackground>
                            </Animated.View>
                        );
                    }}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        padding: 16,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    input: {
        borderWidth: 1,
        marginBottom: 10,
        padding: 8,
        backgroundColor: '#fff',
    },
    card: {
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#ffffffcc',
        borderRadius: 8,
    },
    error: {
        color: 'red',
    },
    text: {
        color: '#000',
    },
    forecastCard: {
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginRight: 10,
    },
    forecastText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default HomeScreen;
