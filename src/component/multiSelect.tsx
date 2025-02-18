'use client'
import Select, { MultiValue } from 'react-select';
import { options } from "@/lib/constants";
import { useEffect, useState } from 'react';
import custom from '@/styles/custom.module.css';
import { fetchWeather } from "@/lib/fetchWeather";

type OptionType = { value: string; label: string };

const MultiSelect = ({ session }: any) => {
    const sessionId = session?.userId ?? "";
    const [selectedOptions, setSelectedOptions] = useState<MultiValue<OptionType>>([]);
    const [weatherData, setWeatherData] = useState<{ location: any; current: any }[]>([]);

    const handleChange = (selected: MultiValue<OptionType>) => {
        if (selected.length <= 5) {
            setSelectedOptions(selected);
        }
    };

    const getWeatherForCities = async (cities: string[]) => {
        const weatherPromises = cities.map(city => fetchWeather(city));
        const weatherResults = await Promise.all(weatherPromises);

        setWeatherData(weatherResults.filter(data => data !== null));
    };

    useEffect(() => {
        const postCities = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/cities', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ selectedOptions, sessionId })
                });

                if (!response.ok) throw new Error('Failed to post data');

                const data = await response.json();

                const formattedCities = data.cities.map((city: string) => ({
                    value: city,
                    label: city
                }));

                setSelectedOptions(formattedCities);
                getWeatherForCities(data.cities);
            } catch (error) {
                console.error(error);
            }
        };

        if (selectedOptions.length > 0) {
            postCities();
        }
    }, [selectedOptions]);

    useEffect(() => {
        const getCities = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/cities?sessionId=${sessionId}`, {
                    method: 'GET',
                    headers: { "Content-Type": "application/json" },
                });

                if (!response.ok) throw new Error('Failed to Get data');

                const data = await response.json();
                const formattedCities = data.user.cities.map((city: string) => ({
                    value: city,
                    label: city
                }));

                setSelectedOptions(formattedCities);

                // Fetch weather for the first city
                if (data.user.cities.length > 0) {
                    getWeatherForCities(data.user.cities);
                }

            } catch (error) {
                console.error(error);
            }
        };
        getCities();
    }, []);

   

    return (
        <div className={custom.multi_select}>
            <Select
                options={options}
                value={selectedOptions}
                onChange={handleChange}
                isMulti={true}
            />
            <p>Selected {selectedOptions.length}/5</p>

            <main className={custom.homepage_weather}>
                {weatherData.length > 0 ? (
                    weatherData.map((weather, index) => (
                        <div key={index}>
                            <h3>{weather.location.name}, {weather.location.country}</h3>
                            <p>Temperature: {weather.current.temp_c}°C</p>
                            <p>Condition: {weather.current.condition.text}</p>
                            <img src={weather.current.condition.icon} alt="Weather icon" />
                        </div>
                    ))
                ) : (
                    <p>No weather data available</p>
                )}
            </main>
        </div>
    );
};

export default MultiSelect;
