const express = require("express");
const routes = express.Router();
const NursingHomeController = require("./controllers/nursinghome");
const multer = require("multer");
const uploadConfig = require('./config/upload')
const upload = multer(uploadConfig);

routes.get("/nursing_homes",  NursingHomeController.index);
routes.get("/nursing_homes/:id",  NursingHomeController.show);
routes.post("/nursing_homes",  upload.array('images'), NursingHomeController.create);

module.exports = routes;