import { beforeAll, describe, expect, expectTypeOf, test } from "vitest";
import request from "supertest";
import { app } from "../../../server";

const BEFORE_ALL_TIMEOUT = 30000;

describe("Trips API Routes", () => {
  let response: request.Response;
  let tripList: Array<{ [key: string]: unknown }>;
  let singleTrip: { [key: string]: unknown };

  beforeAll(async () => {
    response = await request(app).get("/trips");
    tripList = response.body.data;

    if (tripList.length > 0) {
      const tripId = tripList[0].id;
      const singleTripResponse = await request(app).get(`/trips/${tripId}`);
      singleTrip = singleTripResponse.body;
    }
  }, BEFORE_ALL_TIMEOUT);

  test("Should have response status 200 for trips list", () => {
    expect(response.status).toBe(200);
  });

  test("Should return an array of trips", () => {
    expectTypeOf(tripList).toBeArray();
    expect(tripList.length).toBeGreaterThan(0);
  });

  test("Should return trip objects with expected properties", () => {
    expect(tripList[0]).toHaveProperty("id");
    expect(tripList[0]).toHaveProperty("pickup_location");
    expect(tripList[0]).toHaveProperty("dropoff_location");
  });

  test("GET /trips/:id should return a specific trip", async () => {
    if (singleTrip) {
      expect(singleTrip).toHaveProperty("id");
      expect(singleTrip.id).toBe(tripList[0].id);
    }
  });

  test("GET /trips/:id should return 404 if trip is not found", async () => {
    const nonExistentId = 9999;
    const res = await request(app).get(`/trips/${nonExistentId}`);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "Trip not found");
  });
});
