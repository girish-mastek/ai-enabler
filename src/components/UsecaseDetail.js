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
  Container
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BusinessIcon from '@mui/icons-material/Business';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CommentIcon from '@mui/icons-material/Comment';
import BuildIcon from '@mui/icons-material/Build';
import ChatIcon from '@mui/icons-material/Chat';

const UsecaseDetail = ({ usecases }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const usecase = usecases.find(u => u.id === parseInt(id));

  useEffect(() => {
    if (!usecase || usecase.status !== 'approved') {
      navigate('/usecases');
    }
  }, [usecase, navigate]);

  if (!usecase || usecase.status !== 'approved') {
    return null;
  }

  return (
    <Box sx={{ bgcolor: 'grey.50', minHeight: '100vh', py: 2 }}>
      <Container maxWidth="xl">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/usecases')}
          sx={{ 
            mb: 2,
            color: 'text.primary',
            '&:hover': {
              bgcolor: 'rgba(0, 0, 0, 0.04)'
            }
          }}
        >
          Back to Use Cases
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
              
              <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
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
              </Stack>

              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.6 }}>
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
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Prompts Used
                </Typography>
              </Stack>
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                {usecase.prompts_used}
              </Typography>
            </Paper>
          </Grid>

          {/* Time & Effort and Comments */}
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 3,
                height: '100%',
                borderRadius: 2,
                bgcolor: 'white',
                border: '1px solid',
                borderColor: 'grey.200'
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
                <AccessTimeIcon sx={{ color: 'primary.main', fontSize: 28 }} />
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Time & Effort
                </Typography>
              </Stack>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 0.5 }}>
                    Estimated Efforts
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                    {usecase.estimated_efforts}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 0.5 }}>
                    Actual Hours
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>
                    {usecase.actual_hours}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 3,
                height: '100%',
                borderRadius: 2,
                bgcolor: 'white',
                border: '1px solid',
                borderColor: 'grey.200'
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
                <CommentIcon sx={{ color: 'primary.main', fontSize: 28 }} />
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Comments
                </Typography>
              </Stack>
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                {usecase.comments}
              </Typography>
            </Paper>
          </Grid>

          {/* Tools Used */}
          {usecase.tools_used && (
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
                <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
                  <BuildIcon sx={{ color: 'primary.main', fontSize: 28 }} />
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Tools Used
                  </Typography>
                </Stack>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {usecase.tools_used.map((tool, index) => (
                    <Chip 
                      key={index}
                      label={tool}
                      sx={{ 
                        bgcolor: '#ECEFF1',
                        color: '#455A64',
                        border: '1px solid #CFD8DC',
                        '& .MuiChip-label': { px: 2 }
                      }}
                    />
                  ))}
                </Box>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default UsecaseDetail;
