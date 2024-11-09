import express, { type Router } from "express";
import { z } from "zod";

import { tripController } from "./tripController";
import { validateRequest } from "@/common/utils/httpHandlers";
import { GetTripSchema } from "./tripModel";

export const tripsRouter: Router = express.Router();

tripsRouter.get("/", tripController.searchTrips);

tripsRouter.get("/:id", validateRequest(GetTripSchema), tripController.getTrip);
