import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
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
      title: 'Industry Insights',
      description: 'Learn how different sectors are leveraging AI to transform their business operations.',
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      title: 'Business Impact',
      description: 'Understand the real-world impact and benefits of AI implementation in business scenarios.',
    },
  ];

  return (
    <Container>
      {/* Hero Section */}
      <Box
        sx={{
          pt: 8,
          pb: 6,
          textAlign: 'center',
        }}
      >
        <Typography
          component="h1"
          variant="h2"
          color="primary"
          gutterBottom
          sx={{ fontWeight: 'bold' }}
        >
          Gen AI Use Cases Portal
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

      {/* Features Section */}
      <Grid container spacing={4} sx={{ mb: 8 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  boxShadow: 6,
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography gutterBottom variant="h5" component="h2">
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Call to Action */}
      <Paper
        sx={{
          p: 4,
          mb: 4,
          textAlign: 'center',
          backgroundColor: 'primary.light',
          color: 'white',
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
    </Container>
  );
};

export default HomePage;
