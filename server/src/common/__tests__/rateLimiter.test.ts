import express, { type Express } from "express";
import request from "supertest";
import { StatusCodes } from "http-status-codes";
import rateLimiter from "@/common/middleware/rateLimiter"; 
import { env } from "@/common/utils/envConfig";

describe("Rate Limiter Middleware", () => {
  let app: Express;

  beforeAll(() => {
    app = express();

    app.use(rateLimiter);

    app.get("/test", (req, res) => {
      res.status(StatusCodes.OK).send("Test successful");
    });
  });

  describe("Rate Limiting", () => {
    it("should allow requests under the rate limit", async () => {
      const response = await request(app).get("/test");
      expect(response.status).toBe(StatusCodes.OK);
      expect(response.text).toBe("Test successful");
    });

    it("should return a rate limit error after too many requests", async () => {
      const limit = env.COMMON_RATE_LIMIT_MAX_REQUESTS; 


      for (let i = 0; i < limit; i++) {
        await request(app).get("/test");
      }


      const response = await request(app).get("/test");
      expect(response.status).toBe(StatusCodes.TOO_MANY_REQUESTS); // 429
      expect(response.text).toBe("Too many requests, please try again later.");
    });
  });
});
