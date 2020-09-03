  
const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idProduct: {
      type: DataTypes.INTEGER,
      primaryKey:true,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.REAL,
    },
    img: {
      type: DataTypes.TEXT,
    },
    stock: {
      type: DataTypes.INTEGER,
    },
    category: {
      type: DataTypes.STRING,
    }
  });

};
