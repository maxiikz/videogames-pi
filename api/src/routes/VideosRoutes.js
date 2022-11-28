require('dotenv').config();
const { Router } = require('express');
const {APIKEY1} = process.env;
const axios = require ('axios');

const { Genres, Videogame } = require('../db')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', async (req, res)=>{
    let videoDb = await Videogame.findAll({
        include: Genres
    });
    videoDb= JSON.stringify(videoDb);
    videoDb= JSON.parse(videoDb);
    console.log(videoDb);

    videoDb= videoDb.reduce((acc, e) => acc.concat({
        ...e,
        genres: e.genres.map(g=>g.name)
    }), [])


    if(req.query.name){
        try{
            let Api= await axios.get(`https://api.rawg.io/api/games?search=${req.query.name}&key=${APIKEY1}`);
            if(!Api.data.count) 
            return res.status(204).json(`Game not found"${req.query.name}"`);
            console.log(Api);

            const gamesApi= Api.data.results.map(g=>{
                return{
                    id: g.id,
                    name: g.name,
                    
                    image: g.background_image,
                    rating: g.rating,
                    
                    genres: g.genres.map(g=>g.name)
                }
            });
            const filter= videoDb.filter(g=> g.name.toLowerCase().includes(req.query.name.toLowerCase()));
            const todo =[...filter, ...gamesApi];
            return res.json(todo)

        }catch (err){
            return console.log(err)

        }
    }else{
    try{
       let ApiVideo= await axios.get(`https://api.rawg.io/api/games?key=${APIKEY1}`);
        let pages = 0;
        let resstodo= [...videoDb]
        while (pages < 6){
            pages ++;
        const videos= ApiVideo.data.results.map(g=>{
            return {
                id: g.id,
                game: g.name,
                image: g.background_image,
                rating: g.rating,
                
              
                lanzamiento: g.released,
                genres: g.genres.map(g => g.name)

            }


        });
        todo=[...resstodo, ...videos]
        ApiVideo= await axios.get(ApiVideo.data.next)
    }
    return res.json(todo)

    }
    catch(err){
        console.log(err)
        return res.status(404)

    }
}
});


module.exports = router;


// - [ ] __GET /videogames__:
//   - Obtener un listado de los videojuegos
//   - Debe devolver solo los datos necesarios para la ruta principal
// - [ ] __GET /videogames?name="..."__:
//   - Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
//   - Si no existe ningún videojuego mostrar un mensaje adecuado
// - [ ] __GET /videogame/{idVideogame}__:
//   - Obtener el detalle de un videojuego en particular
//   - Debe traer solo los datos pedidos en la ruta de detalle de videojuego
//   - Incluir los géneros asociados
// - [ ] __POST /videogames__:
//   - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
//   - Crea un videojuego en la base de datos, relacionado a sus géneros.