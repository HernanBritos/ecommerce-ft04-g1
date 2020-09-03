const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('review', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull:false,
    },
    starts: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull:false,
    },
    idProduct: {
      type: DataTypes.INTEGER,
      allowNull:false,
    }
  });

};
