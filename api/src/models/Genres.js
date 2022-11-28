const { DataTypes} = require('sequelize');
module.exports = (sequelize)=>{
    sequelize.define('genres', {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },{timestamps: true,
        createdAt: 'create',
        updatedAt: false
    });
    };