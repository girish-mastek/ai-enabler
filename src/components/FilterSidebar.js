import React from 'react';
import {
  Box,
  Paper,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Stack
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterListIcon from '@mui/icons-material/FilterList';

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
              Industry
              {getSelectedCount('industry') > 0 && (
                <Typography 
                  component="span" 
                  sx={{ 
                    ml: 1,
                    color: 'primary.main',
                    fontWeight: 'bold'
                  }}
                >
                  ({getSelectedCount('industry')})
                </Typography>
              )}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 1.5 }}>
            <FormGroup>
              {Object.entries(filters.industry).map(([value, count]) => (
                <FormControlLabel
                  key={value}
                  control={
                    <Checkbox
                      size="small"
                      checked={selectedFilters.industry[value] || false}
                      onChange={() => handleFilterChange('industry', value)}
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      width: '100%',
                      fontSize: '0.8125rem'
                    }}>
                      {value}
                      <Typography 
                        component="span" 
                        color="text.secondary"
                        sx={{ fontSize: '0.8125rem' }}
                      >
                        ({count})
                      </Typography>
                    </Typography>
                  }
                  sx={{ py: 0.25 }}
                />
              ))}
            </FormGroup>
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
          <AccordionDetails sx={{ p: 1.5 }}>
            <FormGroup>
              {Object.entries(filters.sdlc_phase).map(([value, count]) => (
                <FormControlLabel
                  key={value}
                  control={
                    <Checkbox
                      size="small"
                      checked={selectedFilters.sdlc_phase[value] || false}
                      onChange={() => handleFilterChange('sdlc_phase', value)}
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      width: '100%',
                      fontSize: '0.8125rem'
                    }}>
                      {value}
                      <Typography 
                        component="span" 
                        color="text.secondary"
                        sx={{ fontSize: '0.8125rem' }}
                      >
                        ({count})
                      </Typography>
                    </Typography>
                  }
                  sx={{ py: 0.25 }}
                />
              ))}
            </FormGroup>
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
          <AccordionDetails sx={{ p: 1.5 }}>
            <FormGroup>
              {Object.entries(filters.tools_used).map(([value, count]) => (
                <FormControlLabel
                  key={value}
                  control={
                    <Checkbox
                      size="small"
                      checked={selectedFilters.tools_used[value] || false}
                      onChange={() => handleFilterChange('tools_used', value)}
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      width: '100%',
                      fontSize: '0.8125rem'
                    }}>
                      {value}
                      <Typography 
                        component="span" 
                        color="text.secondary"
                        sx={{ fontSize: '0.8125rem' }}
                      >
                        ({count})
                      </Typography>
                    </Typography>
                  }
                  sx={{ py: 0.25 }}
                />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </Stack>
    </Paper>
  );
};

export default FilterSidebar;
