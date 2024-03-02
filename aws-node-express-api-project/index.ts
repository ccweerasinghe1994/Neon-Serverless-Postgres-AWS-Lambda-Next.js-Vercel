import express, {Express, NextFunction, Request, Response} from "express";
import serverless from "serverless-http";

const stage = process.env.STAGE;
const app: Express = express();
app.get("/", (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: "Hello from root11!",
    });
});

app.get("/path", (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: "Hello from path!",
    });
});

app.use((req: Request, res: Response, next: NextFunction) => {
    return res.status(404).json({
        error: "Not Found",
    });
});

module.exports.handler = serverless(app);
