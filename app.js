const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/database');

// Import routes
const incidentRoutes = require('./routes/incidents');

// Import middleware
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/incidents', incidentRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'AI Safety Incident Log API',
    endpoints: {
      incidents: {
        get_all: 'GET /incidents',
        get_by_id: 'GET /incidents/:id',
        create: 'POST /incidents',
        delete: 'DELETE /incidents/:id'
      }
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use(errorHandler);

module.exports = app;