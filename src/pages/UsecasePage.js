import React, { useState, useMemo } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import UsecaseList from '../components/UsecaseList';
import FilterSidebar from '../components/FilterSidebar';

const UsecasePage = ({ searchQuery, usecases }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    service_line: {},
    sdlc_phase: {},
    tools_used: {}
  });

  // Compute available filters and their counts
  const availableFilters = useMemo(() => {
    const filters = {
      service_line: {},
      sdlc_phase: {},
      tools_used: {}
    };

    usecases.forEach(usecase => {
      // Count industries
      if (usecase.service_line) {
        filters.service_line[usecase.service_line] = (filters.service_line[usecase.service_line] || 0) + 1;
      }

      // Count SDLC phases
      if (usecase.sdlc_phase) {
        filters.sdlc_phase[usecase.sdlc_phase] = (filters.sdlc_phase[usecase.sdlc_phase] || 0) + 1;
      }

      // Count tools
      usecase.tools_used?.forEach(tool => {
        filters.tools_used[tool] = (filters.tools_used[tool] || 0) + 1;
      });
    });

    return filters;
  }, [usecases]);

  // Filter use cases based on selected filters and search query
  const filteredUsecases = useMemo(() => {
    return usecases.filter(usecase => {
      // Check if any filters are selected
      const hasSelectedFilters = Object.values(selectedFilters).some(
        category => Object.values(category).some(isSelected => isSelected)
      );

      // Apply search filter
      const searchLower = searchQuery?.toLowerCase() || '';
      const searchMatch = !searchQuery || (
        usecase.usecase.toLowerCase().includes(searchLower) ||
        usecase.prompts_used.toLowerCase().includes(searchLower) ||
        usecase.service_line?.toLowerCase().includes(searchLower) ||
        usecase.sdlc_phase?.toLowerCase().includes(searchLower) ||
        usecase.tools_used?.some(tool => tool.toLowerCase().includes(searchLower))
      );

      // If no filters are selected, only apply search
      if (!hasSelectedFilters) return searchMatch;

      // Check industry filter
      const industryMatch = Object.keys(selectedFilters.service_line).length === 0 ||
        (usecase.service_line && selectedFilters.service_line[usecase.service_line]);

      // Check SDLC phase filter
      const sdlcMatch = Object.keys(selectedFilters.sdlc_phase).length === 0 ||
        (usecase.sdlc_phase && selectedFilters.sdlc_phase[usecase.sdlc_phase]);

      // Check tools filter
      const toolsMatch = Object.keys(selectedFilters.tools_used).length === 0 ||
        usecase.tools_used?.some(tool => selectedFilters.tools_used[tool]);

      return searchMatch && industryMatch && sdlcMatch && toolsMatch;
    });
  }, [usecases, selectedFilters, searchQuery]);

  const handleFilterChange = (newFilters) => {
    setSelectedFilters(newFilters);
  };

  return (
    <Box 
      sx={{ 
        width: '100%', 
        minHeight: '100vh', 
        bgcolor: 'grey.50',
        overflowX: 'hidden'
      }}
    >
      {/* Header */}
      <Box 
        sx={{ 
          width: '100%',
          bgcolor: 'white', 
          borderBottom: 1, 
          borderColor: 'grey.200',
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
        }}
      >
        <Box 
          sx={{ 
            maxWidth: '1920px', 
            mx: 'auto',
            px: { xs: 2, sm: 3, md: 4 },
            py: 3,
          }}
        >
          <Typography 
            variant="h4" 
            gutterBottom
            sx={{ 
              fontWeight: 600,
              color: 'text.primary'
            }}
          >
            AI Use Cases
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{ maxWidth: 800 }}
          >
            Explore our collection of AI use cases across different industries. 
            Each case demonstrates practical applications of AI technologies.
          </Typography>
        </Box>
      </Box>
      
      {/* Main Content */}
      <Box 
        sx={{ 
          maxWidth: '1920px', 
          mx: 'auto',
          px: { xs: 2, sm: 3, md: 4 }, 
          py: 4,
          boxSizing: 'border-box'
        }}
      >
        <Grid 
          container 
          spacing={4}
          sx={{ 
            minHeight: 'calc(100vh - 200px)',
            width: '100%',
            m: 0
          }}
        >
          {/* Sidebar */}
          <Grid item xs={12} md={3} lg={2.5} xl={2} sx={{ pl: 0 }}>
            <Box 
              sx={{ 
                position: 'sticky', 
                top: 24,
                maxHeight: 'calc(100vh - 48px)',
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                  width: '4px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'transparent',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'rgba(0,0,0,0.1)',
                  borderRadius: '2px',
                }
              }}
            >
              <FilterSidebar
                filters={availableFilters}
                selectedFilters={selectedFilters}
                onFilterChange={handleFilterChange}
              />
            </Box>
          </Grid>

          {/* Use Cases List */}
          <Grid item xs={12} md={9} lg={9.5} xl={10} sx={{ pl: { xs: 0, md: 4 } }}>
            <UsecaseList usecases={filteredUsecases} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default UsecasePage;
