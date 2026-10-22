# Cloud-Based Emergency Response Management System

A beginner-friendly student project using HTML, CSS, JavaScript, Node.js, and Express.

## Features
- Responsive emergency management dashboard
- Incident submission form
- Incident register with search and status filters
- Status updates: Pending, In Progress, Resolved
- Dashboard statistics
- Local JSON file persistence
- Emergency contact information

## Requirements
- Node.js (LTS recommended)
- Visual Studio Code

## Run in VS Code
1. Extract this ZIP file.
2. Open the extracted `Cloud_Emergency_Response_System` folder in VS Code.
3. Open **Terminal → New Terminal**.
4. Run `npm install`.
5. Run `npm start`.
6. Open `http://localhost:3000` in your browser.

Keep the terminal running while you use the app. Press `Ctrl+C` in the terminal to stop the server.

## Project structure
```text
Cloud_Emergency_Response_System/
├── server.js
├── package.json
├── data.json
├── README.md
└── public/
    ├── index.html
    ├── style.css
    └── script.js
```

## API routes
- `GET /api/health` — check that the API is running
- `GET /api/incidents` — list incidents
- `POST /api/incidents` — create an incident
- `PATCH /api/incidents/:id` — update incident status

## Important
This is a local academic prototype. Reports are saved to `data.json` on the machine running the server. It is not deployed to cloud hosting and does not dispatch emergency responders. Do not enter sensitive information or use it for real emergencies. For real emergencies in India, call the appropriate emergency service (112 for the integrated emergency response number).
