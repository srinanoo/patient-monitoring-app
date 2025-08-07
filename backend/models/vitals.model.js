module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Vitals', {
    pulse: DataTypes.INTEGER,
    systolic: DataTypes.INTEGER,
    diastolic: DataTypes.INTEGER,
    o2sat: DataTypes.INTEGER,
    timestamp: DataTypes.INTEGER,
  });
};
