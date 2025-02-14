const request = require("supertest");
const express = require("express");
const routes = require("../server/routes");

const app = express();
app.use(express.json());
app.use("/", routes);

test("POST /getTrip should return trip data", async () => {
    const response = await request(app)
        .post("/getTrip")
        .send({ city: "Paris" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("locationData");
    expect(response.body).toHaveProperty("weatherData");
    expect(response.body).toHaveProperty("imageData");
});
