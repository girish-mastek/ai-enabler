import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Typography, 
  Paper, 
  Box, 
  Chip,
  Divider,
  Grid,
  Card,
  CardContent,
  Button,
  Container
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { fetchUsecases } from '../services/api';

function UsecaseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usecase, setUsecase] = useState(null);

  useEffect(() => {
    fetchUsecases().then(usecases => {
      const found = usecases.find(u => u.id === parseInt(id));
      setUsecase(found);
    });
  }, [id]);

  if (!usecase) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/usecases')}
        sx={{ mb: 3 }}
      >
        Back to Use Cases
      </Button>

      <Paper elevation={2} sx={{ p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" gutterBottom color="primary">
            {usecase.title}
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Chip 
              label="Gen AI" 
              color="primary" 
              sx={{ mr: 1 }} 
            />
            <Chip 
              label="Use Case" 
              color="secondary" 
            />
          </Box>
        </Box>
        
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  Description
                </Typography>
                <Typography variant="body1" paragraph>
                  {usecase.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  Benefits
                </Typography>
                <Typography variant="body2" component="ul">
                  <li>Improved efficiency and productivity</li>
                  <li>Cost reduction through automation</li>
                  <li>Enhanced decision-making capabilities</li>
                  <li>Scalable AI-driven solutions</li>
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  Implementation Details
                </Typography>
                <Typography variant="body2" component="ul">
                  <li>Integration with existing systems</li>
                  <li>Required technical infrastructure</li>
                  <li>Timeline and milestones</li>
                  <li>Resource requirements</li>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default UsecaseDetail;
