import express from 'express';
import { CreateUser, deletUser, getUser, updateUser } from '../controller/user.controller.js';
const routes = express.Router();

routes.post('/add', CreateUser);
routes.get('/getUser', getUser);
routes.put("/isUpdate/:id", updateUser);
routes.delete("/isdelete/:id", deletUser);
export default routes;