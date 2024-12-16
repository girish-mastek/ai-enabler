const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const USECASES_FILE = path.join(__dirname, 'src/data/usecases.json');

// Read usecases from file
const readUsecases = () => {
  try {
    const data = fs.readFileSync(USECASES_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading usecases:', error);
    return [];
  }
};

// Write usecases to file
const writeUsecases = (usecases) => {
  try {
    fs.writeFileSync(USECASES_FILE, JSON.stringify(usecases, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing usecases:', error);
    return false;
  }
};

// Get all usecases
app.get('/api/usecases', (req, res) => {
  const usecases = readUsecases();
  res.json(usecases);
});

// Add new usecase
app.post('/api/usecases', (req, res) => {
  const usecases = readUsecases();
  const newUsecase = {
    ...req.body,
    id: Date.now(),
    status: 'pending',
    submittedAt: new Date().toISOString()
  };
  usecases.unshift(newUsecase);
  
  if (writeUsecases(usecases)) {
    res.status(201).json(newUsecase);
  } else {
    res.status(500).json({ error: 'Failed to add usecase' });
  }
});

// Update usecase status
app.put('/api/usecases/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const usecases = readUsecases();
  
  const index = usecases.findIndex(uc => uc.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: 'Usecase not found' });
  }

  usecases[index] = {
    ...usecases[index],
    status,
    moderatedAt: new Date().toISOString()
  };

  if (writeUsecases(usecases)) {
    res.json(usecases[index]);
  } else {
    res.status(500).json({ error: 'Failed to update usecase' });
  }
});

// Delete usecase
app.delete('/api/usecases/:id', (req, res) => {
  const { id } = req.params;
  const usecases = readUsecases();
  
  const filteredUsecases = usecases.filter(uc => uc.id !== parseInt(id));
  
  if (writeUsecases(filteredUsecases)) {
    res.status(204).send();
  } else {
    res.status(500).json({ error: 'Failed to delete usecase' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
