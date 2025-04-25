// Validation middleware for incident input
const validateIncidentInput = (req, res, next) => {
  const { title, description, severity } = req.body;
  const errors = [];
  
  // Check required fields
  if (!title) errors.push('Title is required');
  if (!description) errors.push('Description is required');
  if (!severity) errors.push('Severity is required');
  
  // Validate severity enum
  if (severity && !['Low', 'Medium', 'High'].includes(severity)) {
    errors.push('Severity must be one of: Low, Medium, High');
  }
  
  // Return validation errors if any
  if (errors.length > 0) {
    return res.status(400).json({
      error: 'Validation Error',
      details: errors
    });
  }
  
  next();
};

module.exports = {
  validateIncidentInput
};