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
  Checkbox
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleToolsChange = (tool) => {
    setFormData(prev => ({
      ...prev,
      tools_used: prev.tools_used.includes(tool)
        ? prev.tools_used.filter(t => t !== tool)
        : [...prev.tools_used, tool]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUsecase = {
      ...formData,
      id: Date.now(), // Generate a temporary ID
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
              autoFocus
            />

            <TextField
              required
              fullWidth
              label="Project"
              name="project"
              value={formData.project}
              onChange={handleChange}
            />

            <TextField
              required
              fullWidth
              label="Prompts Used"
              name="prompts_used"
              value={formData.prompts_used}
              onChange={handleChange}
              multiline
              rows={4}
            />

            <FormControl fullWidth required>
              <InputLabel>Service Line</InputLabel>
              <Select
                name="service_line"
                value={formData.service_line}
                onChange={handleChange}
                label="Service Line"
              >
                {SERVICE_LINE.map((service_line) => (
                  <MenuItem key={service_line} value={service_line}>
                    {service_line}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth required>
              <InputLabel>SDLC Phase</InputLabel>
              <Select
                name="sdlc_phase"
                value={formData.sdlc_phase}
                onChange={handleChange}
                label="SDLC Phase"
              >
                {SDLC_PHASES.map((phase) => (
                  <MenuItem key={phase} value={phase}>
                    {phase}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth required>
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
            </FormControl>

            <TextField
              required
              fullWidth
              label="Estimated Efforts"
              name="estimated_efforts"
              value={formData.estimated_efforts}
              onChange={handleChange}
              placeholder="e.g., 40 hours"
            />

            <TextField
              required
              fullWidth
              label="Actual Hours"
              name="actual_hours"
              value={formData.actual_hours}
              onChange={handleChange}
              placeholder="e.g., 35 hours"
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
