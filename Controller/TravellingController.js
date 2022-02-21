import Travel from "../Model/TravellingModel.js";
import asyncHandler from "express-async-handler";
import { travelInput } from "../validations/TravelValidation.js";

const createTravel = asyncHandler(async (req, res) => {
  const { isValid, errors } = await travelInput(req.body);
  if (!isValid) {
    res.status(403).json({ success: false, code: 403, message: errors });
  }
  const { location, costOfTravel, heritages } = req.body;
  const imagesArr = [];

      const url = req.protocol + "://" + req.get("host");

      for (var i = 0; i < req.files.length; i++) {
        imagesArr.push(url + "/uploads/" + `${req.files[i].filename}`);
      }

  const travel = new Travel({
    location,
    images: imagesArr,
    costOfTravel,
    heritages,
  });

  const newTravel = await travel.save();

  if (newTravel) {
    return res.status(201).json({ success: true, code: 200, newTravel });
  } else {
    throw new Error("Travel could not be completed");
  }
});

const getTravel = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = await Number(req.query.pageNumber);
  const count = await Travel.countDocuments();
  const display = await Travel.find()
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  if (display) {
    res
      .status(201)
      .json({
        success: true,
        code: 200,
        display,
        page,
        pages: Math.ceil(count / pageSize),
      });
  } else{
      throw new Error("No Travel Information  Found")
  }

});

export { createTravel, getTravel };
