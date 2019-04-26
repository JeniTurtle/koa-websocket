'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: {
      type:DataTypes.INTEGER,
      primaryKey:true,
      allowNull:false,
    },
    status: DataTypes.INTEGER,
    order_sn: DataTypes.STRING,
    uid: DataTypes.INTEGER,
    addtime: DataTypes.INTEGER,
  }, {
    freezeTableName: true,
    tableName: 'lr_order',
  });

  Order.associate = function(models) {
    Order.hasMany(models.OrderProduct, {
      foreignKey:'order_id', sourceKey:'id', as: 'OrderProducts'
    });
    Order.hasOne(models.Staff, {
      foreignKey:'uid', sourceKey:'uid', as: 'Staff'
    })
  };
  return Order;
};