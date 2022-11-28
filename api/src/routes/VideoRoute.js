require('dotenv').config();
const { Router } = require('express');
const {APIKEY1} = process.env;

const axios = require ('axios');
const { Genres, Videogame} = require('../db')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');



const router = Router();

router.get('/:idVi', async (req, res)=>{
    const { idVi } = req.params;
    if(idVi.length > 7){
        let idBd= await Videogame.findOne({
            where:{
                id: idVi
            },
            include : Genres
        })
        idBd= JSON.stringify(idBd);
        idBd= JSON.parse(idBd);
        idBd.genres= idBd.genres.map(g=>g.name);

        res.json(idBd);
        console.log(idBd,"hola si se pudo");
        console.log(idVi, "no se pudo o si");
    }else {
        try{
            const gameApi= await axios.get(`https://api.rawg.io/api/games/${idVi}?key=${APIKEY1}`);
            let{id, name, rating, platforms, background_image, genres, released, description}= gameApi.data;
            genres= genres.map(g=>g.name);
            platforms= platforms.map(g=>g.platform.name)
            return res.json({
                id, name, rating, platforms, background_image, genres, released, description

            })

        }catch(err){
            return console.log(err,"no se pudo crear")

        }
    }
})

router.post('/', async (req,res)=>{
    let{ name, rating, platforms, genres, description, released } = req.body;
    try{
        const postGame= await Videogame.findOrCreate({
            where:{
                name,
                rating,
                platforms,
                description,
                released

            }
        })
        await postGame[0].setGenres(genres);

    }
    catch(error){
        console.log(error)
    }
    res.send('Juego creado satisfactoriamente!')
})



// - [ ] __GET /videogame/{idVideogame}__:
//   - Obtener el detalle de un videojuego en particular
//   - Debe traer solo los datos pedidos en la ruta de detalle de videojuego
//   - Incluir los géneros asociados
// - [ ] __POST /videogames__:
//   - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
//   - Crea un videojuego en la base de datos, relacionado a sus géneros.

module.exports = router;