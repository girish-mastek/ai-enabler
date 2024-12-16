import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Button,
  Grid,
  Paper
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import usecases from '../data/usecases.json';

const UsecaseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const usecase = usecases.find(u => u.id === parseInt(id));

  if (!usecase) {
    return (
      <Box>
        <Typography variant="h5" color="error">Use case not found</Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/usecases')}
          sx={{ mt: 2 }}
        >
          Back to Use Cases
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/usecases')}
        sx={{ mb: 3 }}
      >
        Back to Use Cases
      </Button>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {usecase.title}
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Chip 
              label={usecase.industry} 
              color="primary" 
              sx={{ mr: 1 }} 
            />
            <Chip 
              label={usecase.sdlc_phase} 
              color="secondary" 
              sx={{ mr: 1 }} 
            />
          </Box>

          <Typography variant="body1" paragraph>
            {usecase.description}
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Tools Used
                </Typography>
                <Box>
                  {usecase.tools_used.map((tool, index) => (
                    <Chip 
                      key={index}
                      label={tool}
                      sx={{ mr: 1, mb: 1 }}
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Business Impact
                </Typography>
                <Typography variant="body1">
                  {usecase.business_impact}
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          {usecase.project_link && (
            <Box sx={{ mt: 3 }}>
              <Button 
                variant="contained" 
                color="primary"
                href={usecase.project_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Project
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default UsecaseDetail;
