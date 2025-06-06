// src/utils/restUtils.js

function validateWith(schema, data) {
  return schema.parse(data);
}

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

function respondCreated(res, data) {
  res.status(201).json(data);
}

function respondOk(res, data) {
  res.status(200).json(data);
}

function respondNotFound(res, message = 'Not found') {
  res.status(404).json({ error: message });
}

function respondError(res, error, code = 400) {
  res.status(code).json({ error: error.message || 'Unexpected error', details: error });
}

function logAdminAction(route, method, payload) {
  console.log(`🛠 Admin [${method}] ${route}`, JSON.stringify(payload, null, 2));
}

function parseValue(val) {
  const num = parseFloat(val);
  return isNaN(num) ? val : num;
}

module.exports = {
  validateWith,
  parseFilters,
  respondCreated,
  respondOk,
  respondNotFound,
  respondError,
  logAdminAction
};
