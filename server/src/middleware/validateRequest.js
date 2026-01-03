// server/src/middleware/validateRequest.js
// Lightweight request validator (no extra deps).
// Usage: router.post("/login", validateRequest({ body: { email: {...}, password: {...} } }), controller)

function isObjectIdLike(v) {
  return typeof v === "string" && /^[0-9a-fA-F]{24}$/.test(v);
}

function toNumberMaybe(v) {
  if (typeof v === "number") return v;
  if (typeof v === "string" && v.trim() !== "" && !Number.isNaN(Number(v))) return Number(v);
  return v;
}

function normalizeValue(val, rule) {
  let v = val;

  if (rule.coerceNumber) v = toNumberMaybe(v);
  if (rule.trim && typeof v === "string") v = v.trim();
  if (rule.lowercase && typeof v === "string") v = v.toLowerCase();

  return v;
}

function validateField(name, val, rule, where, errors, outObj) {
  const present = val !== undefined && val !== null && val !== "";

  if (rule.required && !present) {
    errors.push({ field: name, in: where, message: "Field is required." });
    return;
  }

  // If not required and not present -> ok
  if (!present) return;

  const v = normalizeValue(val, rule);

  // type checks
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

  // string constraints
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

  // number constraints
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

  // enum
  if (rule.enum && !rule.enum.includes(v)) {
    errors.push({ field: name, in: where, message: `Must be one of: ${rule.enum.join(", ")}` });
    return;
  }

  // custom validator
  if (typeof rule.validate === "function") {
    const msg = rule.validate(v);
    if (typeof msg === "string" && msg) {
      errors.push({ field: name, in: where, message: msg });
      return;
    }
  }

  // write normalized value back (optional)
  outObj[name] = v;
}

/**
 * schema example:
 * {
 *   body: { email: {required:true, type:"string", format:"email", trim:true, lowercase:true} },
 *   params: { id: {required:true, type:"string"} },
 *   query: { page: {type:"number", coerceNumber:true, min:1} }
 * }
 */
function validateRequest(schema = {}) {
  return (req, res, next) => {
    const errors = [];

    // we will optionally overwrite with normalized versions
    if (schema.body) {
      const out = { ...req.body };
      for (const [field, rule] of Object.entries(schema.body)) {
        validateField(field, req.body?.[field], rule, "body", errors, out);
      }
      req.body = out;
    }

    if (schema.params) {
      const out = { ...req.params };
      for (const [field, rule] of Object.entries(schema.params)) {
        validateField(field, req.params?.[field], rule, "params", errors, out);
      }
      req.params = out;
    }

    if (schema.query) {
      const out = { ...req.query };
      for (const [field, rule] of Object.entries(schema.query)) {
        validateField(field, req.query?.[field], rule, "query", errors, out);
      }
      req.query = out;
    }

    if (errors.length) {
      return res.status(400).json({
        message: "Validation error.",
        errors,
      });
    }

    next();
  };
}

module.exports = validateRequest;
