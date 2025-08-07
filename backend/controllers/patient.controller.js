const db = require('../models');
const Patient = db.Patient;
const sendResponse = require('../utils/responseHelper');

exports.createPatient = async (req, res) => {  
  try {
    const { email, name, age, deviceId } = req.body;
    const isPatientExist = await Patient.findOne({ where: { email } });
    if (isPatientExist) 
        return sendResponse(res, {
            statusCode: 404,
            success: false,
            error: 'Patient already exists'
        });
    
    const patient = await Patient.create({ email, name, age, deviceId, doctorId: req.user.id });
    return sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Patient created'
    });
  } catch (err) {
    return sendResponse(res, {
        statusCode: 500,
        success: false,
        error: err?.errors[0]?.message
    });
  }
};

exports.updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
  
    const isPatientExist = await Patient.findOne({ where: { id: id } });
    if (!isPatientExist) 
        return sendResponse(res, {
            statusCode: 404,
            success: false,
            error: 'Patient not found'
        });
      
    const updated = await Patient.update(req.body, { where: { id } });
    return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Patient updated'
    });
  } catch (err) {
    return sendResponse(res, {
        statusCode: 500,
        success: false,
        error: err?.errors[0]?.message
    });
  }
};

exports.deletePatient = async (req, res) => {
  try {
    const { id } = req.params;

    const isPatientExist = await Patient.findOne({ where: { id: id } });
    if (!isPatientExist) 
        return sendResponse(res, {
            statusCode: 404,
            success: false,
            error: 'Patient not found'
        });

    await Patient.destroy({ where: { id } });
    return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Patient deleted'
    });
  } catch (err) {
    return sendResponse(res, {
        statusCode: 500,
        success: false,
        error: err?.errors[0]?.message
    });
  }
};

exports.getPatients = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;

    const result = await Patient.findAndCountAll({ limit, offset });
    return sendResponse(res, {
        statusCode: 200,
        success: true,
        data: { total: result.count, data: result.rows, page, limit }
    });
  } catch (err) {
    return sendResponse(res, {
        statusCode: 500,
        success: false,
        error: err?.errors[0]?.message
    });
  }
};
