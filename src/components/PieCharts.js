import React from 'react';
import { Box, Paper, Typography, Grid, Container } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import AssessmentIcon from '@mui/icons-material/Assessment';
import BuildIcon from '@mui/icons-material/Build';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieCharts = ({ usecases }) => {
  // Helper function to get tools array
  const getToolsArray = (tools) => {
    if (!tools) return [];
    if (Array.isArray(tools)) return tools;
    if (typeof tools === 'string' && tools.trim() !== '') return [tools];
    return [];
  };

  // Calculate SDLC phase statistics
  const sdlcStats = usecases.reduce((acc, usecase) => {
    if (usecase.status === 'approved' && usecase.sdlc_phase) {
      const phases = Array.isArray(usecase.sdlc_phase) 
        ? usecase.sdlc_phase 
        : [usecase.sdlc_phase];
      
      phases.forEach(phase => {
        if (phase) {
          acc[phase] = (acc[phase] || 0) + 1;
        }
      });
    }
    return acc;
  }, {});

  // Calculate tools statistics
  const toolsStats = usecases.reduce((acc, usecase) => {
    if (usecase.status === 'approved') {
      const tools = getToolsArray(usecase.tools_used);
      tools.forEach(tool => {
        if (tool) {
          acc[tool] = (acc[tool] || 0) + 1;
        }
      });
    }
    return acc;
  }, {});

  // Sort and get top 5 tools
  const topTools = Object.entries(toolsStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});

  // Colors for the charts
  const colors = [
    'rgba(23, 115, 134, 0.8)',
    'rgba(54, 162, 235, 0.8)',
    'rgba(255, 206, 86, 0.8)',
    'rgba(75, 192, 192, 0.8)',
    'rgba(153, 102, 255, 0.8)',
  ];

  const sdlcChartData = {
    labels: Object.keys(sdlcStats),
    datasets: [{
      data: Object.values(sdlcStats),
      backgroundColor: colors,
      borderColor: colors.map(color => color.replace('0.8', '1')),
      borderWidth: 1
    }]
  };

  const toolsChartData = {
    labels: Object.keys(topTools),
    datasets: [{
      data: Object.values(topTools),
      backgroundColor: colors,
      borderColor: colors.map(color => color.replace('0.8', '1')),
      borderWidth: 1
    }]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <Box sx={{ mb: { xs: 6, md: 8 } }}>  {/* Added margin bottom */}
      <Container maxWidth="xl">
        <Grid container spacing={4} sx={{ maxWidth: 1200, mx: 'auto' }}>
          {/* SDLC Phase Chart */}
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
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <AssessmentIcon sx={{ fontSize: 28, color: '#177386', mr: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 600, color: '#177386' }}>
                  SDLC Phase Distribution
                </Typography>
              </Box>
              <Box sx={{ height: 300, position: 'relative' }}>
                <Pie data={sdlcChartData} options={chartOptions} />
              </Box>
            </Paper>
          </Grid>

          {/* Tools Chart */}
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
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <BuildIcon sx={{ fontSize: 28, color: '#177386', mr: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 600, color: '#177386' }}>
                  Top 5 Tools Used
                </Typography>
              </Box>
              <Box sx={{ height: 300, position: 'relative' }}>
                <Pie data={toolsChartData} options={chartOptions} />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PieCharts;
