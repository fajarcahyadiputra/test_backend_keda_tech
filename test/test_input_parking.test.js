const app = require('../app');
const request = require("supertest");
const calculate_parking = require("../helpers/calculate_parking");

test("Test input parking and get status validation error plat no", async () => {
    const response = await request(app)
        .post("/api/v1/parking")
        .send({
            "vehicle_type": "motorcycle",
            "date_in": "11-21-2022 02:00:00",
            "date_out": "11-21-2022 05:02:00"

        })
        .expect(400);
})
test("Test input parking and get status validation error vehicle_type", async () => {
    const response = await request(app)
        .post("/api/v1/parking")
        .send({
            "plat_no": "B00BA",
            "date_in": "11-21-2022 02:00:00",
            "date_out": "11-21-2022 05:02:00"

        })
        .expect(400);
})
test("Test input parking and get status validation error date_in", async () => {
    const response = await request(app)
        .post("/api/v1/parking")
        .send({
            "plat_no": "B00BA",
            "vehicle_type": "",
            "date_out": "11-21-2022 05:02:00"

        })
        .expect(400);
})
test("Test input parking and get status validation error date_out", async () => {
    const response = await request(app)
        .post("/api/v1/parking")
        .send({
            "plat_no": "B00BA",
            "vehicle_type": "",
            "date_in": "11-21-2022 05:02:00"

        })
        .expect(400);
})
test("Test input parking and get status response 201", async () => {
    await request(app)
        .post("/api/v1/parking")
        .send({
            "plat_no": "BC089812",
            "vehicle_type": "motorcycle",
            "date_in": "11-21-2022 02:00:00",
            "date_out": "11-21-2022 05:02:00"

        })
        .expect(201);
})
test("Test calculate total price in hours for car", async () => {
    const { price_total } = calculate_parking(80000, 5000, "11-21-2022 02:00:00", "11-21-2022 05:02:00");
    expect(price_total).toEqual(20000);
})
test("Test calculate total price in day for car", async () => {
    const { price_total } = calculate_parking(80000, 5000, "11-21-2022 02:00:00", "11-22-2022 05:02:00");
    expect(price_total).toEqual(100000);
})
test("Test calculate total price in hours for motorcycle", async () => {
    const { price_total } = calculate_parking(40000, 2000, "11-21-2022 02:00:00", "11-21-2022 05:02:00");
    expect(price_total).toEqual(8000);
})
test("Test calculate total price in day for motorcycle", async () => {
    const { price_total } = calculate_parking(40000, 2000, "11-21-2022 02:00:00", "11-22-2022 05:02:00");
    expect(price_total).toEqual(48000);
})
