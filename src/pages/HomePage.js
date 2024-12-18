import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Card,
  CardContent,
  Container,
  Stack,
  Chip,
  Divider,
} from '@mui/material';
import ExploreIcon from '@mui/icons-material/Explore';
import BusinessIcon from '@mui/icons-material/Business';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import usecases from '../data/usecases.json';
import users from '../data/user.json';
import PieCharts from '../components/PieCharts';

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <ExploreIcon sx={{ fontSize: 48 }} />,
      title: 'Explore Use Cases',
      description: 'Discover various AI implementations across different industries and their practical applications.',
      link: '/usecases'
    },
    {
      icon: <BusinessIcon sx={{ fontSize: 48 }} />,
      title: 'Best Practices and Guidelines',
      description: 'This document outlines key best practices and guidelines designed to promote consistency, efficiency, and excellence in our processes and decision-making.',
      link: 'https://mastekgroup.sharepoint.com/:w:/r/GenAI/_layouts/15/Doc.aspx?sourcedoc=%7BFB9CF2D5-FCE7-4CA8-B6CC-3672A13556EB%7D&file=Mastek%20AI%20in%20SDLC%20Best%20Practices.docx&action=default&mobileredirect=true'
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 48 }} />,
      title: 'Gen AI Toolset',
      description: 'List and features of Gen AI tools that can help to improve the day to day tasks and efficiency',
      link: 'https://mastekgroup.sharepoint.com/:w:/r/GenAI/_layouts/15/Doc.aspx?sourcedoc=%7B0F8C156C-37C3-44D7-8B45-819DB671CE57%7D&file=Mastek%20AI%20in%20SDLC%20Toolset.docx&action=default&mobileredirect=true'
    },
  ];

  // Calculate statistics for leaderboard
  const approvedUsecases = usecases.filter(usecase => usecase.status === 'approved');
  
  // Service Line Statistics
  const serviceLineStats = approvedUsecases.reduce((acc, usecase) => {
    const serviceLine = usecase.service_line;
    if (serviceLine) {
      acc[serviceLine] = (acc[serviceLine] || 0) + 1;
    }
    return acc;
  }, {});

  const topServiceLines = Object.entries(serviceLineStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3);

  // User Statistics
  const userStats = approvedUsecases.reduce((acc, usecase) => {
    const userId = usecase.userId;
    if (userId) {
      acc[userId] = (acc[userId] || 0) + 1;
    }
    return acc;
  }, {});

  const topUsers = Object.entries(userStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)
    .map(([userId, count]) => {
      const user = users.find(u => u.id === parseInt(userId));
      return {
        name: user ? `${user.firstname} ${user.lastname}` : 'Unknown User',
        count
      };
    });

  const handleFeatureClick = (link) => {
    if (link.startsWith('http')) {
      window.open(link, '_blank');
    } else {
      navigate(link);
    }
  };

  return (
    <Box sx={{ bgcolor: 'grey.50' }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          bgcolor: 'white',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, rgba(0,0,0,0.02) 0%, rgba(255,255,255,0) 100%)',
            zIndex: 1
          }
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              pt: { xs: 5, md: 6 },
              pb: { xs: 5, md: 6 },
              textAlign: 'center',
              position: 'relative',
              zIndex: 2
            }}
          >
            <Typography
              component="h1"
              variant="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                background: '#177386',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                mb: 2
              }}
            >
              Mastek Gen AI Knowledge Portal
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                color: 'text.secondary',
                maxWidth: '800px',
                mx: 'auto',
                mb: 3,
                lineHeight: 1.6
              }}
            >
              Explore practical applications of Generative AI across various industries.
              Discover how AI is transforming businesses and creating new opportunities.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/usecases')}
              endIcon={<ArrowForwardIcon />}
              sx={{
                py: 1.5,
                px: 4,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 2,
                textTransform: 'none',
                boxShadow: '0 4px 14px 0 rgba(25, 118, 210, 0.3)',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px 0 rgba(25, 118, 210, 0.4)'
                }
              }}
            >
              Explore Use Cases
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="xl">
        <Box sx={{ py: { xs: 4, md: 5 } }}>
          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  onClick={() => handleFeatureClick(feature.link)}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    borderRadius: 2,
                    bgcolor: 'white',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
                      '& .feature-icon': {
                        transform: 'scale(1.1) rotate(5deg)',
                        color: 'primary.main'
                      }
                    },
                  }}
                >
                  <CardContent sx={{ p: 3, flexGrow: 1 }}>
                    <Box 
                      className="feature-icon"
                      sx={{ 
                        color: 'primary.light',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2,
                        transition: 'all 0.3s ease-in-out'
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography 
                      variant="h5" 
                      component="h2"
                      sx={{ 
                        fontWeight: 700,
                        color: '#177386',
                        mb: 1.5,
                        textAlign: 'center'
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography 
                      sx={{ 
                        color: 'text.secondary',
                        fontSize: '1rem',
                        lineHeight: 1.6,
                        textAlign: 'center'
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      <Divider />

      {/* Leaderboard Section */}
      <Box sx={{ 
        bgcolor: 'white', 
        py: { xs: 4, md: 5 },
        mb: { xs: 5, md: 6 } // Added margin bottom for white space
      }}>
        <Container maxWidth="xl">
          <Typography
            variant="h4" // Changed from h3 to h4 to reduce font size
            sx={{
              textAlign: 'center',
              fontWeight: 700,
              color: '#177386',
              mb: 4,
              fontSize: { xs: '1.75rem', md: '2rem' } // Further reduced font size
            }}
          >
            Leaderboard
          </Typography>
          <Grid container spacing={4} sx={{ maxWidth: 1200, mx: 'auto' }}>
            {/* Service Line Leaders */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  height: '100%',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  background: 'linear-gradient(145deg, #ffffff 0%, #f5f7fa 100%)',
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                  <WorkIcon sx={{ fontSize: 28, color: '#177386' }} />
                  <Typography variant="h5" sx={{ fontWeight: 600, color: '#177386' }}>
                    Top Service Lines
                  </Typography>
                </Stack>
                <Stack spacing={1.5}>
                  {topServiceLines.map(([name, count], index) => (
                    <Box
                      key={name}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: 1.5,
                        borderRadius: 1,
                        bgcolor: 'white',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                      }}
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Typography
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            bgcolor: '#177386',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                          }}
                        >
                          {index + 1}
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {name}
                        </Typography>
                      </Stack>
                      <Chip
                        label={`${count} usecases`}
                        size="small"
                        sx={{
                          bgcolor: 'rgba(23, 115, 134, 0.1)',
                          color: '#177386',
                          fontWeight: 500,
                        }}
                      />
                    </Box>
                  ))}
                </Stack>
              </Paper>
            </Grid>

            {/* Top Users */}
            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  height: '100%',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  background: 'linear-gradient(145deg, #ffffff 0%, #f5f7fa 100%)',
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                  <PersonIcon sx={{ fontSize: 28, color: '#177386' }} />
                  <Typography variant="h5" sx={{ fontWeight: 600, color: '#177386' }}>
                    Top Contributors
                  </Typography>
                </Stack>
                <Stack spacing={1.5}>
                  {topUsers.map(({ name, count }, index) => (
                    <Box
                      key={name}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        p: 1.5,
                        borderRadius: 1,
                        bgcolor: 'white',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                      }}
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Typography
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            bgcolor: '#177386',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                          }}
                        >
                          {index + 1}
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {name}
                        </Typography>
                      </Stack>
                      <Chip
                        label={`${count} usecases`}
                        size="small"
                        sx={{
                          bgcolor: 'rgba(23, 115, 134, 0.1)',
                          color: '#177386',
                          fontWeight: 500,
                        }}
                      />
                    </Box>
                  ))}
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Divider />

      {/* Analytics Section */}
      <Box sx={{ bgcolor: 'white', pt: { xs: 5, md: 6 } }}> {/* Added top padding */}
        <Container maxWidth="xl">
          <PieCharts usecases={usecases} />
        </Container>
      </Box>

      <Divider />

      {/* Call to Action */}
      <Box 
        sx={{ 
          background: '#177386',
          py: { xs: 5, md: 6 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
            zIndex: 1
          }
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              position: 'relative',
              zIndex: 2,
              textAlign: 'center',
              color: 'white'
            }}
          >
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700,
                mb: 1.5,
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              Ready to explore AI use cases?
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 400,
                mb: 3,
                opacity: 0.9
              }}
            >
              Browse through our collection of real-world AI implementations and their impact.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => navigate('/usecases')}
              endIcon={<ArrowForwardIcon />}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                py: 1.5,
                px: 4,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 2,
                textTransform: 'none',
                boxShadow: '0 4px 14px 0 rgba(0,0,0,0.1)',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  bgcolor: 'white',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px 0 rgba(0,0,0,0.15)'
                }
              }}
            >
              View All Use Cases
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
