'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class diskon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.hasMany(models.menudiskon, {
      //   foreignKey: "menudiskonID", as: "menu_diskons"
      // })
    }
  }
  diskon.init({
    diskonID: {
      allowNull: false,
      autoIncrementa: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nama_diskon: DataTypes.STRING,
    presentase_diskon: DataTypes.DOUBLE,
    tanggal_awal: DataTypes.DATE,
    tanggal_akhir: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'diskon',
  });
  return diskon;
};