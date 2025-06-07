const ErrorTypes = require('./errorTypes');

// ✅ Schema validation
function validateWith(schema, data) {
  return schema.parse(data);
}

// ✅ Query param parsing (used in GET filters)
 function parseFilters(query) {
  const filters = {};
  for (const [key, value] of Object.entries(query)) {
    if (key.endsWith("_ne")) filters[key.replace("_ne", "")] = { not: value };
    else if (key.endsWith("_gt")) filters[key.replace("_gt", "")] = { gt: parseValue(value) };
    else if (key.endsWith("_lt")) filters[key.replace("_lt", "")] = { lt: parseValue(value) };
    else if (key.endsWith("_gte")) filters[key.replace("_gte", "")] = { gte: parseValue(value) };
    else if (key.endsWith("_lte")) filters[key.replace("_lte", "")] = { lte: parseValue(value) };
    else if (key.endsWith("_contains")) filters[key.replace("_contains", "")] = { contains: value, mode: "insensitive" };
    else if (key.endsWith("_in")) filters[key.replace("_in", "")] = { in: value.split(",") };
    else filters[key] = value;
  }
  return filters;
 }


// ✅ Success: 200
function respondOk(res, data) {
  res.status(200).json(data);
}

// ✅ Created: 201
function respondCreated(res, data) {
  res.status(201).json(data);
}

// ✅ Not found: 404 (lightweight)
function respondNotFound(res, message = 'Not found') {
  res.status(404).json({
    error: ErrorTypes.NOT_FOUND,
    details: message,
    code: 404,
    path: res.req?.path || '',
    method: res.req?.method || '',
    timestamp: new Date().toISOString()
  });
}

// ✅ Main error handler
function respondError(res, err, status = 500) {
  const timestamp = new Date().toISOString();
  let errorType = ErrorTypes.UNKNOWN;
  let details = 'Something went wrong';

  if (err) {
    if (err.name === 'ZodError') {
      errorType = ErrorTypes.VALIDATION;
      status = 400;
      details = err.errors?.map(e => `${e.path.join('.')}: ${e.message}`).join('; ');
    } else if (err.name === 'ValidationError') {
      errorType = ErrorTypes.VALIDATION;
      status = 400;
      details = Object.values(err.errors).map(e => e.message).join('; ');
    } else if (err.name === 'JsonWebTokenError') {
      errorType = ErrorTypes.AUTHENTICATION;
      status = 401;
      details = err.message;
    } else if (err.code === 11000) {
      errorType = ErrorTypes.CONFLICT;
      status = 409;
      const field = Object.keys(err.keyPattern)[0];
      details = `Duplicate ${field}`;
    } else {
      details = err.message || details;
    }
  }

  const path = res.req?.path || '';
  const method = res.req?.method || '';

  res.status(status).json({
    error: errorType,
    details,
    code: status,
    path,
    method,
    timestamp
  });
}

// ✅ Admin logging (optional, keep for audit/debug)
function logAdminAction(route, method, payload) {
  console.log(`🛠 Admin [${method}] ${route}`, JSON.stringify(payload, null, 2));
}

// 🧱 Internal helper
function parseValue(val) {
  const num = parseFloat(val);
  return isNaN(num) ? val : num;
}

module.exports = {
  validateWith,
  parseFilters,
  respondOk,
  respondCreated,
  respondNotFound,
  respondError,
  logAdminAction
};
