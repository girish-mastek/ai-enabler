import React from 'react';
import { useAuth } from '../context/AuthContext';
import usecases from '../data/usecases.json';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Chip,
  Card,
  CardContent,
} from '@mui/material';

const MyAccountPage = () => {
  const { user } = useAuth();

  // Filter usecases for the current user
  const userUsecases = usecases.filter(usecase => usecase.userId === user?.id);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" gutterBottom>
            My Account
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Welcome, {user?.firstname || ''} {user?.lastname || ''}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Employee ID: {user?.employee_id || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Email: {user?.email || 'N/A'}
          </Typography>
        </Box>
      </Paper>

      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 3 }}>
        My Usecases
      </Typography>

      <Grid container spacing={3}>
        {userUsecases.map((usecase) => (
          <Grid item xs={12} key={usecase.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {usecase.usecase || 'Untitled Usecase'}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Service Line: {usecase.service_line || 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      SDLC Phase: {usecase.sdlc_phase || 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Project: {usecase.project || 'N/A'}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Estimated Efforts: {usecase.estimated_efforts || 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Actual Hours: {usecase.actual_hours || 'N/A'}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <Chip 
                        label={usecase.status || 'pending'}
                        color={usecase.status === 'approved' ? 'success' : 'warning'}
                        size="small"
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Tools Used:
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    {Array.isArray(usecase.tools_used) && usecase.tools_used.map((tool, index) => (
                      <Chip
                        key={index}
                        label={tool}
                        size="small"
                        sx={{ mr: 1, mb: 1 }}
                      />
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {userUsecases.length === 0 && (
          <Grid item xs={12}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                You haven't submitted any usecases yet.
              </Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default MyAccountPage;
