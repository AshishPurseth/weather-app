'use client';
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import custom from '@/styles/custom.module.css';
import { fetchWeather } from "@/lib/fetchWeather";



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
