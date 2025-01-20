'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('diskons', {
      diskonID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama_diskon: {
        type: Sequelize.STRING
      },
      presentase_diskon: {
        type: Sequelize.DOUBLE
      },
      tanggal_awal: {
        type: Sequelize.DATE
      },
      tanggal_akhir: {
        type: Sequelize.DATE
      },
      stanID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "stans", // Nama tabel yang benar
          key: "stanID"   // Kolom yang dirujuk di tabel stans
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('diskons');
  }
};