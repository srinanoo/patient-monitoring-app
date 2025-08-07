module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Patient', {
    email: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    age: { type: DataTypes.INTEGER },
    deviceId: { type: DataTypes.STRING, unique: true },
  });
};
