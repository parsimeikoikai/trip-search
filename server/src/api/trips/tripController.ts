import { Request, Response } from "express";
import { getTripById, searchTrips } from "./tripService";
import { searchTrips as searchTripsService } from "./tripService";

export const tripController = {
  getTrips: async (req: Request, res: Response) => {
    try {
      const { keyword, includeCanceled } = req.query;
      const filteredTrips = await searchTrips(
        keyword as string,
        includeCanceled === "true"
      );
      res.status(200).json(filteredTrips);
    } catch (error) {
      res.status(500).json({ message: "Error fetching trips" });
    }
  },

  getTrip: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const trip = await getTripById(id);
      if (trip) {
        res.status(200).json(trip);
      } else {
        res.status(404).json({ message: "Trip not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching trip" });
    }
  },

  searchTrips: async (req: Request, res: Response) => {
    const { keyword, includeCanceled, distance, time } = req.query;

    try {
      const trips = await searchTripsService(
        String(keyword || ""),
        includeCanceled === "true",
        distance ? parseInt(String(distance)) : undefined,
        String(time || "")
      );
      const serviceResponse = {
        message: "Success",
        data: trips,
      };
      return res.status(200).json(serviceResponse);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "An error occurred while retrieving trips" });
    }
  },
};
