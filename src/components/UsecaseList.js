import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUsecases } from '../services/api';
import { 
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  Chip
} from '@mui/material';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';

function UsecaseList() {
  const [usecases, setUsecases] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsecases().then(setUsecases);
  }, []);

  const handleLearnMore = (id) => {
    navigate(`/usecases/${id}`);
  };

  return (
    <Grid container spacing={3}>
      {usecases.map((usecase) => (
        <Grid item xs={12} sm={6} md={4} key={usecase.id}>
          <Card 
            elevation={2}
            sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: '0.3s',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: 3
              }
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                {usecase.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {usecase.description}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Chip 
                  label="Gen AI" 
                  size="small" 
                  color="primary" 
                  sx={{ mr: 1 }}
                />
                <Chip 
                  label="Use Case" 
                  size="small" 
                  color="secondary"
                />
              </Box>
            </CardContent>
            <CardActions>
              <Button 
                size="small" 
                color="primary" 
                endIcon={<ArrowForwardIcon />}
                onClick={() => handleLearnMore(usecase.id)}
              >
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default UsecaseList;
