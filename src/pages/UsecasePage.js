import React from 'react';
import UsecaseList from '../components/UsecaseList';
import { Typography, Container, Paper, Box } from '@mui/material';

function UsecasePage() {
  return (
    <Container>
      <Box sx={{ mb: 4 }}>
        <Paper 
          elevation={2} 
          sx={{ 
            p: 4, 
            background: 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)',
            color: 'white',
            mb: 4
          }}
        >
          <Typography variant="h4" gutterBottom>
            Gen AI Use Cases
          </Typography>
          <Typography variant="subtitle1">
            Browse through our collection of Generative AI use cases. Each case demonstrates how AI 
            can be leveraged to solve real business challenges and drive innovation.
          </Typography>
        </Paper>

        <UsecaseList />
      </Box>
    </Container>
  );
}

export default UsecasePage;
