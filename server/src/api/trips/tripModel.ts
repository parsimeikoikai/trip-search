import { z } from "zod";

export const TripSchema = z.object({
  id: z.string(),
  pickupLocation: z.string(),
  dropoffLocation: z.string(),
  startTime: z.string(), 
  finalCost: z.number(),
  rating: z.number(),
  status: z.enum(["COMPLETE", "CANCELED"]),
  driverName: z.string(),
  carMake: z.string(),
  carModel: z.string(),
  carNumber: z.string(),
});


export const GetTripSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export type Trip = z.infer<typeof TripSchema>;