import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  Stack,
  Pagination
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PendingIcon from '@mui/icons-material/Pending';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const ITEMS_PER_PAGE = 15;

const UsecaseList = ({ usecases, onApprove, onReject }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleCardClick = (event, usecase) => {
    // Don't navigate if clicking on approve/reject buttons
    if (event.target.closest('.action-buttons')) {
      return;
    }
    navigate(`/usecases/${usecase.id}`);
  };

  const truncateTitle = (title) => {
    if (!title) return '';
    return title.length > 50 ? `${title.substring(0, 50)}...` : title;
  };

  if (usecases.length === 0) {
    return (
      <Box 
        sx={{ 
          p: 4, 
          textAlign: 'center',
          bgcolor: 'white',
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'grey.200'
        }}
      >
        <Typography variant="h6" color="text.secondary">
          No use cases found matching your filters.
        </Typography>
      </Box>
    );
  }

  // Calculate pagination
  const totalPages = Math.ceil(usecases.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedUsecases = usecases.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <Box>
      <Grid container spacing={2.5}>
        {paginatedUsecases.map((usecase) => (
          <Grid 
            item 
            xs={12} 
            sm={6} 
            lg={4} 
            xl={3} 
            key={usecase.id}
            sx={{ display: 'flex' }}
          >
            <Card 
              onClick={(e) => handleCardClick(e, usecase)}
              sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                width: '100%',
                bgcolor: 'white',
                borderRadius: 1,
                border: '1px solid',
                borderColor: usecase.status === 'pending' ? 'warning.light' : 'grey.200',
                transition: 'all 0.2s ease-in-out',
                cursor: 'pointer',
                '&:hover': {
                  borderColor: 'primary.main',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  '& .learn-more-btn': {
                    color: 'white',
                    bgcolor: 'primary.main',
                    borderColor: 'primary.main'
                  }
                }
              }}
            >
              <CardContent sx={{ p: 2.5, pb: 1, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Use Case Title and Status */}
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                    <Typography 
                      variant="h6" 
                      component="h2"
                      title={usecase.usecase || ''}
                      sx={{ 
                        fontWeight: 600,
                        fontSize: '1rem',
                        lineHeight: 1.4,
                        color: 'text.primary',
                        flexGrow: 1
                      }}
                    >
                      {truncateTitle(usecase.usecase)}
                    </Typography>
                    {usecase.status === 'pending' && (
                      <Chip
                        icon={<PendingIcon />}
                        label="Pending"
                        size="small"
                        color="warning"
                        sx={{ ml: 1 }}
                      />
                    )}
                  </Box>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      fontSize: '0.875rem',
                      lineHeight: 1.6,
                      mb: 1,
                      minHeight: '4.2em',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {usecase.prompts_used || usecase.usecase}
                  </Typography>
                </Box>

                {/* Tools Section */}
                {usecase.tools_used && usecase.tools_used.length > 0 && (
                  <Box sx={{ mb: 1.5 }}>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                      {Array.isArray(usecase.tools_used) ? usecase.tools_used.map((tool, index) => (
                        <Chip
                          key={index}
                          label={tool}
                          size="small"
                          sx={{ 
                            height: '22px',
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            bgcolor: '#ECEFF1',
                            color: '#455A64',
                            border: '1px solid',
                            borderColor: '#CFD8DC',
                            '& .MuiChip-label': { px: 1 }
                          }}
                        />
                      )) : (
                        <Chip
                          label={usecase.tools_used}
                          size="small"
                          sx={{ 
                            height: '22px',
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            bgcolor: '#ECEFF1',
                            color: '#455A64',
                            border: '1px solid',
                            borderColor: '#CFD8DC',
                            '& .MuiChip-label': { px: 1 }
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                )}

                {/* Service Line Section */}
                <Box sx={{ mt: 'auto' }}>
                  {usecase.service_line && (
                    <Box>
                      <Chip 
                        label={Array.isArray(usecase.service_line) ? usecase.service_line[0] : usecase.service_line} 
                        size="small" 
                        sx={{ 
                          height: '24px',
                          fontSize: '0.75rem',
                          fontWeight: 500,
                          bgcolor: '#F3E5F5',
                          color: '#7B1FA2',
                          border: '1px solid',
                          borderColor: '#E1BEE7',
                          '& .MuiChip-label': { px: 1 }
                        }}
                      />&nbsp;
                      <Chip 
                        label={Array.isArray(usecase.sdlc_phase) ? usecase.sdlc_phase[0] : usecase.sdlc_phase} 
                        size="small" 
                        sx={{ 
                          height: '24px',
                          fontSize: '0.75rem',
                          fontWeight: 500,
                          bgcolor: '#E0F2F1',
                          color: '#00796B',
                          border: '1px solid',
                          borderColor: '#B2DFDB',
                          '& .MuiChip-label': { px: 1 }
                        }}
                      />
                    </Box>
                  )}
                </Box>
              </CardContent>

              <CardActions className="action-buttons" sx={{ p: 2, pt: 1.5, flexDirection: 'column', gap: 1 }}>
                {usecase.status === 'pending' && onApprove && onReject && (
                  <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<CheckCircleIcon />}
                      onClick={(e) => {
                        e.stopPropagation();
                        onApprove(usecase.id);
                      }}
                      fullWidth
                      size="small"
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<CancelIcon />}
                      onClick={(e) => {
                        e.stopPropagation();
                        onReject(usecase.id);
                      }}
                      fullWidth
                      size="small"
                    >
                      Reject
                    </Button>
                  </Box>
                )}
                <Button 
                  className="learn-more-btn"
                  fullWidth
                  variant="outlined"
                  endIcon={<ArrowForwardIcon />}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/usecases/${usecase.id}`);
                  }}
                  sx={{ 
                    py: 0.75,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    borderRadius: 1,
                    transition: 'all 0.2s ease-in-out',
                    borderColor: 'grey.300',
                    color: 'text.primary',
                    '&:hover': {
                      color: 'white',
                      bgcolor: 'primary.main',
                      borderColor: 'primary.main'
                    }
                  }}
                >
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination 
            count={totalPages} 
            page={page} 
            onChange={handlePageChange}
            color="primary"
            size="large"
            sx={{
              '& .MuiPaginationItem-root': {
                fontSize: '1rem',
                fontWeight: 500
              }
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default UsecaseList;
