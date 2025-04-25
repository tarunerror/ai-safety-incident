const express = require('express');
const router = express.Router();
const { Incident } = require('../models');
const { validateIncidentInput } = require('../utils/validators');

// GET all incidents
router.get('/', async (req, res, next) => {
  try {
    const incidents = await Incident.find().sort('-reported_at');
    res.json(incidents);
  } catch (err) {
    next(err);
  }
});

// GET incident by ID
router.get('/:id', async (req, res, next) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident) {
      return res.status(404).json({ error: 'Incident not found' });
    }
    res.json(incident);
  } catch (err) {
    next(err);
  }
});

// POST new incident
router.post('/', validateIncidentInput, async (req, res, next) => {
  try {
    const { title, description, severity } = req.body;
    const incident = await Incident.create({
      title,
      description,
      severity
    });
    res.status(201).json(incident);
  } catch (err) {
    next(err);
  }
});

// DELETE incident
router.delete('/:id', async (req, res, next) => {
  try {
    const incident = await Incident.findByIdAndDelete(req.params.id);
    if (!incident) {
      return res.status(404).json({ error: 'Incident not found' });
    }
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;