import express from "express";
import { connectToDatabase } from "./database";
import superheroService from "./controllers/superheroController";
import { minioClient } from "./minio/minioClient";
import multer from "multer";
import cors from "cors";

async function start() {

  const app = express();
  app.use(cors())
  app.use(express.json());
  const port = 3010;

  await connectToDatabase();

  const exist = await minioClient.bucketExists("superheroes");
  if (exist) {
    console.log("Bucket exists");
  } else {
    await minioClient.makeBucket("superheroes");
  }


  const storage = multer.memoryStorage();
  const upload = multer({ storage });

  console.log(upload);


  app.get("/superheroes", superheroService.listAllSuperheroes);

  app.get("/superheroes/:id", superheroService.findOneSuperhero);

  app.delete("/superheroes/:id", superheroService.deleteSuperhero);

  app.post("/superheroes",upload.array("images"), superheroService.createSuperhero);

  app.patch("/superheroes/:id", superheroService.updateSuperhero);

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

start();
