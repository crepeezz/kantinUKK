'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detail_transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.transaksi, { foreignKey: 'transaksiID', as: 'transaksi' })
    }
  }
  detail_transaksi.init({
    detailtransaksiID: {
      allowNull: false,
      autoIncrementa: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    qty: DataTypes.STRING,
    harga_beli: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'detail_transaksi',
  });
  return detail_transaksi;
};