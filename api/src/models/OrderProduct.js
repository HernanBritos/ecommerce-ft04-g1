const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('OrderProduct', {
    idProduct: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    ammount: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('entregado', 'pendiente'),
      allowNull: false,
    },

  });
};