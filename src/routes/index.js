import express from "express";
import userRoutes from "./userRoutes.js";
import bussinessRoutes from "./bussinessControllerRoutes.js";

const routes = express.Router();

routes.use('/user', userRoutes);
routes.use('/bussiness', bussinessRoutes);

export default routes