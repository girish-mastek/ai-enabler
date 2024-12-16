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

const INDUSTRIES = [
  'Technology',
  'Finance',
  'Customer Service',
  'E-commerce',
  'Manufacturing',
  'Marketing',
  'Healthcare',
  'Education',
  'Retail'
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

const BUSINESS_IMPACTS = [
  'Cost Reduction',
  'Employee Productivity',
  'Customer Experience',
  'Revenue Growth',
  'Risk Management & Compliance',
  'Innovation & Competitive Advantage',
  'Product & Service Quality',
  'Operational Efficiency',
  'Development Velocity'
];

const AddUsecaseForm = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    industry: '',
    sdlc_phase: '',
    project_link: '',
    tools_used: [],
    business_impact: [],
    media: []
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
      title: '',
      description: '',
      industry: '',
      sdlc_phase: '',
      project_link: '',
      tools_used: [],
      business_impact: [],
      media: []
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
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
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />

            <TextField
              required
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={4}
            />

            <FormControl fullWidth required>
              <InputLabel>Industry</InputLabel>
              <Select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                label="Industry"
              >
                {INDUSTRIES.map((industry) => (
                  <MenuItem key={industry} value={industry}>
                    {industry}
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

            <FormControl fullWidth required>
              <InputLabel>Business Impact</InputLabel>
              <Select
                multiple
                name="business_impact"
                value={formData.business_impact}
                onChange={(e) => handleMultiSelect(e, 'business_impact')}
                label="Business Impact"
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {BUSINESS_IMPACTS.map((impact) => (
                  <MenuItem key={impact} value={impact}>
                    {impact}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Project Link"
              name="project_link"
              value={formData.project_link}
              onChange={handleChange}
              placeholder="https://example.com/project"
            />
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
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
