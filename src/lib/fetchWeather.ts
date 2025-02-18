export const fetchWeather = async (name: string) => {
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=7caf7fa96df84c1785d125711251702&q=${name}`);
        if (!response.ok) throw new Error("Failed to fetch weather data");
        return await response.json();
    } catch (error) {
        console.error("Error fetching weather:", error);
        return null;
    }
};