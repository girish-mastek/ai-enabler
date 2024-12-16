import React from 'react';
import { Typography, Paper, Grid, Box, Container } from '@mui/material';
import UsecaseList from './UsecaseList';

function Dashboard() {
  return (
    <Container>
      <Box sx={{ mb: 4 }}>
        <Paper 
          elevation={2} 
          sx={{ 
            p: 4, 
            background: 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)',
            color: 'white'
          }}
        >
          <Typography variant="h4" gutterBottom>
            Welcome to Gen AI Usecase Portal
          </Typography>
          <Typography variant="subtitle1">
            Explore and contribute to our organization's collection of Generative AI use cases.
            Discover how AI is transforming our business processes and creating new opportunities.
          </Typography>
        </Paper>
      </Box>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12}>
          <Paper elevation={1} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom color="primary">
              Latest Use Cases
            </Typography>
            <UsecaseList />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
