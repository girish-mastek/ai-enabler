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
  Chip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterListIcon from '@mui/icons-material/FilterList';
import CancelIcon from '@mui/icons-material/Cancel';

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

  const getSelectedCount = (category) => {
    return Object.values(selectedFilters[category]).filter(Boolean).length;
  };

  // Format category name for display
  const formatCategoryName = (category) => {
    return category.split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Get selected filters for display
  const getSelectedFilters = () => {
    const selected = [];
    Object.entries(selectedFilters).forEach(([category, values]) => {
      Object.entries(values).forEach(([value, isSelected]) => {
        if (isSelected) {
          selected.push({
            category,
            categoryDisplay: formatCategoryName(category),
            value
          });
        }
      });
    });
    return selected;
  };

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
          <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '0.9375rem' }}>
            Filters
          </Typography>
        </Stack>
      </Box>

      {/* Selected Filters Display */}
      {getSelectedFilters().length > 0 && (
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'grey.100' }}>
          <Typography 
            variant="subtitle2" 
            sx={{ 
              mb: 1.5,
              fontSize: '0.875rem',
              fontWeight: 500,
              color: 'text.secondary'
            }}
          >
            Selected Filters
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {getSelectedFilters().map(({ category, categoryDisplay, value }) => (
              <Chip
                key={`${category}-${value}`}
                label={`${categoryDisplay}: ${value}`}
                onDelete={() => handleFilterChange(category, value)}
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
        </Box>
      )}

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
              {Object.entries(filters.service_line).map(([value, count]) => (
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
              SDLC Phase
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
              {Object.entries(filters.sdlc_phase).map(([value, count]) => (
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
              {Object.entries(filters.tools_used).map(([value, count]) => (
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
