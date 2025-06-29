const API_KEY = '0763b37eb674c7debb2ec3f2fb95cd62';

export const getWeatherByCity = async (city: string, unit: string) => {
    console.log("getWeatherByCity:", city, unit);
    const currentRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`
    );
    const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${API_KEY}`
    );

    const current = await currentRes.json();
    const forecast = await forecastRes.json();
    console.log("getWeatherByCity:", current, forecast);
    if (!currentRes.ok) {
        console.log('currentRes error:', current);
        throw new Error(current.message || 'Failed to fetch current weather');
    }
    if (!forecastRes.ok) {
        console.log('forecastRes error:', forecast);
        throw new Error(forecast.message || 'Failed to fetch forecast');
    }

    return { current, forecast };
};