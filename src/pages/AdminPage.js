import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Stack,
  Tabs,
  Tab,
  Alert
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import usecases from '../data/usecases.json';

const AdminPage = () => {
  const [usecaseList, setUsecaseList] = useState(usecases);
  const [activeTab, setActiveTab] = useState(0);
  const [alert, setAlert] = useState(null);

  const pendingUsecases = usecaseList.filter(usecase => usecase.status === 'pending');
  const approvedUsecases = usecaseList.filter(usecase => usecase.status === 'approved');

  const handleApprove = (id) => {
    setUsecaseList(prev => prev.map(usecase => 
      usecase.id === id ? { ...usecase, status: 'approved' } : usecase
    ));
    setAlert({
      severity: 'success',
      message: 'Use case approved successfully'
    });
  };

  const handleReject = (id) => {
    setUsecaseList(prev => prev.map(usecase => 
      usecase.id === id ? { ...usecase, status: 'rejected' } : usecase
    ));
    setAlert({
      severity: 'info',
      message: 'Use case rejected'
    });
  };

  const handleDelete = (id) => {
    setUsecaseList(prev => prev.filter(usecase => usecase.id !== id));
    setAlert({
      severity: 'success',
      message: 'Use case deleted successfully'
    });
  };

  const UseCaseTable = ({ usecases, showModeration = false }) => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Industry</TableCell>
            <TableCell>SDLC Phase</TableCell>
            <TableCell>Tools</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usecases.map((usecase) => (
            <TableRow key={usecase.id}>
              <TableCell>{usecase.id}</TableCell>
              <TableCell>{usecase.title}</TableCell>
              <TableCell>
                <Chip 
                  label={usecase.industry} 
                  size="small" 
                  color="primary" 
                />
              </TableCell>
              <TableCell>
                <Chip 
                  label={usecase.sdlc_phase} 
                  size="small" 
                  color="secondary" 
                />
              </TableCell>
              <TableCell>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {usecase.tools_used?.map((tool, index) => (
                    <Chip
                      key={index}
                      label={tool}
                      size="small"
                      variant="outlined"
                      sx={{ mb: 0.5 }}
                    />
                  ))}
                </Stack>
              </TableCell>
              <TableCell align="right">
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                  {showModeration && (
                    <>
                      <Button
                        startIcon={<CheckCircleIcon />}
                        color="success"
                        onClick={() => handleApprove(usecase.id)}
                      >
                        Approve
                      </Button>
                      <Button
                        startIcon={<CancelIcon />}
                        color="error"
                        onClick={() => handleReject(usecase.id)}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  <Button
                    startIcon={<EditIcon />}
                    color="primary"
                  >
                    Edit
                  </Button>
                  <Button
                    startIcon={<DeleteIcon />}
                    color="error"
                    onClick={() => handleDelete(usecase.id)}
                  >
                    Delete
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Container>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Manage AI use cases and moderate submissions from users.
        </Typography>
      </Box>

      {alert && (
        <Alert 
          severity={alert.severity} 
          onClose={() => setAlert(null)}
          sx={{ mb: 3 }}
        >
          {alert.message}
        </Alert>
      )}

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={activeTab} 
          onChange={(e, newValue) => setActiveTab(newValue)}
        >
          <Tab label={`Pending (${pendingUsecases.length})`} />
          <Tab label={`Approved (${approvedUsecases.length})`} />
        </Tabs>
      </Box>

      {activeTab === 0 && (
        <>
          <Typography variant="h6" gutterBottom>
            Pending Use Cases
          </Typography>
          {pendingUsecases.length === 0 ? (
            <Alert severity="info">No pending use cases to review</Alert>
          ) : (
            <UseCaseTable usecases={pendingUsecases} showModeration={true} />
          )}
        </>
      )}

      {activeTab === 1 && (
        <>
          <Typography variant="h6" gutterBottom>
            Approved Use Cases
          </Typography>
          {approvedUsecases.length === 0 ? (
            <Alert severity="info">No approved use cases</Alert>
          ) : (
            <UseCaseTable usecases={approvedUsecases} />
          )}
        </>
      )}
    </Container>
  );
};

export default AdminPage;
