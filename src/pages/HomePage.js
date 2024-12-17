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
  Container
} from '@mui/material';
import ExploreIcon from '@mui/icons-material/Explore';
import BusinessIcon from '@mui/icons-material/Business';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <ExploreIcon sx={{ fontSize: 48 }} />,
      title: 'Explore Use Cases',
      description: 'Discover various AI implementations across different industries and their practical applications.',
    },
    {
      icon: <BusinessIcon sx={{ fontSize: 48 }} />,
      title: 'Best Practices and Guidelines',
      description: 'This document outlines key best practices and guidelines designed to promote consistency, efficiency, and excellence in our processes and decision-making.',
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 48 }} />,
      title: 'Gen AI Toolset',
      description: 'List and features of Gen AI tools that can help to improve the day to day tasks and efficiency',
    },
  ];

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
                  onClick={() => navigate('/usecases')}
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
                        color: 'text.primary',
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
