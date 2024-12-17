import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  Paper,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const SERVICE_LINE = [
  'DE&E',
  'DA&AI',
  'SFBU',
  'Oracle',
  'CEMS',
];

const SDLC_PHASES = [
  'Discovery',
  'Design/Documentation',
  'Deployment',
  'Implementation/Development',
  'Testing',
  'Upgrade'
];

const DEFAULT_TOOLS = [
  'Gemini',
  'Microsoft Copilot',
  'Github Copilot',
  'Amazon Q',
  'GPT-4',
  'AI Amigo',
  'Others'
];

const StyledSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  boxShadow: 'none',
  border: `1px solid ${theme.palette.divider}`
}));

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  margin: theme.spacing(0.5),
  border: `1px solid ${theme.palette.primary.main}`,
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

const StyledFormGroup = styled(FormGroup)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  '& .MuiFormControlLabel-root': {
    margin: 0,
    marginRight: theme.spacing(1),
    '& .MuiCheckbox-root': {
      padding: theme.spacing(0.5),
    },
    '& .MuiTypography-root': {
      fontSize: '0.875rem',
      color: theme.palette.text.secondary,
    },
    '&:hover': {
      '& .MuiTypography-root': {
        color: theme.palette.text.primary,
      },
    },
    '&.Mui-checked': {
      '& .MuiTypography-root': {
        color: theme.palette.text.primary,
        fontWeight: 500,
      },
    },
  },
}));

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  '&:not(.Mui-checked)': {
    color: theme.palette.text.disabled,
  },
  '&.Mui-checked': {
    '& + .MuiFormControlLabel-label': {
      color: theme.palette.text.primary,
      fontWeight: 500,
    },
  },
}));

const AddUsecaseForm = ({ open, onClose, onSubmit, usecase, isEdit }) => {
  const [customTools, setCustomTools] = useState(() => {
    const savedTools = localStorage.getItem('customTools');
    return savedTools ? JSON.parse(savedTools) : [];
  });
  const [newTool, setNewTool] = useState('');
  const [showNewToolInput, setShowNewToolInput] = useState(false);

  const [formData, setFormData] = useState({
    usecase: '',
    prompts_used: '',
    service_line: [],
    sdlc_phase: [],
    tools_used: [],
    project: '',
    estimated_efforts: '',
    actual_hours: '',
    comments: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const TOOLS = [...DEFAULT_TOOLS.filter(tool => tool !== 'Others'), ...customTools, 'Others'];

  useEffect(() => {
    if (usecase && isEdit) {
      setFormData({
        usecase: usecase.usecase || '',
        prompts_used: usecase.prompts_used || '',
        service_line: Array.isArray(usecase.service_line) ? usecase.service_line : [usecase.service_line],
        sdlc_phase: Array.isArray(usecase.sdlc_phase) ? usecase.sdlc_phase : [usecase.sdlc_phase],
        tools_used: usecase.tools_used || [],
        project: usecase.project || '',
        estimated_efforts: usecase.estimated_efforts || '',
        actual_hours: usecase.actual_hours || '',
        comments: usecase.comments || ''
      });
    } else {
      setFormData({
        usecase: '',
        prompts_used: '',
        service_line: [],
        sdlc_phase: [],
        tools_used: [],
        project: '',
        estimated_efforts: '',
        actual_hours: '',
        comments: ''
      });
    }
    setErrors({});
    setTouched({});
  }, [usecase, isEdit, open]);

  const validateField = (name, value) => {
    switch (name) {
      case 'usecase':
        if (!value.trim()) return 'Use case is required';
        if (value.length < 5) return 'Use case must be at least 5 characters';
        if (value.length > 200) return 'Use case must be less than 200 characters';
        return '';
      
      case 'project':
        if (!value.trim()) return 'Project is required';
        if (value.length < 3) return 'Project must be at least 3 characters';
        if (value.length > 100) return 'Project must be less than 100 characters';
        return '';

      case 'prompts_used':
        if (!value.trim()) return 'Prompts are required';
        if (value.length < 10) return 'Prompts must be at least 10 characters';
        if (value.length > 1000) return 'Prompts must be less than 1000 characters';
        return '';

      case 'service_line':
        if (!value || value.length === 0) return 'At least one service line must be selected';
        return '';

      case 'sdlc_phase':
        if (!value || value.length === 0) return 'At least one SDLC phase must be selected';
        return '';

      case 'tools_used':
        if (!value || value.length === 0) return 'At least one tool must be selected';
        return '';

      case 'estimated_efforts':
        if (!value) return 'Estimated efforts is required';
        if (isNaN(value)) return 'Must be a number';
        if (value <= 0) return 'Must be greater than 0';
        return '';

      case 'actual_hours':
        if (!value) return 'Actual hours is required';
        if (isNaN(value)) return 'Must be a number';
        if (value < 0) return 'Cannot be negative';
        return '';

      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (touched[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: validateField(name, value)
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    setErrors(prev => ({
      ...prev,
      [name]: validateField(name, formData[name])
    }));
  };

  const handleCheckboxChange = (field) => (event) => {
    const value = event.target.name;
    setFormData(prev => ({
      ...prev,
      [field]: event.target.checked
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }));

    setTouched(prev => ({
      ...prev,
      [field]: true
    }));

    setErrors(prev => ({
      ...prev,
      [field]: validateField(field, 
        event.target.checked 
          ? [...formData[field], value]
          : formData[field].filter(item => item !== value)
      )
    }));
  };

  const handleToolsChange = (event, newTools) => {
    if (newTools.includes('Others') && !formData.tools_used.includes('Others')) {
      setShowNewToolInput(true);
    }
    else if (!newTools.includes('Others') && formData.tools_used.includes('Others')) {
      setShowNewToolInput(false);
      setNewTool('');
    }

    setFormData(prev => ({
      ...prev,
      tools_used: newTools
    }));

    setErrors(prev => ({
      ...prev,
      tools_used: validateField('tools_used', newTools)
    }));
  };

  const handleAddNewTool = () => {
    if (newTool.trim()) {
      const updatedCustomTools = [...customTools, newTool.trim()];
      setCustomTools(updatedCustomTools);
      localStorage.setItem('customTools', JSON.stringify(updatedCustomTools));
      
      setFormData(prev => ({
        ...prev,
        tools_used: [...prev.tools_used.filter(tool => tool !== 'Others'), newTool.trim()]
      }));
      
      setNewTool('');
      setShowNewToolInput(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const touchedFields = {};
    Object.keys(formData).forEach(key => {
      touchedFields[key] = true;
    });
    setTouched(touchedFields);

    if (!validateForm()) {
      return;
    }

    const submitData = {
      ...formData,
      id: usecase?.id || Date.now(),
    };
    onSubmit(submitData);
  };

  const handleCancel = () => {
    setFormData({
      usecase: '',
      prompts_used: '',
      service_line: [],
      sdlc_phase: [],
      tools_used: [],
      project: '',
      estimated_efforts: '',
      actual_hours: '',
      comments: ''
    });
    setErrors({});
    setTouched({});
    setShowNewToolInput(false);
    setNewTool('');
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleCancel}
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxHeight: '90vh'
        }
      }}
    >
      <DialogTitle>
        <Typography variant="h5" component="div" sx={{ fontWeight: 600, color: 'primary.main' }}>
          {isEdit ? 'Update Use Case' : 'Add New Use Case'}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          {/* Basic Information Section */}
          <StyledSection>
            <Typography variant="h6" gutterBottom sx={{ color: 'text.primary', mb: 2 }}>
              Basic Information
            </Typography>
            <Stack spacing={3}>
              <TextField
                required
                fullWidth
                label="Use Case Title"
                name="usecase"
                value={formData.usecase}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.usecase && Boolean(errors.usecase)}
                helperText={touched.usecase && errors.usecase}
                autoFocus
                variant="outlined"
              />

              <TextField
                required
                fullWidth
                label="Project Name"
                name="project"
                value={formData.project}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.project && Boolean(errors.project)}
                helperText={touched.project && errors.project}
                variant="outlined"
              />
            </Stack>
          </StyledSection>

          {/* Details Section */}
          <StyledSection>
            <Typography variant="h6" gutterBottom sx={{ color: 'text.primary', mb: 2 }}>
              Details
            </Typography>
            <Stack spacing={3}>
              <TextField
                required
                fullWidth
                label="Prompts Used"
                name="prompts_used"
                value={formData.prompts_used}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.prompts_used && Boolean(errors.prompts_used)}
                helperText={touched.prompts_used && errors.prompts_used}
                multiline
                rows={4}
                variant="outlined"
              />

              <FormControl 
                required
                error={touched.service_line && Boolean(errors.service_line)}
                component="fieldset"
              >
                <Typography variant="subtitle1" gutterBottom sx={{ color: 'text.primary', fontSize: '0.875rem' }}>
                  Service Line
                </Typography>
                <StyledFormGroup>
                  {SERVICE_LINE.map((service) => (
                    <FormControlLabel
                      key={service}
                      control={
                        <StyledCheckbox
                          checked={formData.service_line.includes(service)}
                          onChange={handleCheckboxChange('service_line')}
                          name={service}
                          size="small"
                        />
                      }
                      label={service}
                    />
                  ))}
                </StyledFormGroup>
                {touched.service_line && errors.service_line && (
                  <FormHelperText error>{errors.service_line}</FormHelperText>
                )}
              </FormControl>

              <FormControl 
                required
                error={touched.sdlc_phase && Boolean(errors.sdlc_phase)}
                component="fieldset"
              >
                <Typography variant="subtitle1" gutterBottom sx={{ color: 'text.primary', fontSize: '0.875rem' }}>
                  SDLC Phase
                </Typography>
                <StyledFormGroup>
                  {SDLC_PHASES.map((phase) => (
                    <FormControlLabel
                      key={phase}
                      control={
                        <StyledCheckbox
                          checked={formData.sdlc_phase.includes(phase)}
                          onChange={handleCheckboxChange('sdlc_phase')}
                          name={phase}
                          size="small"
                        />
                      }
                      label={phase}
                    />
                  ))}
                </StyledFormGroup>
                {touched.sdlc_phase && errors.sdlc_phase && (
                  <FormHelperText error>{errors.sdlc_phase}</FormHelperText>
                )}
              </FormControl>
            </Stack>
          </StyledSection>

          {/* Tools Section */}
          <StyledSection>
            <Typography variant="h6" gutterBottom sx={{ color: 'text.primary', mb: 2 }}>
              Tools Used
            </Typography>
            <FormControl 
              fullWidth 
              required
              error={touched.tools_used && Boolean(errors.tools_used)}
            >
              <ToggleButtonGroup
                value={formData.tools_used}
                onChange={handleToolsChange}
                aria-label="tools used"
                multiple
                sx={{ flexWrap: 'wrap', justifyContent: 'center' }}
              >
                {TOOLS.map((tool) => (
                  <StyledToggleButton key={tool} value={tool} aria-label={tool}>
                    {tool}
                  </StyledToggleButton>
                ))}
              </ToggleButtonGroup>
              {touched.tools_used && errors.tools_used && (
                <FormHelperText error sx={{ mt: 1 }}>{errors.tools_used}</FormHelperText>
              )}
            </FormControl>

            {showNewToolInput && (
              <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="New Tool Name"
                  value={newTool}
                  onChange={(e) => setNewTool(e.target.value)}
                  placeholder="Enter new tool name"
                />
                <Button
                  variant="contained"
                  onClick={handleAddNewTool}
                  disabled={!newTool.trim()}
                >
                  Save
                </Button>
              </Box>
            )}
          </StyledSection>

          {/* Effort Tracking Section */}
          <StyledSection>
            <Typography variant="h6" gutterBottom sx={{ color: 'text.primary', mb: 2 }}>
              Effort Tracking
            </Typography>
            <Stack spacing={3}>
              <TextField
                required
                fullWidth
                label="Estimated Efforts (hours)"
                name="estimated_efforts"
                value={formData.estimated_efforts}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.estimated_efforts && Boolean(errors.estimated_efforts)}
                helperText={touched.estimated_efforts && errors.estimated_efforts}
                type="number"
                variant="outlined"
                InputProps={{ inputProps: { min: 0 } }}
              />

              <TextField
                required
                fullWidth
                label="Actual Hours"
                name="actual_hours"
                value={formData.actual_hours}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.actual_hours && Boolean(errors.actual_hours)}
                helperText={touched.actual_hours && errors.actual_hours}
                type="number"
                variant="outlined"
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Stack>
          </StyledSection>

          {/* Additional Comments Section */}
          <StyledSection>
            <Typography variant="h6" gutterBottom sx={{ color: 'text.primary', mb: 2 }}>
              Additional Comments
            </Typography>
            <TextField
              fullWidth
              label="Comments"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              multiline
              rows={3}
              variant="outlined"
              placeholder="Add any additional comments or notes about this use case"
            />
          </StyledSection>
        </Box>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ p: 2.5 }}>
        <Button 
          onClick={handleCancel}
          variant="outlined"
          sx={{ 
            minWidth: 100,
            mr: 1
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit}
          variant="contained"
          sx={{ 
            minWidth: 100,
            fontWeight: 600
          }}
        >
          {isEdit ? 'Update Use Case' : 'Add Use Case'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUsecaseForm;
