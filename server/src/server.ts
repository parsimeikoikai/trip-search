import cors from "cors";
import helmet from "helmet";
import { pino } from "pino";
import express, { Request, Response, Express } from "express"; 

import errorHandler from "@/common/middleware/errorHandler";
import rateLimiter from "@/common/middleware/rateLimiter";
import requestLogger from "@/common/middleware/requestLogger";
import { tripsRouter } from '@/api/trips/tripsRoutes';

const logger = pino({ name: "server start" });
const app: Express = express();

app.set("trust proxy", true);

app.get("/", (req: Request, res: Response) => {
    res.send("Simple Trip Search Backend");
});

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(rateLimiter);
app.use(requestLogger);
app.use('/trips', tripsRouter);

app.use(errorHandler());

export { app, logger };
