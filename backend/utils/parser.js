function parseVitalsString(input) {
  if (!input.startsWith('####') || !input.endsWith('####')) {
    throw new Error('Invalid format');
  }
  const inner = input.slice(4, -4);
  const parts = inner.split('::');
  if (parts.length !== 6) throw new Error('Wrong number of parts');

  const [deviceId, tsRaw, pulseRaw, sysRaw, diaRaw, o2Raw] = parts;
  const timestamp = parseInt(tsRaw, 10);
  const pulse = parseInt(pulseRaw, 10);
  const systolic = parseInt(sysRaw, 10);
  const diastolic = parseInt(diaRaw, 10);
  const o2sat = parseInt(o2Raw, 10);

  for (const [key, val] of Object.entries({ pulse, systolic, diastolic, o2sat })) {
    if (val < 0 || isNaN(val)) throw new Error(`Invalid ${key}`);
  }

  const now = Math.floor(Date.now() / 1000);
  if (timestamp > now) throw new Error('Timestamp in future');

  return { deviceId, timestamp, pulse, systolic, diastolic, o2sat };
}

module.exports = { parseVitalsString };
