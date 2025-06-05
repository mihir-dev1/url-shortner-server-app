import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectionDb from "./config/dbConfig";
import shortUrl from "./router/shortUrl"
dotenv.config();
connectionDb();

const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true
    })
)

app.use('/api', shortUrl);

app.listen(port, (): void => {
    console.log(`Server running on ${port}`);
})
