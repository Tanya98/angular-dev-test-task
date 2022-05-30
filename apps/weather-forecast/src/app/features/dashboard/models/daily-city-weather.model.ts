export interface DailyCityWeatherResponse {
    daily: Day[];
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
}

export interface Day {
    clouds?: number;
    dew_point?: number;
    dt?: number;
    feels_like?: null;
    humidity?: number;
    moon_phase?: number;
    moonrise?: number;
    moonset?: number;
    pop?: number;
    pressure?: number;
    sunrise?: number;
    sunset?: number;
    temp: Temperature[];
    uvi?: number;
    weather?: null;
    wind_deg?: number;
    wind_gust?: number;
    wind_speed?: number;
}

export interface Temperature {
    day?: number;
    min?: number;
    max?: number;
    night?: number;
    eve?: number;
    morn?: number;
}
