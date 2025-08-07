const db = require('../models');
const { parseVitalsString } = require('../utils/parser');
const Vitals = db.Vitals;
const Patient = db.Patient;
const sendResponse = require('../utils/responseHelper');

exports.ingest = async (req, res) => {
  try {
    const { data } = req.body;
    const parsed = parseVitalsString(data);
    const patient = await Patient.findOne({ where: { deviceId: parsed.deviceId } });
    if (!patient) 
        return sendResponse(res, {
            statusCode: 404,
            success: false,
            error: 'Patient not found'
        });

    const vitals = await Vitals.create({
      ...parsed,
      patientId: patient.id,
    });

    return sendResponse(res, {
        statusCode: 200,
        success: true,
        data: vitals
    });
  } catch (err) {
    console.error(err);
    return sendResponse(res, {
        statusCode: 500,
        success: false,
        error: err?.message
    });
  }
};
