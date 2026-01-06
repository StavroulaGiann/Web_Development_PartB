
// Checks if a value looks like a MongoDB ObjectId
function isObjectIdLike(v) {
  return typeof v === "string" && /^[0-9a-fA-F]{24}$/.test(v);
}

// Tries to convert a value to a number if possible
function toNumberMaybe(v) {
  if (typeof v === "number") return v;
  if (typeof v === "string" && v.trim() !== "" && !Number.isNaN(Number(v))) return Number(v);
  return v;
}

// Normalizes a value based on validation rules (trim, lowercase, number coercion, etc.)
function normalizeValue(val, rule) {
  let v = val;

  if (rule.coerceNumber) v = toNumberMaybe(v);
  if (rule.trim && typeof v === "string") v = v.trim();
  if (rule.lowercase && typeof v === "string") v = v.toLowerCase();

  return v;
}

// Validates a single field against its rules
function validateField(name, val, rule, where, errors, outObj) {

  // Check if the field is present
  const present = val !== undefined && val !== null && val !== "";

  // If not required and not present, skip validation
  if (rule.required && !present) {
    errors.push({ field: name, in: where, message: "Field is required." });
    return;
  }

  // If not required and not present -> ok
  if (!present) return;

  // Normalize value before validation
  const v = normalizeValue(val, rule);

  // Type validation
  if (rule.type === "string" && typeof v !== "string") {
    errors.push({ field: name, in: where, message: "Must be a string." });
    return;
  }
  if (rule.type === "number" && typeof v !== "number") {
    errors.push({ field: name, in: where, message: "Must be a number." });
    return;
  }
  if (rule.type === "boolean" && typeof v !== "boolean") {
    errors.push({ field: name, in: where, message: "Must be a boolean." });
    return;
  }

  // String-specific validations
  if (typeof v === "string") {
    if (rule.minLen != null && v.length < rule.minLen) {
      errors.push({ field: name, in: where, message: `Must be at least ${rule.minLen} chars.` });
      return;
    }
    if (rule.maxLen != null && v.length > rule.maxLen) {
      errors.push({ field: name, in: where, message: `Must be at most ${rule.maxLen} chars.` });
      return;
    }
    if (rule.pattern && !rule.pattern.test(v)) {
      errors.push({ field: name, in: where, message: "Invalid format." });
      return;
    }
    if (rule.format === "email") {
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      if (!ok) {
        errors.push({ field: name, in: where, message: "Invalid email." });
        return;
      }
    }
    if (rule.format === "objectId" && !isObjectIdLike(v)) {
      errors.push({ field: name, in: where, message: "Invalid id." });
      return;
    }
  }

  // Number-specific validations
  if (typeof v === "number") {
    if (rule.min != null && v < rule.min) {
      errors.push({ field: name, in: where, message: `Must be >= ${rule.min}.` });
      return;
    }
    if (rule.max != null && v > rule.max) {
      errors.push({ field: name, in: where, message: `Must be <= ${rule.max}.` });
      return;
    }
  }

  // Enum validation (allowed values)
  if (rule.enum && !rule.enum.includes(v)) {
    errors.push({ field: name, in: where, message: `Must be one of: ${rule.enum.join(", ")}` });
    return;
  }

  // Custom validator function
  if (typeof rule.validate === "function") {
    const msg = rule.validate(v);
    if (typeof msg === "string" && msg) {
      errors.push({ field: name, in: where, message: msg });
      return;
    }
  }

  // Save the normalized value back to the request object
  outObj[name] = v;
}

// Middleware factory that validates request data using a schema
function validateRequest(schema = {}) {
  return (req, res, next) => {
    const errors = [];

    // Validate and normalize request body
    if (schema.body) {
      const out = { ...req.body };
      for (const [field, rule] of Object.entries(schema.body)) {
        validateField(field, req.body?.[field], rule, "body", errors, out);
      }
      req.body = out;
    }

    // Validate and normalize route params
    if (schema.params) {
      const out = { ...req.params };
      for (const [field, rule] of Object.entries(schema.params)) {
        validateField(field, req.params?.[field], rule, "params", errors, out);
      }
      req.params = out;
    }

     // Validate and normalize query string
    if (schema.query) {
      const out = { ...req.query };
      for (const [field, rule] of Object.entries(schema.query)) {
        validateField(field, req.query?.[field], rule, "query", errors, out);
      }
      req.query = out;
    }

     // If validation errors exist, return 400 Bad Request
    if (errors.length) {
      return res.status(400).json({
        message: "Validation error.",
        errors,
      });
    }

     // Continue to the next middleware/controller
    next();
  };
}

module.exports = validateRequest;
