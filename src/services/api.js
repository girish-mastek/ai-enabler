import usecases from '../data/usecases.json';

export const fetchUsecases = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(usecases), 500);
  });
};