import express from "express";
import bussinessController from "../controller/bussinessController.js";

const routes = express.Router();

routes.post('/createBussiness', bussinessController.createBusssinessDetailModel)

export default routes;