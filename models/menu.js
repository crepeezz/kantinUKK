'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.menudiskon, { foreignKey: 'menudiskonID', as: 'menus' });
    }
  }
  menu.init({
    menuID: {
      allowNull: false,
      autoIncrementa: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nama_makanan: DataTypes.STRING,
    harga: DataTypes.DOUBLE,
    jenis: DataTypes.STRING,
    foto: DataTypes.STRING,
    deskripsi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'menu',
  });
  return menu;
};