import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Card,
  CardContent
} from '@mui/material';
import ExploreIcon from '@mui/icons-material/Explore';
import BusinessIcon from '@mui/icons-material/Business';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <ExploreIcon sx={{ fontSize: 40 }} />,
      title: 'Explore Use Cases',
      description: 'Discover various AI implementations across different industries and their practical applications.',
    },
    {
      icon: <BusinessIcon sx={{ fontSize: 40 }} />,
      title: 'Best Practices and Guidelines',
      description: 'This document outlines key best practices and guidelines designed to promote consistency, efficiency, and excellence in our processes and decision-making.',
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      title: 'Gen AI Toolset',
      description: 'List and features of Gen AI tools that can help to improve the day to day tasks and efficiency',
    },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      {/* Hero Section */}
      <Box
        sx={{
          width: '100%',
          pt: 8,
          pb: 6,
          textAlign: 'center',
          bgcolor: 'white',
          borderBottom: 1,
          borderColor: 'grey.200'
        }}
      >
        <Box sx={{ maxWidth: '1920px', mx: 'auto', px: { xs: 2, sm: 3, md: 4 } }}>
          <Typography
            component="h1"
            variant="h2"
            color="primary"
            gutterBottom
            sx={{ fontWeight: 'bold' }}
          >
            Mastek Gen AI Knowledge Portal
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Explore practical applications of Generative AI across various industries.
            Discover how AI is transforming businesses and creating new opportunities.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/usecases')}
            sx={{ mt: 4 }}
          >
            Explore Use Cases
          </Button>
        </Box>
      </Box>

      {/* Features Section */}
      <Box sx={{ maxWidth: '1920px', mx: 'auto', px: { xs: 2, sm: 3, md: 4 }, py: 8 }}>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                onClick={() => navigate('/usecases')}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                    '& .feature-icon': {
                      transform: 'scale(1.1)',
                      color: 'primary.dark'
                    }
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Box 
                    className="feature-icon"
                    sx={{ 
                      color: 'primary.main', 
                      mb: 2,
                      transition: 'all 0.2s ease-in-out'
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography 
                    gutterBottom 
                    variant="h5" 
                    component="h2"
                    sx={{ 
                      fontWeight: 600,
                      color: 'text.primary'
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    color="text.secondary"
                    sx={{ 
                      fontSize: '1rem',
                      lineHeight: 1.6
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

      {/* Call to Action */}
      <Box sx={{ width: '100%', bgcolor: 'primary.light', py: 4 }}>
        <Box sx={{ maxWidth: '1920px', mx: 'auto', px: { xs: 2, sm: 3, md: 4 } }}>
          <Paper
            sx={{
              p: 4,
              textAlign: 'center',
              backgroundColor: 'primary.light',
              color: 'white',
              boxShadow: 'none'
            }}
          >
            <Typography variant="h5" gutterBottom>
              Ready to explore AI use cases?
            </Typography>
            <Typography variant="body1" paragraph>
              Browse through our collection of real-world AI implementations and their impact.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => navigate('/usecases')}
            >
              View All Use Cases
            </Button>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
