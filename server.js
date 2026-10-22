const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, "data.json");

app.use(express.json({ limit: "20kb" }));
app.use(express.static(path.join(__dirname, "public")));

function readIncidents() {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(data || "[]");
  } catch (error) {
    console.error("Could not read data.json:", error.message);
    return [];
  }
}

function saveIncidents(incidents) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(incidents, null, 2));
}

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "Emergency Response API" });
});

app.get("/api/incidents", (_req, res) => {
  res.json(readIncidents());
});

app.post("/api/incidents", (req, res) => {
  const { name, type, location, description } = req.body || {};
  const values = [name, type, location, description];

  if (values.some(value => typeof value !== "string" || !value.trim())) {
    return res.status(400).json({ message: "Please fill in all fields." });
  }

  if (values.some(value => value.trim().length > 1000)) {
    return res.status(400).json({ message: "Each field must be under 1000 characters." });
  }

  const incident = {
    id: Date.now().toString() + "-" + Math.random().toString(36).slice(2, 8),
    name: name.trim(),
    type: type.trim(),
    location: location.trim(),
    description: description.trim(),
    status: "Pending",
    createdAt: new Date().toISOString()
  };

  const incidents = readIncidents();
  incidents.unshift(incident);

  try {
    saveIncidents(incidents);
    res.status(201).json({
      message: "Emergency report submitted successfully.",
      incident
    });
  } catch (error) {
    console.error("Could not save incident:", error.message);
    res.status(500).json({ message: "Could not save the report." });
  }
});

app.patch("/api/incidents/:id", (req, res) => {
  const allowedStatuses = ["Pending", "In Progress", "Resolved"];
  const { status } = req.body || {};

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid incident status." });
  }

  const incidents = readIncidents();
  const incident = incidents.find(item => item.id === req.params.id);

  if (!incident) {
    return res.status(404).json({ message: "Incident not found." });
  }

  incident.status = status;

  try {
    saveIncidents(incidents);
    res.json({ message: "Incident status updated.", incident });
  } catch (error) {
    console.error("Could not update incident:", error.message);
    res.status(500).json({ message: "Could not update the report." });
  }
});

app.listen(PORT, () => {
  console.log(`Emergency Response System running at http://localhost:${PORT}`);
});