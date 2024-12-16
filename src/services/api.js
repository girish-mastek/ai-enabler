import fs from 'fs';
import path from 'path';

const USECASES_FILE = path.join(process.cwd(), 'src/data/usecases.json');

// Read all use cases
export const getAllUseCases = () => {
  try {
    const data = fs.readFileSync(USECASES_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading usecases.json:', error);
    return [];
  }
};

// Add a new use case
export const addUseCase = (useCase) => {
  try {
    const useCases = getAllUseCases();
    const newUseCase = {
      ...useCase,
      id: Date.now(),
      status: 'pending',
      submittedAt: new Date().toISOString()
    };
    useCases.push(newUseCase);
    fs.writeFileSync(USECASES_FILE, JSON.stringify(useCases, null, 2));
    return newUseCase;
  } catch (error) {
    console.error('Error adding use case:', error);
    throw error;
  }
};

// Update use case status (for moderation)
export const updateUseCaseStatus = (id, status) => {
  try {
    const useCases = getAllUseCases();
    const index = useCases.findIndex(uc => uc.id === id);
    if (index !== -1) {
      useCases[index] = {
        ...useCases[index],
        status,
        moderatedAt: new Date().toISOString()
      };
      fs.writeFileSync(USECASES_FILE, JSON.stringify(useCases, null, 2));
      return useCases[index];
    }
    throw new Error('Use case not found');
  } catch (error) {
    console.error('Error updating use case status:', error);
    throw error;
  }
};

// Get pending use cases (for moderation)
export const getPendingUseCases = () => {
  try {
    const useCases = getAllUseCases();
    return useCases.filter(uc => uc.status === 'pending');
  } catch (error) {
    console.error('Error getting pending use cases:', error);
    return [];
  }
};

// Get approved use cases (for public display)
export const getApprovedUseCases = () => {
  try {
    const useCases = getAllUseCases();
    return useCases.filter(uc => uc.status === 'approved');
  } catch (error) {
    console.error('Error getting approved use cases:', error);
    return [];
  }
};

// Delete a use case
export const deleteUseCase = (id) => {
  try {
    const useCases = getAllUseCases();
    const filteredUseCases = useCases.filter(uc => uc.id !== id);
    fs.writeFileSync(USECASES_FILE, JSON.stringify(filteredUseCases, null, 2));
    return true;
  } catch (error) {
    console.error('Error deleting use case:', error);
    throw error;
  }
};

// Express middleware for handling use case operations
export const handleUseCaseOperation = async (req, res) => {
  try {
    switch (req.method) {
      case 'GET':
        const useCases = getAllUseCases();
        res.json(useCases);
        break;
      
      case 'POST':
        const newUseCase = addUseCase(req.body);
        res.status(201).json(newUseCase);
        break;
      
      case 'PUT':
        const { id, status } = req.body;
        const updatedUseCase = updateUseCaseStatus(id, status);
        res.json(updatedUseCase);
        break;
      
      case 'DELETE':
        const { id: deleteId } = req.params;
        deleteUseCase(deleteId);
        res.status(204).end();
        break;
      
      default:
        res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
