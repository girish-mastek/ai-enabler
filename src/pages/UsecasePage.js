import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Typography, Grid, FormControl, Select, MenuItem, InputLabel, Stack, Chip } from '@mui/material';
import UsecaseList from '../components/UsecaseList';
import FilterSidebar from '../components/FilterSidebar';
import CancelIcon from '@mui/icons-material/Cancel';

const UsecasePage = ({ searchQuery, usecases }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedFilters, setSelectedFilters] = useState({
    service_line: {},
    sdlc_phase: {},
    tools_used: {}
  });
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest');

  // Initialize filters from URL params on mount
  useEffect(() => {
    const filtersFromUrl = {
      service_line: {},
      sdlc_phase: {},
      tools_used: {}
    };

    // Parse service_line filters
    const serviceLines = searchParams.get('service_line')?.split(' ') || [];
    serviceLines.forEach(line => {
      if (line) filtersFromUrl.service_line[line] = true;
    });

    // Parse sdlc_phase filters
    const phases = searchParams.get('sdlc_phase')?.split(' ') || [];
    phases.forEach(phase => {
      if (phase) filtersFromUrl.sdlc_phase[phase] = true;
    });

    // Parse tools_used filters
    const tools = searchParams.get('tools_used')?.split(' ') || [];
    tools.forEach(tool => {
      if (tool) filtersFromUrl.tools_used[tool] = true;
    });

    // Only update if there are filters in the URL
    if (serviceLines.length > 0 || phases.length > 0 || tools.length > 0) {
      setSelectedFilters(filtersFromUrl);
    }
  }, []);

  // Get selected filters for display
  const getSelectedFilters = () => {
    const selected = [];
    Object.entries(selectedFilters).forEach(([category, values]) => {
      Object.entries(values).forEach(([value, isSelected]) => {
        if (isSelected) {
          selected.push({
            category,
            value
          });
        }
      });
    });
    return selected;
  };

  // Helper function to handle tools_used field which could be string or array
  const getToolsArray = (tools) => {
    if (!tools) return [];
    if (Array.isArray(tools)) return tools;
    if (typeof tools === 'string' && tools.trim() !== '') return [tools];
    return [];
  };

  // Helper function to handle service_line field which could be string or array
  const getServiceLineArray = (serviceLine) => {
    if (!serviceLine) return [];
    if (Array.isArray(serviceLine)) return serviceLine;
    if (typeof serviceLine === 'string' && serviceLine.trim() !== '') return [serviceLine];
    return [];
  };

  // Compute available filters and their counts
  const availableFilters = useMemo(() => {
    const filters = {
      service_line: {},
      sdlc_phase: {},
      tools_used: {}
    };

    // Only count approved usecases for filters
    usecases.filter(usecase => usecase.status === 'approved').forEach(usecase => {
      // Count service lines
      const serviceLines = getServiceLineArray(usecase.service_line);
      serviceLines.forEach(line => {
        if (line) {
          filters.service_line[line] = (filters.service_line[line] || 0) + 1;
        }
      });

      // Count SDLC phases
      const phases = Array.isArray(usecase.sdlc_phase) ? usecase.sdlc_phase : [usecase.sdlc_phase];
      phases.forEach(phase => {
        if (phase) {
          filters.sdlc_phase[phase] = (filters.sdlc_phase[phase] || 0) + 1;
        }
      });

      // Count tools
      const toolsArray = getToolsArray(usecase.tools_used);
      toolsArray.forEach(tool => {
        if (tool) {
          filters.tools_used[tool] = (filters.tools_used[tool] || 0) + 1;
        }
      });
    });

    return filters;
  }, [usecases]);

  // Filter and sort use cases
  const filteredAndSortedUsecases = useMemo(() => {
    // First filter the usecases
    const filtered = usecases.filter(usecase => {
      // First check if usecase is approved
      if (usecase.status !== 'approved') return false;

      // Check if any filters are selected
      const hasSelectedFilters = Object.values(selectedFilters).some(
        category => Object.values(category).some(isSelected => isSelected)
      );

      // Apply search filter
      const searchLower = searchQuery?.toLowerCase() || '';
      const toolsArray = getToolsArray(usecase.tools_used);
      const serviceLines = getServiceLineArray(usecase.service_line);
      const phases = Array.isArray(usecase.sdlc_phase) ? usecase.sdlc_phase : [usecase.sdlc_phase];

      const searchMatch = !searchQuery || (
        usecase.usecase.toLowerCase().includes(searchLower) ||
        (usecase.prompts_used && usecase.prompts_used.toLowerCase().includes(searchLower)) ||
        serviceLines.some(line => line && line.toLowerCase().includes(searchLower)) ||
        phases.some(phase => phase && phase.toLowerCase().includes(searchLower)) ||
        toolsArray.some(tool => tool && tool.toLowerCase().includes(searchLower))
      );

      // If no filters are selected, only apply search
      if (!hasSelectedFilters) return searchMatch;

      // Check service line filter
      const serviceLineMatch = Object.keys(selectedFilters.service_line).length === 0 ||
        serviceLines.some(line => line && selectedFilters.service_line[line]);

      // Check SDLC phase filter
      const sdlcMatch = Object.keys(selectedFilters.sdlc_phase).length === 0 ||
        phases.some(phase => phase && selectedFilters.sdlc_phase[phase]);

      // Check tools filter
      const toolsMatch = Object.keys(selectedFilters.tools_used).length === 0 ||
        toolsArray.some(tool => tool && selectedFilters.tools_used[tool]);

      return searchMatch && serviceLineMatch && sdlcMatch && toolsMatch;
    });

    // Then sort the filtered results
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.submittedAt || 0) - new Date(a.submittedAt || 0);
        case 'oldest':
          return new Date(a.submittedAt || 0) - new Date(b.submittedAt || 0);
        case 'a-z':
          return (a.usecase || '').localeCompare(b.usecase || '');
        case 'z-a':
          return (b.usecase || '').localeCompare(a.usecase || '');
        default:
          return 0;
      }
    });
  }, [usecases, selectedFilters, searchQuery, sortBy]);

  // Update URL params when filters change
  const updateUrlParams = (filters, sort) => {
    const params = new URLSearchParams();

    // Add sort parameter
    if (sort && sort !== 'newest') {
      params.append('sort', sort);
    }

    // Add filter parameters
    Object.entries(filters).forEach(([category, values]) => {
      const selectedValues = Object.entries(values)
        .filter(([_, isSelected]) => isSelected)
        .map(([value]) => value);
      
      if (selectedValues.length > 0) {
        params.append(category, selectedValues.join(' '));
      }
    });

    setSearchParams(params);
  };

  const handleFilterChange = (newFilters) => {
    // Remove any false values from the filters
    const cleanedFilters = Object.keys(newFilters).reduce((acc, category) => {
      acc[category] = Object.entries(newFilters[category])
        .filter(([_, value]) => value)
        .reduce((obj, [key, value]) => {
          obj[key] = value;
          return obj;
        }, {});
      return acc;
    }, {
      service_line: {},
      sdlc_phase: {},
      tools_used: {}
    });

    setSelectedFilters(cleanedFilters);
    updateUrlParams(cleanedFilters, sortBy);
  };

  const handleSortChange = (event) => {
    const newSortBy = event.target.value;
    setSortBy(newSortBy);
    updateUrlParams(selectedFilters, newSortBy);
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
      {/* Main Content */}
      <Box 
        sx={{ 
          maxWidth: '1920px', 
          mx: 'auto',
          py: 4,
          boxSizing: 'border-box'
        }}
      >
        <Grid 
          container 
          spacing={3}
          sx={{ 
            minHeight: 'calc(100vh - 200px)',
            width: '100%',
            m: 0
          }}
        >
          {/* Sidebar */}
          <Grid item xs={12} md={3} lg={2.5} xl={2} sx={{ pl: { xs: 2, sm: 2 } }}>
            <Box 
              sx={{ 
                position: 'sticky', 
                top: 24,
                maxHeight: 'calc(100vh - 48px)',
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
          <Grid item xs={12} md={9} lg={9.5} xl={10} sx={{ px: { xs: 2, sm: 2 } }}>
            {/* Sort Controls and Selected Filters */}
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={2} 
              alignItems={{ xs: 'flex-start', sm: 'center' }}
              sx={{ mb: 3 }}
            >
              <FormControl 
                size="small"
                sx={{ 
                  minWidth: 200,
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'white',
                    '&:hover': {
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'primary.main',
                      },
                    },
                  },
                }}
              >
                <InputLabel id="sort-select-label">Sort By</InputLabel>
                <Select
                  labelId="sort-select-label"
                  id="sort-select"
                  value={sortBy}
                  label="Sort By"
                  onChange={handleSortChange}
                >
                  <MenuItem value="newest">Newest First</MenuItem>
                  <MenuItem value="oldest">Oldest First</MenuItem>
                  <MenuItem value="a-z">Alphabetically (A to Z)</MenuItem>
                  <MenuItem value="z-a">Alphabetically (Z to A)</MenuItem>
                </Select>
              </FormControl>

              {/* Selected Filters */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
                {getSelectedFilters().map(({ category, value }) => (
                  <Chip
                    key={`${category}-${value}`}
                    label={value}
                    onDelete={() => {
                      const newFilters = {
                        ...selectedFilters,
                        [category]: {
                          ...selectedFilters[category],
                          [value]: false
                        }
                      };
                      handleFilterChange(newFilters);
                    }}
                    deleteIcon={<CancelIcon />}
                    size="small"
                    sx={{
                      bgcolor: 'primary.50',
                      color: 'primary.main',
                      fontWeight: 500,
                      '& .MuiChip-deleteIcon': {
                        color: 'primary.main',
                        '&:hover': {
                          color: 'primary.dark',
                        },
                      },
                    }}
                  />
                ))}
              </Box>
            </Stack>
            
            <UsecaseList usecases={filteredAndSortedUsecases} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default UsecasePage;
