import express from 'express';
import { login, verifyAuthentication } from './controllers/admin.js';
import { verifyCredentials, isLoggedIn } from './middlewares/userLogin.js';
import { getSellers, getSellerById, createSeller, editSeller, deleteSeller } from './controllers/seller.js';
import { createCar, deleteCar, editCar, getCarById, getCars } from './controllers/cars.js';
import { createSale, getSaleById, getSales, editSale, deleteSale } from './controllers/sales.js';

const routes = express();

routes.post('/login', verifyCredentials, login);
routes.get('/authentication', verifyAuthentication);

routes.use(isLoggedIn);

routes.get('/seller', getSellers);
routes.get('/seller/:id', getSellerById);
routes.post('/seller', createSeller);
routes.put('/seller/:id', editSeller);
routes.delete('/seller/:id', deleteSeller);

routes.get('/car', getCars);
routes.get('/car/:id', getCarById);
routes.post('/car', createCar);
routes.put('/car/:id', editCar);
routes.delete('/car/:id', deleteCar);

routes.get('/sale', getSales);
routes.get('/sale/:id', getSaleById);
routes.post('/sale', createSale);
routes.put('/sale/:id', editSale);
routes.delete('/sale/:id', deleteSale);

export default routes;
