import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, Typography, Grid, Container } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import AssessmentIcon from '@mui/icons-material/Assessment';
import BuildIcon from '@mui/icons-material/Build';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieCharts = ({ usecases }) => {
  const navigate = useNavigate();

  // Helper function to get tools array
  const getToolsArray = (tools) => {
    if (!tools) return [];
    if (Array.isArray(tools)) return tools;
    if (typeof tools === 'string' && tools.trim() !== '') return [tools];
    return [];
  };

  // Calculate Delivery phase statistics
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

  const commonChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        align: 'center',
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            size: 12
          },
          boxWidth: 10
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%) - Click to filter`;
          }
        }
      }
    }
  };

  const sdlcChartOptions = {
    ...commonChartOptions,
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const phase = sdlcChartData.labels[index];
        // Replace spaces with underscores
        navigate(`/usecases?sdlc_phase=${phase.replace(/ /g, '_')}`);
      }
    }
  };

  const toolsChartOptions = {
    ...commonChartOptions,
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const tool = toolsChartData.labels[index];
        // Replace spaces with underscores
        navigate(`/usecases?tools_used=${tool.replace(/ /g, '_')}`);
      }
    }
  };

  return (
    <Box sx={{ mb: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
          {/* Delivery Phase Chart */}
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
                cursor: 'pointer'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AssessmentIcon sx={{ fontSize: 28, color: '#177386', mr: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 600, color: '#177386' }}>
                Delivery Phase Distribution
                </Typography>
              </Box>
              <Box sx={{ height: 350, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ width: '100%', height: '100%', maxWidth: 400, margin: 'auto' }}>
                  <Pie data={sdlcChartData} options={sdlcChartOptions} />
                </Box>
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
                cursor: 'pointer'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <BuildIcon sx={{ fontSize: 28, color: '#177386', mr: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 600, color: '#177386' }}>
                  Top 5 Tools Used
                </Typography>
              </Box>
              <Box sx={{ height: 350, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ width: '100%', height: '100%', maxWidth: 400, margin: 'auto' }}>
                  <Pie data={toolsChartData} options={toolsChartOptions} />
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PieCharts;
