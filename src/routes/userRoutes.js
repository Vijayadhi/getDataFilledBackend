import express from 'express';

import userController from '../controller/userController.js';
import loginService from '../services/loginService.js';

const routes = express.Router();

routes.post('/createUser', userController.newUserRegistration);


routes.get('/getUserByEmail/:email', userController.getUserByEmail);
routes.get('/getAllusers', userController.getAllUsers);

routes.post('/updateUserByEmail/:email', userController.updateUserByEmail);

routes.post('/login', loginService.userLogin)

export default routes