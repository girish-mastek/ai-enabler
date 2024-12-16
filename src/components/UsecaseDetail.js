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
  Paper,
  Stack
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingIcon from '@mui/icons-material/Pending';

const UsecaseDetail = ({ usecases }) => {
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
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 3 }}>
            <Box>
              <Typography variant="h4" gutterBottom>
                {usecase.title}
              </Typography>
              
              <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                <Chip 
                  label={usecase.service_line} 
                  color="primary"
                />
                <Chip 
                  label={usecase.sdlc_phase} 
                  color="secondary"
                />
                {usecase.status === 'pending' && (
                  <Chip
                    icon={<PendingIcon />}
                    label="Pending Approval"
                    color="warning"
                  />
                )}
                {usecase.status === 'approved' && (
                  <Chip
                    icon={<CheckCircleIcon />}
                    label="Approved"
                    color="success"
                  />
                )}
                {usecase.status === 'rejected' && (
                  <Chip
                    icon={<CancelIcon />}
                    label="Rejected"
                    color="error"
                  />
                )}
              </Stack>
            </Box>
          </Box>

          <Typography variant="body1" paragraph>
            {usecase.description}
          </Typography>

          <Grid container spacing={3}>
            {usecase.tools_used && (
              <Grid item xs={12}>
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
            )}
          </Grid>

          {usecase.submittedAt && (
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ mt: 3 }}
            >
              Submitted on: {new Date(usecase.submittedAt).toLocaleDateString()}
            </Typography>
          )}
          {usecase.moderatedAt && (
            <Typography 
              variant="body2" 
              color="text.secondary"
            >
              Moderated on: {new Date(usecase.moderatedAt).toLocaleDateString()}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default UsecaseDetail;
