import superheroModel from "../schemas/superhero";
import type { Request, Response } from "express";
import { minioClient } from "../minio/minioClient";

const listAllSuperheroes = async (req: Request, res: Response) => {
  try {
    const superheroes = await superheroModel.find().exec();
    res.json(superheroes);
  } catch (error) {
    res.send(error);
  }
};

const findOneSuperhero = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const superHero = await superheroModel.findById(id).exec();
    console.log(superHero);
    res.send(superHero);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

const deleteSuperhero = async (req: Request, res: Response) => {
  console.log("SDadasd");
  try {
    const { id } = req.params;
    const deleted = await superheroModel.deleteOne({ _id: id }).exec();
    console.log(deleted);
    res.send(deleted);
  } catch (error) {
    console.error("Error deleting superhero:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const createSuperhero = async (req: Request, res: Response) => {
  try {
    const images = req.files as Array<Express.Multer.File>;
    if (images?.length === 0 || images === undefined) {
      res.status(400).send("No file uploaded.");
    } else {
      const imageUrlPropmises = images.map(async (image) => {
        const imageName = `superheroes/${image.originalname}`;
        const superHeroImageUrl = `http://localhost:9000/superheroes/${encodeURIComponent(
          imageName
        )}`;

        await minioClient.putObject("superheroes", imageName, image.buffer);
        return superHeroImageUrl;
      });
      const imageUrls = await Promise.all(imageUrlPropmises);
      const data = req.body;
      console.log("data", data);

      const superhero = await superheroModel.create({
        ...data,
        images: imageUrls,
      });
      res.status(201).json(superhero);
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

const updateSuperhero = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(req.body);
    console.log(id)
    const dataToUpdate = req.body;
    console.log("body",req.body)
    console.log("dataUpdate",dataToUpdate)
    const updatedSuperhero = await superheroModel
      .findByIdAndUpdate(id, dataToUpdate, {
        new: true,
        runValidators: true,
      })
      .exec();

    res.json(updatedSuperhero);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

export default {
  listAllSuperheroes,
  findOneSuperhero,
  deleteSuperhero,
  createSuperhero,
  updateSuperhero,
};
