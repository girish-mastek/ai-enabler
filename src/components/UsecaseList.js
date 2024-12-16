import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box
} from '@mui/material';

const UsecaseList = ({ usecases }) => {
  const navigate = useNavigate();

  return (
    <Grid container spacing={3}>
      {usecases.map((usecase) => (
        <Grid item xs={12} sm={6} md={4} key={usecase.id}>
          <Card 
            sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              '&:hover': {
                boxShadow: 6
              }
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h6" component="h2">
                {usecase.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {usecase.description}
              </Typography>
              <Box sx={{ mb: 1 }}>
                {usecase.industry && (
                  <Chip 
                    label={usecase.industry} 
                    size="small" 
                    sx={{ mr: 1, mb: 1 }} 
                    color="primary"
                  />
                )}
                {usecase.sdlc_phase && (
                  <Chip 
                    label={usecase.sdlc_phase} 
                    size="small" 
                    sx={{ mr: 1, mb: 1 }} 
                    color="secondary"
                  />
                )}
              </Box>
              {usecase.tools_used && usecase.tools_used.length > 0 && (
                <Typography variant="body2" color="text.secondary">
                  Tools: {usecase.tools_used.join(', ')}
                </Typography>
              )}
            </CardContent>
            <CardActions>
              <Button 
                size="small" 
                color="primary"
                onClick={() => navigate(`/usecases/${usecase.id}`)}
              >
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default UsecaseList;
