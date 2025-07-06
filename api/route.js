import express from 'express';
import { doFoo } from './controller.js';

export default function registerRoutes(app) {
    const router = express.Router();

    router.get("/foo", doFoo);
    app.use("/api", router);
}
