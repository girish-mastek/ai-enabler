import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Stack,
  Chip,
  Button
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';

const FilterSidebar = ({ filters, selectedFilters, onFilterChange }) => {
  const handleFilterChange = (category, value) => {
    const newFilters = {
      ...selectedFilters,
      [category]: {
        ...selectedFilters[category],
        [value]: !selectedFilters[category][value]
      }
    };
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      service_line: {},
      sdlc_phase: {},
      tools_used: {}
    };
    onFilterChange(clearedFilters);
  };

  const getSelectedCount = (category) => {
    return Object.values(selectedFilters[category]).filter(Boolean).length;
  };

  const hasSelectedFilters = Object.values(selectedFilters).some(
    category => Object.values(category).some(isSelected => isSelected)
  );

  // Define the order for service lines
  const serviceLineOrder = ['DE&E', 'Oracle', 'DA&AI', 'SFBU', 'CEMS'];

  // Define the order for SDLC phases
  const sdlcPhaseOrder = [
    'Discovery',
    'Design/Documentation',
    'Implementation/Development',
    'Testing',
    'Deployment',
    'Upgrade'
  ];

  // Sort service lines according to the defined order
  const sortedServiceLines = Object.entries(filters.service_line).sort(([a], [b]) => {
    const indexA = serviceLineOrder.indexOf(a);
    const indexB = serviceLineOrder.indexOf(b);
    if (indexA === -1 && indexB === -1) return 0;
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  // Sort SDLC phases according to the defined order
  const sortedSdlcPhases = Object.entries(filters.sdlc_phase).sort(([a], [b]) => {
    const indexA = sdlcPhaseOrder.indexOf(a);
    const indexB = sdlcPhaseOrder.indexOf(b);
    if (indexA === -1 && indexB === -1) return 0;
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  // Sort tools alphabetically
  const sortedTools = Object.entries(filters.tools_used).sort(([a], [b]) => 
    a.localeCompare(b)
  );

  const FilterChip = ({ label, count, selected, onClick }) => (
    <Chip
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <span>{label}</span>
          <Typography
            component="span"
            sx={{
              fontSize: '0.75rem',
              color: selected ? 'inherit' : 'text.secondary'
            }}
          >
            ({count})
          </Typography>
        </Box>
      }
      onClick={onClick}
      sx={{
        m: 0.5,
        borderRadius: '16px',
        height: '32px',
        bgcolor: selected ? 'primary.main' : 'grey.100',
        color: selected ? 'white' : 'text.primary',
        border: '1px solid',
        borderColor: selected ? 'primary.main' : 'grey.300',
        '&:hover': {
          bgcolor: selected ? 'primary.dark' : 'grey.200',
        },
        transition: 'all 0.2s ease-in-out',
        fontWeight: selected ? 500 : 400,
        fontSize: '0.8125rem'
      }}
    />
  );

  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: 'white',
        borderRadius: 1,
        border: '1px solid',
        borderColor: 'grey.200',
        overflow: 'hidden'
      }}
    >
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'grey.100' }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <FilterListIcon color="primary" sx={{ fontSize: '1.25rem' }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '0.9375rem', flexGrow: 1 }}>
            Filters
          </Typography>
          {hasSelectedFilters && (
            <Button
              startIcon={<FilterAltOffIcon />}
              onClick={handleClearFilters}
              size="small"
              sx={{
                fontSize: '0.75rem',
                textTransform: 'none',
                color: 'text.secondary',
                '&:hover': {
                  color: 'error.main',
                  bgcolor: 'error.lighter',
                }
              }}
            >
              Clear All
            </Button>
          )}
        </Stack>
      </Box>

      <Stack>
        <Accordion defaultExpanded disableGutters elevation={0}>
          <AccordionSummary 
            expandIcon={<ExpandMoreIcon sx={{ fontSize: '1.25rem' }} />}
            sx={{ 
              minHeight: 48,
              py: 0,
              px: 2,
              bgcolor: 'grey.50',
              '&:hover': { bgcolor: 'grey.100' }
            }}
          >
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
              Service Line
              {getSelectedCount('service_line') > 0 && (
                <Typography 
                  component="span" 
                  sx={{ 
                    ml: 1,
                    color: 'primary.main',
                    fontWeight: 'bold'
                  }}
                >
                  ({getSelectedCount('service_line')})
                </Typography>
              )}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 1 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', margin: -0.5 }}>
              {sortedServiceLines.map(([value, count]) => (
                <FilterChip
                  key={value}
                  label={value}
                  count={count}
                  selected={selectedFilters.service_line[value] || false}
                  onClick={() => handleFilterChange('service_line', value)}
                />
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>

        <Divider />

        <Accordion defaultExpanded disableGutters elevation={0}>
          <AccordionSummary 
            expandIcon={<ExpandMoreIcon sx={{ fontSize: '1.25rem' }} />}
            sx={{ 
              minHeight: 48,
              py: 0,
              px: 2,
              bgcolor: 'grey.50',
              '&:hover': { bgcolor: 'grey.100' }
            }}
          >
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
              Delivery Phase
              {getSelectedCount('sdlc_phase') > 0 && (
                <Typography 
                  component="span" 
                  sx={{ 
                    ml: 1,
                    color: 'primary.main',
                    fontWeight: 'bold'
                  }}
                >
                  ({getSelectedCount('sdlc_phase')})
                </Typography>
              )}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 1 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', margin: -0.5 }}>
              {sortedSdlcPhases.map(([value, count]) => (
                <FilterChip
                  key={value}
                  label={value}
                  count={count}
                  selected={selectedFilters.sdlc_phase[value] || false}
                  onClick={() => handleFilterChange('sdlc_phase', value)}
                />
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>

        <Divider />

        <Accordion defaultExpanded disableGutters elevation={0}>
          <AccordionSummary 
            expandIcon={<ExpandMoreIcon sx={{ fontSize: '1.25rem' }} />}
            sx={{ 
              minHeight: 48,
              py: 0,
              px: 2,
              bgcolor: 'grey.50',
              '&:hover': { bgcolor: 'grey.100' }
            }}
          >
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
              Tools Used
              {getSelectedCount('tools_used') > 0 && (
                <Typography 
                  component="span" 
                  sx={{ 
                    ml: 1,
                    color: 'primary.main',
                    fontWeight: 'bold'
                  }}
                >
                  ({getSelectedCount('tools_used')})
                </Typography>
              )}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 1 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', margin: -0.5 }}>
              {sortedTools.map(([value, count]) => (
                <FilterChip
                  key={value}
                  label={value}
                  count={count}
                  selected={selectedFilters.tools_used[value] || false}
                  onClick={() => handleFilterChange('tools_used', value)}
                />
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      </Stack>
    </Paper>
  );
};

export default FilterSidebar;
