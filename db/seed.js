const connectDB = require('../config/database');
const { Incident } = require('../models');

const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    await Incident.deleteMany({});
    console.log('Existing data cleared');
    
    // sample incidents
    const sampleIncidents = [
      {
        title: 'AI Hallucination in Medical Diagnosis',
        description: 'An AI system designed for diagnosing skin conditions misidentified a benign mole as potentially cancerous, causing unnecessary patient anxiety and additional testing.',
        severity: 'Medium',
        reported_at: new Date(2023, 8, 15) // September 15, 2023
      },
      {
        title: 'Autonomous Vehicle Navigation Failure',
        description: 'Self-driving vehicle mistook a highway exit for a continuation of the main road, requiring emergency driver intervention to prevent accident.',
        severity: 'High',
        reported_at: new Date(2023, 9, 2) // October 2, 2023
      },
      {
        title: 'Language Model Inappropriate Response',
        description: 'Customer service AI generated insensitive responses to a user inquiry about mental health resources, providing potentially harmful advice.',
        severity: 'Low',
        reported_at: new Date(2023, 9, 10) // October 10, 2023
      }
    ];
    
    await Incident.insertMany(sampleIncidents);
    console.log('Sample incidents created successfully');
    
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDatabase();