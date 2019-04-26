'use strict';
module.exports = (sequelize, DataTypes) => {
    const OrderProduct = sequelize.define('OrderProduct', {
        id: {
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
        },
        order_id: DataTypes.INTEGER,
        name: DataTypes.STRING,
    }, {
        freezeTableName: true,
        tableName: 'lr_order_product',
    });
    OrderProduct.associate = function(models) {
        OrderProduct.belongsTo(models.Order, {
            foreignKey:'order_id', targetKey:'id'
        })
    };
    return OrderProduct;
};