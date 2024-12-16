const API_URL = 'http://localhost:3001/api';

// Read all use cases
export const getAllUseCases = async () => {
  try {
    const response = await fetch(`${API_URL}/usecases`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching usecases:', error);
    return [];
  }
};

// Add a new use case
export const addUseCase = async (useCase) => {
  try {
    const response = await fetch(`${API_URL}/usecases`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(useCase),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  } catch (error) {
    console.error('Error adding usecase:', error);
    throw error;
  }
};

// Update use case status (for moderation)
export const updateUseCaseStatus = async (id, status) => {
  try {
    const response = await fetch(`${API_URL}/usecases/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
  } catch (error) {
    console.error('Error updating usecase status:', error);
    throw error;
  }
};

// Delete a use case
export const deleteUseCase = async (id) => {
  try {
    const response = await fetch(`${API_URL}/usecases/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error);
    }
    return true;
  } catch (error) {
    console.error('Error deleting usecase:', error);
    throw error;
  }
};

// Get pending use cases (for moderation)
export const getPendingUseCases = async () => {
  const usecases = await getAllUseCases();
  return usecases.filter(uc => uc.status === 'pending');
};

// Get approved use cases (for public display)
export const getApprovedUseCases = async () => {
  const usecases = await getAllUseCases();
  return usecases.filter(uc => uc.status === 'approved');
};

// Get rejected use cases
export const getRejectedUseCases = async () => {
  const usecases = await getAllUseCases();
  return usecases.filter(uc => uc.status === 'rejected');
};

// Get use case by ID
export const getUseCaseById = async (id) => {
  const usecases = await getAllUseCases();
  return usecases.find(uc => uc.id === id);
};
