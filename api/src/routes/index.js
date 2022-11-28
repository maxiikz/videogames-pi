const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();


const videogames= require('./VideosRoutes');
const videogame= require ('./VideoRoute')
const genres = require('./GenreRoute');


// Configurar los routers
router.use('/genre', genres)
router.use('/videogames', videogames)
router.use('/videogame', videogame)
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
