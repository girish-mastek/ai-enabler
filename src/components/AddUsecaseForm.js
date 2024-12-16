import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Chip,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormHelperText
} from '@mui/material';

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

const TOOLS = [
  'Gemini',
  'Microsoft Copilot',
  'Github Copilot',
  'Amazon Q',
  'GPT-4',
  'Others',
  'AI Amigo'
];

const AddUsecaseForm = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    usecase: '',
    prompts_used: '',
    service_line: '',
    sdlc_phase: '',
    tools_used: [],
    project: '',
    estimated_efforts: '',
    actual_hours: '',
    comments: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

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
        if (!value) return 'Service line is required';
        return '';

      case 'sdlc_phase':
        if (!value) return 'SDLC phase is required';
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
    
    // Validate on change if field was touched
    if (touched[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: validateField(name, value)
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    setErrors(prev => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  };

  const handleToolsChange = (tool) => {
    const newToolsUsed = formData.tools_used.includes(tool)
      ? formData.tools_used.filter(t => t !== tool)
      : [...formData.tools_used, tool];

    setFormData(prev => ({
      ...prev,
      tools_used: newToolsUsed
    }));

    setErrors(prev => ({
      ...prev,
      tools_used: validateField('tools_used', newToolsUsed)
    }));
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
    
    // Mark all fields as touched
    const touchedFields = {};
    Object.keys(formData).forEach(key => {
      touchedFields[key] = true;
    });
    setTouched(touchedFields);

    if (!validateForm()) {
      return;
    }

    const newUsecase = {
      ...formData,
      id: Date.now(),
    };
    onSubmit(newUsecase);
    setFormData({
      usecase: '',
      prompts_used: '',
      service_line: '',
      sdlc_phase: '',
      tools_used: [],
      project: '',
      estimated_efforts: '',
      actual_hours: '',
      comments: ''
    });
    setErrors({});
    setTouched({});
  };

  const handleCancel = () => {
    setFormData({
      usecase: '',
      prompts_used: '',
      service_line: '',
      sdlc_phase: '',
      tools_used: [],
      project: '',
      estimated_efforts: '',
      actual_hours: '',
      comments: ''
    });
    setErrors({});
    setTouched({});
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleCancel}
      maxWidth="md" 
      fullWidth
      aria-labelledby="add-usecase-dialog-title"
      disablePortal={false}
      keepMounted={false}
    >
      <DialogTitle id="add-usecase-dialog-title">
        <Typography variant="h5" component="div">
          Add Usecase
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Stack spacing={3}>
            <TextField
              required
              fullWidth
              label="Use Case"
              name="usecase"
              value={formData.usecase}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.usecase && Boolean(errors.usecase)}
              helperText={touched.usecase && errors.usecase}
              autoFocus
            />

            <TextField
              required
              fullWidth
              label="Project"
              name="project"
              value={formData.project}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.project && Boolean(errors.project)}
              helperText={touched.project && errors.project}
            />

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
            />

            <FormControl 
              fullWidth 
              required
              error={touched.service_line && Boolean(errors.service_line)}
            >
              <InputLabel>Service Line</InputLabel>
              <Select
                name="service_line"
                value={formData.service_line}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Service Line"
              >
                {SERVICE_LINE.map((service_line) => (
                  <MenuItem key={service_line} value={service_line}>
                    {service_line}
                  </MenuItem>
                ))}
              </Select>
              {touched.service_line && errors.service_line && (
                <FormHelperText>{errors.service_line}</FormHelperText>
              )}
            </FormControl>

            <FormControl 
              fullWidth 
              required
              error={touched.sdlc_phase && Boolean(errors.sdlc_phase)}
            >
              <InputLabel>SDLC Phase</InputLabel>
              <Select
                name="sdlc_phase"
                value={formData.sdlc_phase}
                onChange={handleChange}
                onBlur={handleBlur}
                label="SDLC Phase"
              >
                {SDLC_PHASES.map((phase) => (
                  <MenuItem key={phase} value={phase}>
                    {phase}
                  </MenuItem>
                ))}
              </Select>
              {touched.sdlc_phase && errors.sdlc_phase && (
                <FormHelperText>{errors.sdlc_phase}</FormHelperText>
              )}
            </FormControl>

            <FormControl 
              fullWidth 
              required
              error={touched.tools_used && Boolean(errors.tools_used)}
            >
              <Typography variant="body1" sx={{ mb: 1 }}>Tools Used</Typography>
              <FormGroup>
                {TOOLS.map((tool) => (
                  <FormControlLabel
                    key={tool}
                    control={
                      <Checkbox
                        checked={formData.tools_used.includes(tool)}
                        onChange={() => handleToolsChange(tool)}
                      />
                    }
                    label={tool}
                  />
                ))}
              </FormGroup>
              {touched.tools_used && errors.tools_used && (
                <FormHelperText error>{errors.tools_used}</FormHelperText>
              )}
            </FormControl>

            <TextField
              required
              fullWidth
              label="Estimated Efforts"
              name="estimated_efforts"
              value={formData.estimated_efforts}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.estimated_efforts && Boolean(errors.estimated_efforts)}
              helperText={touched.estimated_efforts && errors.estimated_efforts}
              placeholder="Enter number of hours"
              type="number"
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
              placeholder="Enter number of hours"
              type="number"
            />

            <TextField
              fullWidth
              label="Comments"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              multiline
              rows={2}
              placeholder="Add any additional comments or notes"
            />
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button 
          variant="contained" 
          onClick={handleSubmit}
          color="primary"
        >
          Add Usecase
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUsecaseForm;
