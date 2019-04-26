'use strict';
module.exports = (sequelize, DataTypes) => {
    const Staff = sequelize.define('Staff', {
        id: {
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
        },
        name: DataTypes.STRING,
        sex: DataTypes.INTEGER,
        uid: DataTypes.INTEGER,
        identefy_id: DataTypes.STRING,
        addtime: DataTypes.INTEGER,
    }, {
        freezeTableName: true,
        tableName: 'lr_staff',
    });

    Staff.associate = function(models) {
        Staff.belongsTo(models.Order, {
            foreignKey: 'uid', targetKey: 'uid'
        });
    };
    return Staff;
};