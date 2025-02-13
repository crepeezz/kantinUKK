'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The models/index file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //   this.hasMany (models.siswa, {
      //     foreignKey: "siswaID", as:"siswas"
      //   })
      //   this.hasMany (models.transaksi, {
      //     foreignKey: "transaksiID", as: "transaksis"
      //   })
      // }
      // this.hasMany(models.user, { foreignKey: 'userID', as: 'users' })
    }
  }
  user.init({
    userID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
    {
      sequelize,
      modelName: 'user',
    });
  return user;
};