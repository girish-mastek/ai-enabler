import React from 'react';
import { Typography, Button } from '@mui/material';

function AdminPanel() {
  return (
    <div>
      <Typography variant="h4">Admin Panel</Typography>
      <Button variant="contained" color="primary">Add New Usecase</Button>
    </div>
  );
}

export default AdminPanel;