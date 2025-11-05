const { Model, DataTypes } = require('sequelize');
const sequelize = require('../connections/Mysql');

class Domain extends Model {}

Domain.init({
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
        comment: '0 => Disabled | 1 => Enabled'
    }
}, {
    sequelize,
    modelName: 'Domain',
    tableName: 'domains',
    timestamps: true,
})

module.exports = Domain;