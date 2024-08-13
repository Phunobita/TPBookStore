import express from "express";
import dotenv from "dotenv";
import swaggerUiExpress from "swagger-ui-express";
import YAML from "yamljs";
import cors from "cors";
import connectDatabase from "./config/mongodb.js";
import { notFoundMiddleware, errorhandlingMiddleware } from "./middleware/Errors.js";
import routes from "./routes/index.js";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config();
connectDatabase();
const app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(cors());
// api v1.0
//handle route for api
routes(app);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const swaggerPath = path.join(__dirname, "config", "swagger.yaml");
const swaggerDocument = YAML.load(swaggerPath);

app.use(
    "/thisistpbookstoreswagger",
    swaggerUiExpress.serve,
    swaggerUiExpress.setup(swaggerDocument, {
        swaggerOptions: {
            docExpansion: "none"
        }
    })
);
app.use("/thisistpbookstoreswagger", express.static(path.join(__dirname, "node_modules/swagger-ui-dist")));
app.use("/thisistpbookstoreswagger", express.static(path.join(__dirname, "node_modules/swagger-ui-dist/css")));
app.use("/thisistpbookstoreswagger", express.static(path.join(__dirname, "node_modules/swagger-ui-dist/js")));
app.get("/", (req, res) => {
    res.send(
        `Welcome to TPBookstore API, <a href='${
            process.env.WEB_CLIENT_URL || 3000
        }'>Click here to visit the shopping page</a><br>Made by Nguyễn Khắc Tuấn & Nguyễn Viết Phú 01/10/2022`
    );
});

// error handle
app.use(notFoundMiddleware);
app.use(errorhandlingMiddleware);

const PORT = process.env.PORT || 1025;
app.listen(PORT, console.log(`Server run in port ${PORT}`));
