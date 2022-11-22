'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('parkings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      plat_no: {
        type: Sequelize.STRING
      },
      date_in: {
        type: Sequelize.DATE
      },
      vehicle_type: {
        type: Sequelize.ENUM(["car", "motorcycle"])
      },
      date_out: {
        type: Sequelize.DATE
      },
      total_times: {
        type: Sequelize.INTEGER
      },
      total_price: {
        type: Sequelize.INTEGER
      }
    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('parkings');
  }
};
