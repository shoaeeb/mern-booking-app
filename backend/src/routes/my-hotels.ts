import express, { Request, Response } from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import Hotel, { HotelType } from "../models/hotel";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, //5mb,
  },
});

//api/my-hotels
router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Type is required"),
    body("adultCount")
      .notEmpty()
      .isNumeric()
      .withMessage("Adult Count is required"),
    body("childCount")
      .notEmpty()
      .isNumeric()
      .withMessage("Child Count is required"),
    body("facilities").isArray().withMessage("Facilities is required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price Per Night is required"),
    body("starRating")
      .notEmpty()
      .isNumeric()
      .withMessage("Star Rating is required"),
  ],
  upload.array("imageFiles", 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const imageUrls = await uploadImages(imageFiles); //upload the images to cloudinary
      const newHotel: HotelType = req.body;
      newHotel.imageUrls = imageUrls; //add the image urls to the hotel object
      newHotel.lastUpdated = new Date(); //add the lastUpdated date to the hotel object
      newHotel.userId = req.userId; //add the userId to the hotel object
      const hotel = new Hotel(newHotel);
      hotel.save();
      res.status(201).json(hotel); //created 201
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

const uploadImages = async (imageFiles: Express.Multer.File[]) => {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    const dataURI = "data:" + image.mimetype + ";base64," + b64;
    const uploadResponse = await cloudinary.uploader.upload(dataURI);
    return uploadResponse.url;
  });

  const imageUrls = await Promise.all(uploadPromises);

  return imageUrls;
};

export default router;
