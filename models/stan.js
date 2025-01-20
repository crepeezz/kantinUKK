'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class stan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, { foreignKey: 'userID', as: 'users' });
    }
  }
  stan.init({
    stanID: {
      allowNull: false,
      autoIncrementa: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nama_stan: DataTypes.STRING,
    nama_pemilik: DataTypes.STRING,
    telp: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'stan',
  });
  return stan;
};