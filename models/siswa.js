'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class siswa extends Model {
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
  siswa.init({
    siswaID: {
      allowNull: false,
      autoIncrementa: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nama_siswa: DataTypes.STRING,
    alamat: DataTypes.STRING,
    telp: DataTypes.STRING,
    foto: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'siswa',
  });
  return siswa;
};