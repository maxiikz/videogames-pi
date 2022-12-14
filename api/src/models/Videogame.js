const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id:{
      type: DataTypes.UUID,
      defaltValue: DataTypes.UUIDV4,
      primaryKey: true

    },
    image:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    rating:{
      type: DataTypes.INTEGER
    },
    lanzamiento:{
      type: DataTypes.DATE
    },
    platforms:{
      type: DataTypes.STRING,
      allowNull: false
    },
    description:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    
  });
};
