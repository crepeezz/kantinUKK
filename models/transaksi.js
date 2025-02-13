'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaksi extends Model {
    static associate(models) {
      this.hasMany(models.siswa, {
        foreignKey: 'siswaID', // Relasi dengan siswa
        as: 'siswa'
      });
      this.belongsTo(models.stan, {
        foreignKey: 'stanID', // Relasi dengan stan
        as: 'stan'
      });
      // this.hasMany(models.detailtransaksi, {
      //   foreignKey: 'detailtransaksiID', // Relasi dengan detailtransaksi
      //   as: 'detail_transaksis'
      // });
    }
  }
  transaksi.init({
    transaksiID: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'transaksi',
  });
  return transaksi;
};