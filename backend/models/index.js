const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user.model')(sequelize, DataTypes);
db.Patient = require('./patient.model')(sequelize, DataTypes);
db.Vitals = require('./vitals.model')(sequelize, DataTypes);

// Associations
db.User.hasMany(db.Patient, { foreignKey: 'doctorId' });
db.Patient.belongsTo(db.User, { foreignKey: 'doctorId' });

db.Patient.hasMany(db.Vitals, { foreignKey: 'patientId' });
db.Vitals.belongsTo(db.Patient, { foreignKey: 'patientId' });

module.exports = db;
