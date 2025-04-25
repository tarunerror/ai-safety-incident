# AI Safety Incident Log API

A RESTful API service for logging and tracking AI safety incidents. This service allows organizations to document, categorize, and manage reports of AI system failures, unintended behaviors, or safety concerns.

## Tech Stack

- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Language**: JavaScript

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (v4.4 or higher)

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a .env file
   ```
   cp .env.example .env
   ```
4. Ensure MongoDB is running locally on port 27017
5. Seed the database with sample data:
   ```
   npm run seed
   ```
6. Start the server:
   ```
   npm start
   ```
   
   For development with auto-restart:
   ```
   npm run dev
   ```

## API Endpoints

### Get All Incidents

```
GET /incidents
```

Response: Array of all incident objects

Example:
```bash
curl -X GET http://localhost:3000/incidents
```

Sample response:
```json
[
  {
    "_id": "6543210987654321fedcba98",
    "title": "AI Hallucination in Medical Diagnosis",
    "description": "An AI system designed for diagnosing skin conditions misidentified a benign mole as potentially cancerous, causing unnecessary patient anxiety and additional testing.",
    "severity": "Medium",
    "reported_at": "2023-09-15T00:00:00.000Z",
    "createdAt": "2023-11-01T12:00:00.000Z",
    "updatedAt": "2023-11-01T12:00:00.000Z"
  },
  ...
]
```

### Get Incident by ID

```
GET /incidents/:id
```

Parameters:
- `id`: The MongoDB ObjectId of the incident to retrieve

Response: Single incident object or 404 error

Example:
```bash
curl -X GET http://localhost:3000/incidents/6543210987654321fedcba98
```

Sample response:
```json
{
  "_id": "6543210987654321fedcba98",
  "title": "AI Hallucination in Medical Diagnosis",
  "description": "An AI system designed for diagnosing skin conditions misidentified a benign mole as potentially cancerous, causing unnecessary patient anxiety and additional testing.",
  "severity": "Medium",
  "reported_at": "2023-09-15T00:00:00.000Z",
  "createdAt": "2023-11-01T12:00:00.000Z",
  "updatedAt": "2023-11-01T12:00:00.000Z"
}
```

### Create New Incident

```
POST /incidents
```

Request Body:
```json
{
  "title": "AI System Failure",
  "description": "Detailed description of the incident",
  "severity": "Medium"
}
```

Required fields:
- `title`: String - Brief summary of the incident
- `description`: String - Detailed explanation
- `severity`: String - Must be one of: "Low", "Medium", "High"

Response: Created incident object with status 201

Example:
```bash
curl -X POST http://localhost:3000/incidents \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Facial Recognition False Positive",
    "description": "System incorrectly identified an individual in a security system",
    "severity": "Medium"
  }'
```

### Delete Incident

```
DELETE /incidents/:id
```

Parameters:
- `id`: The MongoDB ObjectId of the incident to delete

Response: Status 204 (No Content) on success, or 404 if not found

Example:
```bash
curl -X DELETE http://localhost:3000/incidents/6543210987654321fedcba98
```

## Data Model

Each incident contains:

- `_id`: MongoDB ObjectId (auto-generated primary key)
- `title`: String (required)
- `description`: String (required)
- `severity`: String (One of: "Low", "Medium", "High")
- `reported_at`: Date (auto-generated timestamp when the incident is created)
- `createdAt`: Date (Mongoose auto timestamp)
- `updatedAt`: Date (Mongoose auto timestamp)
