import React, { useEffect } from 'react';
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
  Container,
  IconButton,
  Tooltip
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BusinessIcon from '@mui/icons-material/Business';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CommentIcon from '@mui/icons-material/Comment';
import BuildIcon from '@mui/icons-material/Build';
import ChatIcon from '@mui/icons-material/Chat';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useAuth } from '../context/AuthContext';
import users from '../data/user.json';

const UsecaseDetail = ({ usecases }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthorized } = useAuth();
  const usecase = usecases.find(u => u.id === parseInt(id));

  const findUser = (userId) => {
    return users.find(user => user.id === userId) || { firstname: 'Unknown', lastname: 'User' };
  };

  const handleCopyPrompt = () => {
    if (usecase.prompts_used) {
      navigator.clipboard.writeText(usecase.prompts_used);
    }
  };

  useEffect(() => {
    if (!usecase) {
      navigate('/usecases');
      return;
    }
    
    // Only check approval status for non-admin users
    if (!isAuthorized() && usecase.status !== 'approved') {
      navigate('/usecases');
    }
  }, [usecase, navigate, isAuthorized]);

  if (!usecase) {
    return null;
  }

  const submitter = findUser(usecase.userId);

  const getStatusChipColor = (status) => {
    switch (status) {
      case 'approved':
        return {
          bg: '#E8F5E9',
          color: '#2E7D32',
          border: '#C8E6C9'
        };
      case 'pending':
        return {
          bg: '#FFF3E0',
          color: '#E65100',
          border: '#FFE0B2'
        };
      case 'rejected':
        return {
          bg: '#FFEBEE',
          color: '#C62828',
          border: '#FFCDD2'
        };
      default:
        return {
          bg: '#E8F5E9',
          color: '#2E7D32',
          border: '#C8E6C9'
        };
    }
  };

  const statusColors = getStatusChipColor(usecase.status);

  return (
    <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh', py: 2 }}>
      <Container maxWidth="xl">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ 
            mb: 2,
            color: 'text.primary',
            '&:hover': {
              bgcolor: 'rgba(0, 0, 0, 0.04)'
            }
          }}
        >
          Back
        </Button>

        <Grid container spacing={2}>
          {/* Header Section */}
          <Grid item xs={12}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 3,
                borderRadius: 2,
                bgcolor: 'white',
                border: '1px solid',
                borderColor: 'grey.200'
              }}
            >
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 700,
                  mb: 1.5,
                  color: 'text.primary'
                }}
              >
                {usecase.usecase}
              </Typography>
              
              <Stack spacing={1} sx={{ mb: 2 }}>
                <Stack direction="row" spacing={1}>
                  <Chip 
                    label={usecase.service_line} 
                    sx={{ 
                      bgcolor: '#F3E5F5',
                      color: '#7B1FA2',
                      border: '1px solid #E1BEE7',
                      '& .MuiChip-label': { px: 2 }
                    }}
                  />
                  <Chip 
                    label={usecase.sdlc_phase} 
                    sx={{ 
                      bgcolor: '#E0F2F1',
                      color: '#00796B',
                      border: '1px solid #B2DFDB',
                      '& .MuiChip-label': { px: 2 }
                    }}
                  />
                  <Chip 
                    label={usecase.status.charAt(0).toUpperCase() + usecase.status.slice(1)}
                    sx={{ 
                      bgcolor: statusColors.bg,
                      color: statusColors.color,
                      border: `1px solid ${statusColors.border}`,
                      '& .MuiChip-label': { px: 2 }
                    }}
                  />
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Chip 
                    icon={<PersonIcon />}
                    label={`Submitted by ${submitter.firstname} ${submitter.lastname}`}
                    sx={{ 
                      bgcolor: '#E8F5E9',
                      color: '#2E7D32',
                      border: '1px solid #C8E6C9',
                      '& .MuiChip-label': { px: 2 }
                    }}
                  />
                  <Chip 
                    icon={<CalendarTodayIcon />}
                    label={`Submitted at ${usecase.submittedAt}`}
                    sx={{ 
                      bgcolor: '#E3F2FD',
                      color: '#1565C0',
                      border: '1px solid #BBDEFB',
                      '& .MuiChip-label': { px: 2 }
                    }}
                  />
                </Stack>
              </Stack>

              <Typography 
                variant="subtitle1" 
                sx={{ 
                  fontWeight: 600,
                  color: 'text.secondary',
                  mb: 0.5
                }}
              >
                Project Name
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
                {usecase.project}
              </Typography>
            </Paper>
          </Grid>

          {/* Prompts Used */}
          <Grid item xs={12}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 3,
                borderRadius: 2,
                bgcolor: 'white',
                border: '1px solid',
                borderColor: 'grey.200'
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1.5 }}>
                <ChatIcon sx={{ color: 'primary.main', fontSize: 28 }} />
                <Typography variant="h5" sx={{ fontWeight: 600, flexGrow: 1 }}>
                  Prompts Used
                </Typography>
                {usecase.prompts_used && (
                  <Tooltip title="Copy prompt">
                    <IconButton 
                      onClick={handleCopyPrompt}
                      size="small"
                      sx={{ color: 'primary.main' }}
                    >
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
              </Stack>
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                {usecase.prompts_used}
              </Typography>
            </Paper>
          </Grid>

          {/* Tools Used and Effort Tracking Combined */}
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 2,
                borderRadius: 2,
                bgcolor: 'white',
                border: '1px solid',
                borderColor: 'grey.200',
                minHeight: '160px'
              }}
            >
              {usecase.tools_used && (
                <>
                  <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
                    <BuildIcon sx={{ color: 'primary.main', fontSize: 24 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Tools Used
                    </Typography>
                  </Stack>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {usecase.tools_used.map((tool, index) => (
                      <Chip 
                        key={index}
                        label={tool}
                        size="small"
                        sx={{ 
                          bgcolor: '#ECEFF1',
                          color: '#455A64',
                          border: '1px solid #CFD8DC',
                          '& .MuiChip-label': { px: 2 }
                        }}
                      />
                    ))}
                  </Box>
                </>
              )}
              
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
                <AccessTimeIcon sx={{ color: 'primary.main', fontSize: 24 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Effort Tracking
                </Typography>
              </Stack>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Estimated(in hours)
                  </Typography>
                  <Typography variant="body2">
                    {usecase.estimated_efforts}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Actual(in hours)
                  </Typography>
                  <Typography variant="body2">
                    {usecase.actual_hours}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 2,
                borderRadius: 2,
                bgcolor: 'white',
                border: '1px solid',
                borderColor: 'grey.200',
                minHeight: '160px'
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
                <CommentIcon sx={{ color: 'primary.main', fontSize: 24 }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Comments
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {usecase.comments}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default UsecaseDetail;
