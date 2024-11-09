import { beforeEach, describe, expect, it, vi } from "vitest";
import { tripController } from "../tripController";
import * as tripService from "../tripService";
import { Request, Response } from "express";

describe("Trip Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
      send: vi.fn(),
    };
  });

  describe("getTrips", () => {
    const mockTrips = [
      {
        id: 1,
        status: "COMPLETED",
        request_date: "2024-10-01T10:00:00Z",
        pickup_lat: 1.2921,
        pickup_lng: 36.8219,
        pickup_location: "Location A",
        dropoff_lat: 1.2864,
        dropoff_lng: 36.8172,
        dropoff_location: "Location B",
        pickup_date: "2024-10-01T10:00:00Z",
        dropoff_date: "2024-10-01T10:30:00Z",
        type: "Standard",
        driver_id: 101,
        driver_name: "John Doe",
        driver_rating: 4.8,
        driver_pic: "http://example.com/driver1.jpg",
        car_make: "Toyota",
        car_model: "Corolla",
        car_number: "XYZ 1234",
        car_year: 2020,
        car_pic: "http://example.com/car1.jpg",
        duration: 30,
        duration_unit: "minutes",
        distance: 10,
        distance_unit: "km",
        cost: 100,
        cost_unit: "USD",
      },
      {
        id: 2,
        status: "COMPLETED",
        request_date: "2024-10-02T11:00:00Z",
        pickup_lat: 1.3032,
        pickup_lng: 36.8219,
        pickup_location: "Location C",
        dropoff_lat: 1.2864,
        dropoff_lng: 36.8172,
        dropoff_location: "Location D",
        pickup_date: "2024-10-02T11:00:00Z",
        dropoff_date: "2024-10-02T11:45:00Z",
        type: "Standard",
        driver_id: 102,
        driver_name: "Jane Smith",
        driver_rating: 4.9,
        driver_pic: "http://example.com/driver2.jpg",
        car_make: "Honda",
        car_model: "Civic",
        car_number: "ABC 5678",
        car_year: 2019,
        car_pic: "http://example.com/car2.jpg",
        duration: 45,
        duration_unit: "minutes",
        distance: 15,
        distance_unit: "km",
        cost: 150,
        cost_unit: "USD",
      },
      {
        id: 3,
        status: "CANCELLED",
        request_date: "2024-10-03T12:00:00Z",
        pickup_lat: 1.2951,
        pickup_lng: 36.8219,
        pickup_location: "Location E",
        dropoff_lat: 1.2864,
        dropoff_lng: 36.8172,
        dropoff_location: "Location F",
        pickup_date: "2024-10-03T12:00:00Z",
        dropoff_date: null,
        type: "Premium",
        driver_id: 103,
        driver_name: "Bob Johnson",
        driver_rating: 4.7,
        driver_pic: "http://example.com/driver3.jpg",
        car_make: "Ford",
        car_model: "Mustang",
        car_number: "DEF 9012",
        car_year: 2021,
        car_pic: "http://example.com/car3.jpg",
        duration: 0,
        duration_unit: "minutes",
        distance: 0,
        distance_unit: "km",
        cost: 0,
        cost_unit: "USD",
      },
    ];

    it("should return a list of trips", async () => {
      vi.spyOn(tripService, "getAllTrips").mockResolvedValue(mockTrips);
      vi.spyOn(tripService, "searchTrips").mockResolvedValue(mockTrips);

      req.query = {
        keyword: "Location A",
        includeCanceled: "false",
      };

      await tripController.getTrips(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockTrips);
    });

    it("should handle errors", async () => {
      vi.spyOn(tripService, "getAllTrips").mockRejectedValue(
        new Error("Service Error")
      );

      await tripController.getTrips(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error fetching trips",
      });
    });
  });
  describe("searchTrips", () => {
    it("should handle errors in searchTrips", async () => {
      vi.spyOn(tripService, "searchTrips").mockRejectedValue(
        new Error("Service Error")
      );

      req.query = {
        keyword: "Location A",
        includeCanceled: "true",
      };

      await tripController.searchTrips(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "An error occurred while retrieving trips",
      });
    });
  });
});
