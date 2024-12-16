import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import UsecaseList from '../components/UsecaseList';
import usecases from '../data/usecases.json';

const UsecasePage = () => {
  // Only show approved use cases
  const approvedUsecases = usecases.filter(usecase => usecase.status === 'approved');

  return (
    <Container>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          AI Use Cases
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Explore our collection of AI use cases across different industries. 
          Each case demonstrates practical applications and business impact of AI technologies.
        </Typography>
      </Box>
      
      <UsecaseList usecases={approvedUsecases} />
    </Container>
  );
};

export default UsecasePage;
