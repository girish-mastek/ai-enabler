import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  FormControl,
  FormHelperText,
  Paper,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  IconButton,
  Tooltip,
  LinearProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TimerIcon from '@mui/icons-material/Timer';
import SpeedIcon from '@mui/icons-material/Speed';
import { useAuth } from '../context/AuthContext';

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
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  boxShadow: 'none',
  border: `1px solid ${theme.palette.divider}`
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  height: '32px',
  fontSize: '0.9rem',
  '& .MuiChip-label': {
    padding: '0 16px',
  }
}));

const StyledEfficiencyBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100px',
  position: 'relative',
  overflow: 'hidden'
}));

const EfficiencyProgress = styled(LinearProgress)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: '4px',
  backgroundColor: theme.palette.grey[200],
  '& .MuiLinearProgress-bar': {
    backgroundColor: (props) => props.value >= 0 ? theme.palette.success.main : theme.palette.error.main
  }
}));

const AddUsecaseForm = ({ open, onClose, onSubmit, usecase, isEdit }) => {
  const { user } = useAuth();
  const [customTools, setCustomTools] = useState(() => {
    const savedTools = localStorage.getItem('customTools');
    return savedTools ? JSON.parse(savedTools) : [];
  });
  const [newTool, setNewTool] = useState('');
  const [showNewToolInput, setShowNewToolInput] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [efficiencyPercentage, setEfficiencyPercentage] = useState(null);

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

  const TOOLS = [...DEFAULT_TOOLS.filter(tool => tool !== 'Others'), ...customTools, 'Others'];

  const calculateEfficiency = (estimated, actual) => {
    if (!estimated || !actual || actual === '0') return null;
    const est = parseFloat(estimated);
    const act = parseFloat(actual);
    if (est <= 0 || act <= 0) return null;
    return ((est/act - 1) * 100).toFixed(2);
  };

  useEffect(() => {
    const efficiency = calculateEfficiency(formData.estimated_efforts, formData.actual_hours);
    setEfficiencyPercentage(efficiency);
  }, [formData.estimated_efforts, formData.actual_hours]);

  const validateField = (name, value) => {
    switch (name) {
      case 'usecase':
        if (!value.trim()) return 'Usecase is required';
        if (value.length < 5) return 'Usecase must be at least 5 characters';
        if (value.length > 200) return 'Usecase must be less than 200 characters';
        return '';
      
      case 'project':
        if (!value.trim()) return 'Project is required';
        if (value.length < 3) return 'Project must be at least 3 characters';
        if (value.length > 100) return 'Project must be less than 100 characters';
        return '';

      case 'prompts_used':
        if (!value.trim()) return 'Prompts are required';
        if (value.length < 10) return 'Prompts must be at least 10 characters';
        if (value.length > 5000) return 'Prompts must be less than 5000 characters';
        return '';

      case 'service_line':
        if (!value) return 'Service line must be selected';
        return '';

      case 'sdlc_phase':
        if (!value) return 'Delivery phase must be selected';
        return '';

      case 'tools_used':
        if (!value || value.length === 0) return 'At least one tool must be selected';
        return '';

      case 'estimated_efforts':
        if (!value) return 'Estimated(in hours) is required';
        if (isNaN(value)) return 'Must be a number';
        if (value <= 0) return 'Must be greater than 0';
        return '';

      case 'actual_hours':
        if (!value) return 'Actual(in hours) is required';
        if (isNaN(value)) return 'Must be a number';
        if (value < 0) return 'Cannot be negative';
        return '';

      default:
        return '';
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

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setFocusedField(null);
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    setErrors(prev => ({
      ...prev,
      [name]: validateField(name, formData[name])
    }));
  };

  const handleServiceLineSelect = (value) => {
    setFormData(prev => ({
      ...prev,
      service_line: value
    }));
    setTouched(prev => ({
      ...prev,
      service_line: true
    }));
    setErrors(prev => ({
      ...prev,
      service_line: validateField('service_line', value)
    }));
  };

  const handleSDLCPhaseSelect = (value) => {
    setFormData(prev => ({
      ...prev,
      sdlc_phase: value
    }));
    setTouched(prev => ({
      ...prev,
      sdlc_phase: true
    }));
    setErrors(prev => ({
      ...prev,
      sdlc_phase: validateField('sdlc_phase', value)
    }));
  };

  const handleToolsChange = (event, newTools) => {
    setFormData(prev => ({
      ...prev,
      tools_used: newTools
    }));

    setTouched(prev => ({
      ...prev,
      tools_used: true
    }));

    setErrors(prev => ({
      ...prev,
      tools_used: validateField('tools_used', newTools)
    }));

    if (newTools.includes('Others') && !formData.tools_used.includes('Others')) {
      setShowNewToolInput(true);
    }
    else if (!newTools.includes('Others') && formData.tools_used.includes('Others')) {
      setShowNewToolInput(false);
      setNewTool('');
    }
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
      efficiency_percentage: efficiencyPercentage,
      ...(isEdit ? {
        id: usecase.id,
        userId: usecase.userId,
        submittedAt: usecase.submittedAt
      } : {
        id: Date.now(),
        userId: user.id,
        submittedAt: new Date().toLocaleDateString('en-GB')
      }),
      status: 'pending'
    };
    onSubmit(submitData);
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
    setShowNewToolInput(false);
    setNewTool('');
    setEfficiencyPercentage(null);
    onClose();
  };

  useEffect(() => {
    if (usecase && isEdit) {
      setFormData({
        usecase: usecase.usecase || '',
        prompts_used: usecase.prompts_used || '',
        service_line: usecase.service_line || '',
        sdlc_phase: usecase.sdlc_phase || '',
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
        service_line: '',
        sdlc_phase: '',
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

  return (
    <Dialog 
      open={open} 
      onClose={handleCancel}
      maxWidth={false}
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxHeight: '90vh',
          width: '100%',
          m: 0
        }
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 600, color: 'primary.main' }}>
          {isEdit ? 'Update Usecase' : 'Add Usecase'}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleCancel}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          {/* Basic Information Section */}
          <StyledSection>
            <Typography variant="subtitle1" gutterBottom sx={{ color: 'text.primary', mb: 2, fontWeight: 600 }}>
              Basic Information
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <TextField
                  required
                  fullWidth
                  label="Usecase Title"
                  name="usecase"
                  value={formData.usecase}
                  onChange={handleChange}
                  onFocus={() => handleFocus('usecase')}
                  onBlur={handleBlur}
                  error={touched.usecase && Boolean(errors.usecase)}
                  helperText={touched.usecase && errors.usecase}
                  autoFocus
                  variant="outlined"
                  size="small"
                  inputProps={{ maxLength: 200 }}
                />
                {focusedField === 'usecase' && (
                  <Typography variant="caption" color="textSecondary" sx={{ mt: 0.5, display: 'block' }}>
                    Characters: {formData.usecase.length}/200
                  </Typography>
                )}
              </Box>
              <Box sx={{ flex: 1 }}>
                <TextField
                  required
                  fullWidth
                  label="Project Name"
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                  onFocus={() => handleFocus('project')}
                  onBlur={handleBlur}
                  error={touched.project && Boolean(errors.project)}
                  helperText={touched.project && errors.project}
                  variant="outlined"
                  size="small"
                  inputProps={{ maxLength: 100 }}
                />
                {focusedField === 'project' && (
                  <Typography variant="caption" color="textSecondary" sx={{ mt: 0.5, display: 'block' }}>
                    Characters: {formData.project.length}/100
                  </Typography>
                )}
              </Box>
            </Box>
            {/* Service Line and Delivery Phase sections */}
            <FormControl 
                required
                error={touched.service_line && Boolean(errors.service_line)}
                component="fieldset"
                fullWidth
              >
                <Typography variant="body2" gutterBottom sx={{ color: 'text.primary', fontWeight: 500 }}>
                  Service Line
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {SERVICE_LINE.map((service) => (
                    <StyledChip
                      key={service}
                      label={service}
                      onClick={() => handleServiceLineSelect(service)}
                      color={formData.service_line === service ? "primary" : "default"}
                      variant={formData.service_line === service ? "filled" : "outlined"}
                    />
                  ))}
                </Box>
                {touched.service_line && errors.service_line && (
                  <FormHelperText error>{errors.service_line}</FormHelperText>
                )}
              </FormControl>

              <FormControl 
                required
                error={touched.sdlc_phase && Boolean(errors.sdlc_phase)}
                component="fieldset"
                fullWidth
              >
                <Typography variant="body2" gutterBottom sx={{ color: 'text.primary', fontWeight: 500 }}>
                Delivery Phase
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {SDLC_PHASES.map((phase) => (
                    <StyledChip
                      key={phase}
                      label={phase}
                      onClick={() => handleSDLCPhaseSelect(phase)}
                      color={formData.sdlc_phase === phase ? "primary" : "default"}
                      variant={formData.sdlc_phase === phase ? "filled" : "outlined"}
                    />
                  ))}
                </Box>
                {touched.sdlc_phase && errors.sdlc_phase && (
                  <FormHelperText error>{errors.sdlc_phase}</FormHelperText>
                )}
              </FormControl>
          </StyledSection>

          {/* Details Section */}
          <StyledSection>
            <Typography variant="subtitle1" gutterBottom sx={{ color: 'text.primary', mb: 2, fontWeight: 600 }}>
              Details
            </Typography>
            <Stack spacing={2}>
              <Box>
                <TextField
                  required
                  fullWidth
                  label="Prompts Used"
                  name="prompts_used"
                  value={formData.prompts_used}
                  onChange={handleChange}
                  onFocus={() => handleFocus('prompts_used')}
                  onBlur={handleBlur}
                  error={touched.prompts_used && Boolean(errors.prompts_used)}
                  helperText={touched.prompts_used && errors.prompts_used}
                  multiline
                  minRows={3}
                  maxRows={10}
                  variant="outlined"
                  size="small"
                  inputProps={{ maxLength: 5000 }}
                  sx={{
                    '& .MuiInputBase-root': {
                      height: 'auto',
                      '& textarea': {
                        resize: 'vertical',
                        minHeight: '24px',
                        maxHeight: '240px',
                      }
                    }
                  }}
                />
                {focusedField === 'prompts_used' && (
                  <Typography variant="caption" color="textSecondary" sx={{ mt: 0.5, display: 'block' }}>
                    Characters: {formData.prompts_used.length}/5000
                  </Typography>
                )}
              </Box>
            </Stack>
          </StyledSection>

          {/* Tools Section */}
          <StyledSection>
            <Typography variant="subtitle1" gutterBottom sx={{ color: 'text.primary', mb: 2, fontWeight: 600 }}>
              Tools Used
            </Typography>
            <FormControl 
              fullWidth 
              required
              error={touched.tools_used && Boolean(errors.tools_used)}
            >
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {TOOLS.map((tool) => (
                  <StyledChip
                    key={tool}
                    label={tool}
                    onClick={() => {
                      const newTools = formData.tools_used.includes(tool)
                        ? formData.tools_used.filter(t => t !== tool)
                        : [...formData.tools_used, tool];
                      handleToolsChange(null, newTools);
                    }}
                    color={formData.tools_used.includes(tool) ? "primary" : "default"}
                    variant={formData.tools_used.includes(tool) ? "filled" : "outlined"}
                  />
                ))}
              </Box>
              {touched.tools_used && errors.tools_used && (
                <FormHelperText error sx={{ mt: 1 }}>{errors.tools_used}</FormHelperText>
              )}
            </FormControl>

            {showNewToolInput && (
              <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                <TextField
                  size="small"
                  label="New Tool Name"
                  value={newTool}
                  onChange={(e) => setNewTool(e.target.value)}
                  placeholder="Enter new tool name"
                  sx={{ width: '300px' }}
                />
                <Button
                  variant="contained"
                  onClick={handleAddNewTool}
                  disabled={!newTool.trim()}
                  size="small"
                >
                  Save
                </Button>
              </Box>
            )}
          </StyledSection>

          {/* Effort Tracking Section */}
          <StyledSection>
            <Typography variant="subtitle1" gutterBottom sx={{ color: 'text.primary', mb: 3, fontWeight: 600 }}>
              Effort Tracking
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, alignItems: 'stretch' }}>
              <Box sx={{ flex: 1 }}>
                <Tooltip title="Enter the estimated time in hours for this usecase">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <AccessTimeIcon color="primary" fontSize="small" />
                    <Typography variant="body2" color="text.secondary">
                      Estimated Hours
                    </Typography>
                  </Box>
                </Tooltip>
                <TextField
                  required
                  fullWidth
                  name="estimated_efforts"
                  value={formData.estimated_efforts}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.estimated_efforts && Boolean(errors.estimated_efforts)}
                  helperText={touched.estimated_efforts && errors.estimated_efforts}
                  type="number"
                  variant="outlined"
                  size="small"
                  InputProps={{ 
                    inputProps: { min: 0 },
                    sx: { backgroundColor: 'background.paper' }
                  }}
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <Tooltip title="Enter the actual time spent in hours">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <TimerIcon color="primary" fontSize="small" />
                    <Typography variant="body2" color="text.secondary">
                      Actual Hours
                    </Typography>
                  </Box>
                </Tooltip>
                <TextField
                  required
                  fullWidth
                  name="actual_hours"
                  value={formData.actual_hours}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.actual_hours && Boolean(errors.actual_hours)}
                  helperText={touched.actual_hours && errors.actual_hours}
                  type="number"
                  variant="outlined"
                  size="small"
                  InputProps={{ 
                    inputProps: { min: 0 },
                    sx: { backgroundColor: 'background.paper' }
                  }}
                />
              </Box>

              <Box sx={{ flex: 1 }}>
                <Tooltip title="Efficiency = ((Estimated/Actual) - 1) × 100">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <SpeedIcon color="primary" fontSize="small" />
                    <Typography variant="body2" color="text.secondary">
                      Efficiency Gained
                    </Typography>
                  </Box>
                </Tooltip>
                <StyledEfficiencyBox>
                  <Typography 
                    variant="h4" 
                    color={efficiencyPercentage > 0 ? 'success.main' : efficiencyPercentage < 0 ? 'error.main' : 'text.primary'}
                    sx={{ fontWeight: 600, mb: 1 }}
                  >
                    {efficiencyPercentage !== null ? `${efficiencyPercentage}%` : '-'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {efficiencyPercentage > 0 ? 'Time Saved' : efficiencyPercentage < 0 ? 'Time Exceeded' : 'No Data'}
                  </Typography>
                  {efficiencyPercentage !== null && (
                    <EfficiencyProgress 
                      variant="determinate" 
                      value={Math.min(Math.abs(efficiencyPercentage), 100)}
                    />
                  )}
                </StyledEfficiencyBox>
              </Box>
            </Box>
          </StyledSection>

          {/* Additional Comments Section */}
          <StyledSection>
            <Typography variant="subtitle1" gutterBottom sx={{ color: 'text.primary', mb: 2, fontWeight: 600 }}>
              Additional Comments
            </Typography>
            <Box>
              <TextField
                fullWidth
                label="Comments"
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                onFocus={() => handleFocus('comments')}
                onBlur={handleBlur}
                multiline
                minRows={2}
                maxRows={10}
                variant="outlined"
                size="small"
                placeholder="Add any additional comments or notes about this usecase"
                inputProps={{ maxLength: 500 }}
                sx={{
                  '& .MuiInputBase-root': {
                    height: 'auto',
                    '& textarea': {
                      resize: 'vertical',
                      minHeight: '24px',
                      maxHeight: '240px',
                    }
                  }
                }}
              />
              {focusedField === 'comments' && (
                <Typography variant="caption" color="textSecondary" sx={{ mt: 0.5, display: 'block' }}>
                  Characters: {formData.comments.length}/500
                </Typography>
              )}
            </Box>
          </StyledSection>
        </Box>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ p: 2 }}>
        <Button 
          onClick={handleCancel}
          variant="outlined"
          size="small"
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
          size="small"
          sx={{ 
            minWidth: 100,
            fontWeight: 600
          }}
        >
          {isEdit ? 'Update Usecase' : 'Add Usecase'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUsecaseForm;
