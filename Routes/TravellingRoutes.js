import  express  from "express";
import { createTravel, getTravel } from "../Controller/TravellingController.js";

import { upload } from "../Middleware/multer.js";


const router = express.Router();


router.route('/').post(upload.array('images'),createTravel).get(getTravel);





export default router