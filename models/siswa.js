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
      type: DataTypes.STRING,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    nama_siswa: {
      type: DataTypes.STRING,
      allowNull: false
    },
    alamat: DataTypes.STRING,
    telp: DataTypes.STRING,
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "userID"
      }
    },
    foto: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'siswa',
  });
  return siswa;
};