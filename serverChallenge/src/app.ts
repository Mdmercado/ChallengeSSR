import "reflect-metadata";
import "dotenv/config";
import express from "express";
import cors from "cors";
import { appDataSource } from "./db";
import router from "./routes";

const PORT = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/v1", router);

async function main() {
  try {
    await appDataSource.initialize();
    app.listen(PORT, () => {
      console.log(`Servidor iniciado en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error("Error al inicializar la base de datos:", error);
  }
}

main();
