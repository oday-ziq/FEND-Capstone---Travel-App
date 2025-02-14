import { calculateDaysLeft, formatWeatherData } from "../client/js/helpers";

test("calculateDaysLeft returns correct days until trip", () => {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + 10); // 10 days from now

    const daysLeft = calculateDaysLeft(futureDate.toISOString().split("T")[0]);
    expect(daysLeft).toBe(10);
});

test("formatWeatherData correctly formats weather object", () => {
    const weatherMock = {
        weather: { description: "Sunny" },
        max_temp: 30,
        min_temp: 20
    };

    const formattedWeather = formatWeatherData(weatherMock);
    expect(formattedWeather).toBe("Weather: Sunny, High: 30°C, Low: 20°C");
});
