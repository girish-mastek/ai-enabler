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
  DialogActions
} from '@mui/material';

const SERVICE_LINE = [
  'Oracle',
  'Data',
  'Engineering',
  'Salesforce',
];

const SDLC_PHASES = [
  'Planning',
  'Development',
  'Testing',
  'Production',
  'Maintenance'
];

const TOOLS = [
  'ChatGPT',
  'Langchain',
  'Microsoft Copilot',
  'Github Copilot',
  'Streamlit',
  'Hugging Face',
  'TensorFlow',
  'PyTorch'
];

const AddUsecaseForm = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    usecase: '',
    prompts_used: '',
    service_line: '',
    sdlc_phase: '',
    tools_used: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMultiSelect = (event, field) => {
    const {
      target: { value },
    } = event;
    setFormData(prev => ({
      ...prev,
      [field]: typeof value === 'string' ? value.split(',') : value,
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
      tools_used: []
    });
  };

  const handleCancel = () => {
    setFormData({
      usecase: '',
      prompts_used: '',
      service_line: '',
      sdlc_phase: '',
      tools_used: []
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
          Add New Use Case
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
              <InputLabel>Tools Used</InputLabel>
              <Select
                multiple
                name="tools_used"
                value={formData.tools_used}
                onChange={(e) => handleMultiSelect(e, 'tools_used')}
                label="Tools Used"
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {TOOLS.map((tool) => (
                  <MenuItem key={tool} value={tool}>
                    {tool}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
          Add Use Case
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUsecaseForm;
