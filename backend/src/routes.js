const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');

/* "Roteador" do express, responsável pelas rotas
 * Têm os mesmos métodos que o app, instanciando o express sozinho 
 * (get, post, put e delete)
 */
const routes = express.Router();
const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store);

routes.get('/spots', SpotController.index);
// O método single diz que o upload é de uma única imagem. O parâmetro do método é o nome da chave que estamos utilizando para guardar a imagem, no caso, thumbnail
routes.post('/spots', upload.single('thumbnail'), SpotController.store);

routes.get('/dashboard', DashboardController.show);

routes.post('/spots/:spot_id/bookings', BookingController.store);

/* Exportamos as rotas daqui para o app reconhecer as mesmas */
module.exports = routes;