require('dotenv').config();
const { Router } = require('express');
const {APIKEY1} = process.env;

const axios = require ('axios');
const { Genres} = require('../db')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
router.get('/', async(req, res)=>{
    try{
        const genreDB= await Genres.findAll();
        if(genreDB.length) return res.json(genreDB);

        const ApiGenre= await axios.get(`https://api.rawg.io/api/genres?key=${APIKEY1}`);
        const genres = ApiGenre.data.results;
        genres.forEach(async g => {
            await Genres.findOrCreate({
                where:{
                    name: g.name
                }
            })
        
            });
             const genresEnd = genres.map(g=>{
                return{
                    id: g.id,
                    name: g.id
                }
            
        });
       res.json(genresEnd)
    }
    catch(err){
        return console.log(err)

    }
})
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;