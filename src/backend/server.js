const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const fs = require('fs').promises; // Use promises for async file operations
const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to SQLite database
const db = new sqlite3.Database('./subscriptions.db', (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Create subscriptions table if it doesn’t exist
db.run(`CREATE TABLE IF NOT EXISTS subscriptions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  price TEXT NOT NULL,
  usageHours INTEGER DEFAULT 0,
  usageFrequency TEXT,
  category TEXT,
  importance TEXT NOT NULL
)`);

// Log file path
const logFilePath = './subscription_logs.txt';

// Helper function to log actions to a text file
async function logAction(action, data) {
  const timestamp = new Date().toISOString();
  let logMessage = '';
  
  switch (action) {
    case 'ADD':
      logMessage = `[${timestamp}] Added Subscription: ID=${data.id}, Name=${data.name}, Price=${data.price}, Usage=${data.usageHours} hours/${data.usageFrequency || 'N/A'}, Category=${data.category || 'N/A'}, Importance=${data.importance}\n`;
      break;
    case 'EDIT':
      logMessage = `[${timestamp}] Edited Subscription: ID=${data.id}, Name=${data.name}, Price=${data.price}, Usage=${data.usageHours} hours/${data.usageFrequency || 'N/A'}, Category=${data.category || 'N/A'}, Importance=${data.importance}\n`;
      break;
    case 'DELETE':
      logMessage = `[${timestamp}] Deleted Subscription: ID=${data.id}\n`;
      break;
    default:
      return;
  }

  try {
    await fs.appendFile(logFilePath, logMessage);
    console.log(`Logged ${action} action to ${logFilePath}`);
  } catch (err) {
    console.error(`Error writing to log file: ${err.message}`);
  }
}

// GET all subscriptions
app.get('/subscriptions', (req, res) => {
  db.all('SELECT * FROM subscriptions', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// POST a new subscription
app.post('/subscriptions', (req, res) => {
  const { name, price, usageHours, usageFrequency, category, importance } = req.body;
  db.run(
    'INSERT INTO subscriptions (name, price, usageHours, usageFrequency, category, importance) VALUES (?, ?, ?, ?, ?, ?)',
    [name, price, usageHours || 0, usageFrequency || '', category || '', importance || 'Optional'],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      const newSubscription = {
        id: this.lastID,
        name,
        price,
        usageHours: usageHours || 0,
        usageFrequency: usageFrequency || '',
        category: category || '',
        importance: importance || 'Optional',
      };
      logAction('ADD', newSubscription);
      res.json({ id: this.lastID });
    }
  );
});

// PUT to update a subscription
app.put('/subscriptions/:id', (req, res) => {
  const { id } = req.params;
  const { name, price, usageHours, usageFrequency, category, importance } = req.body;
  db.run(
    'UPDATE subscriptions SET name = ?, price = ?, usageHours = ?, usageFrequency = ?, category = ?, importance = ? WHERE id = ?',
    [name, price, usageHours || 0, usageFrequency || '', category || '', importance || 'Optional', id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      const updatedSubscription = {
        id: parseInt(id),
        name,
        price,
        usageHours: usageHours || 0,
        usageFrequency: usageFrequency || '',
        category: category || '',
        importance: importance || 'Optional',
      };
      logAction('EDIT', updatedSubscription);
      res.json({ id: parseInt(id) });
    }
  );
});

// DELETE a subscription
app.delete('/subscriptions/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM subscriptions WHERE id = ?', id, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    logAction('DELETE', { id: parseInt(id) });
    res.json({ message: 'Subscription deleted' });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});