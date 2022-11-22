'use strict';
module.exports = (db, DataTypes) => {
    return db.define("parkings", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        vehicle_type: {
            type: DataTypes.ENUM(["car", "motorcycle"])
        },
        plat_no: {
            type: DataTypes.STRING
        },
        date_in: {
            type: DataTypes.DATE
        },
        date_out: {
            type: DataTypes.DATE
        },
        total_times: {
            type: DataTypes.INTEGER
        },
        total_price: {
            type: DataTypes.INTEGER
        }
    }, {
        freezeTableName: true,
        timestamps: false,
    });
}