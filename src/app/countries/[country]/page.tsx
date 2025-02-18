'use client';
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import custom from '@/styles/custom.module.css';

const fetchWeather = async (name: string) => {
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=7caf7fa96df84c1785d125711251702&q=${name}`);
        if (!response.ok) throw new Error("Failed to fetch weather data");
        return await response.json();
    } catch (error) {
        console.error("Error fetching weather:", error);
        return null;
    }
};

const CountryPage = () => {
    const params = useParams();
    const [weather, setWeather] = useState<any>(null);
    
    const countryName = params.country ? decodeURIComponent(params.country as string) : "Unknown Country";

    useEffect(() => {
        const getWeather = async () => {
            const data = await fetchWeather(countryName);
            setWeather(data);
        };
        getWeather();
    }, [countryName]);

    return (
        <div className={custom.selected_country_capital}>
            <h3>{countryName}</h3>
            {weather ? (
                <div>
                    <p><strong>Location:</strong> {weather.location.name}, {weather.location.country}</p>
                    <p><strong>Temperature:</strong> {weather.current.temp_c}°C</p>
                    <p><strong>Condition:</strong> {weather.current.condition.text}</p>
                    <img src={weather.current.condition.icon} alt={weather.current.condition.text} />
                </div>
            ) : (
                <p>Loading weather data...</p>
            )}
        </div>
    );
};

export default CountryPage;
