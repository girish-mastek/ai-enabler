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
  Stack,
  Divider
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingIcon from '@mui/icons-material/Pending';
import BusinessIcon from '@mui/icons-material/Business';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CommentIcon from '@mui/icons-material/Comment';

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
                {usecase.usecase}
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

          <Grid container spacing={3}>
            {/* Project Information */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, height: '100%' }}>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                  <BusinessIcon color="primary" />
                  <Typography variant="h6">
                    Project Details
                  </Typography>
                </Stack>
                <Typography variant="body1" paragraph>
                  {usecase.project}
                </Typography>
              </Paper>
            </Grid>

            {/* Prompts Used */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Prompts Used
                </Typography>
                <Typography variant="body1" paragraph>
                  {usecase.prompts_used}
                </Typography>
              </Paper>
            </Grid>

            {/* Efforts and Hours */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, height: '100%' }}>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                  <AccessTimeIcon color="primary" />
                  <Typography variant="h6">
                    Time & Effort
                  </Typography>
                </Stack>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Estimated Efforts
                    </Typography>
                    <Typography variant="body1">
                      {usecase.estimated_efforts}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Actual Hours
                    </Typography>
                    <Typography variant="body1">
                      {usecase.actual_hours}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid>

            {/* Comments */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, height: '100%' }}>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                  <CommentIcon color="primary" />
                  <Typography variant="h6">
                    Comments
                  </Typography>
                </Stack>
                <Typography variant="body1">
                  {usecase.comments}
                </Typography>
              </Paper>
            </Grid>

            {/* Tools Used */}
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

          <Divider sx={{ my: 3 }} />

          {/* Timestamps */}
          <Stack spacing={1}>
            {usecase.submittedAt && (
              <Typography 
                variant="body2" 
                color="text.secondary"
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
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UsecaseDetail;
