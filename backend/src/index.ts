import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import countryRoute from "./routes/countryRoute";
import {createCacheMiddleware} from "./middlewares/cacheMiddleware";
import cors from 'cors';

const app = express();
const port = process.env.PORT || 8000;
dotenv.config();

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Country Dashboard APIs!');
});

app.use('/countries', createCacheMiddleware(), countryRoute);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});