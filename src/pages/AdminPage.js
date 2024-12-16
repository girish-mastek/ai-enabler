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
  Alert,
  Snackbar
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const AdminPage = ({ usecases, onApprove, onReject }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [alert, setAlert] = useState(null);

  const pendingUsecases = usecases.filter(usecase => usecase.status === 'pending');
  const approvedUsecases = usecases.filter(usecase => usecase.status === 'approved');
  const rejectedUsecases = usecases.filter(usecase => usecase.status === 'rejected');

  const handleApprove = (id) => {
    onApprove(id);
    setAlert({
      severity: 'success',
      message: 'Use case approved successfully'
    });
  };

  const handleReject = (id) => {
    onReject(id);
    setAlert({
      severity: 'info',
      message: 'Use case rejected'
    });
  };

  const UseCaseTable = ({ usecases, showModeration = false }) => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Service Line</TableCell>
            <TableCell>SDLC Phase</TableCell>
            <TableCell>Tools</TableCell>
            <TableCell>Submitted At</TableCell>
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
                  label={usecase.service_line} 
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
              <TableCell>
                {new Date(usecase.submittedAt).toLocaleDateString()}
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

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs 
          value={activeTab} 
          onChange={(e, newValue) => setActiveTab(newValue)}
        >
          <Tab label={`Pending (${pendingUsecases.length})`} />
          <Tab label={`Approved (${approvedUsecases.length})`} />
          <Tab label={`Rejected (${rejectedUsecases.length})`} />
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

      {activeTab === 2 && (
        <>
          <Typography variant="h6" gutterBottom>
            Rejected Use Cases
          </Typography>
          {rejectedUsecases.length === 0 ? (
            <Alert severity="info">No rejected use cases</Alert>
          ) : (
            <UseCaseTable usecases={rejectedUsecases} />
          )}
        </>
      )}

      <Snackbar
        open={!!alert}
        autoHideDuration={6000}
        onClose={() => setAlert(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        {alert && (
          <Alert 
            onClose={() => setAlert(null)} 
            severity={alert.severity}
            sx={{ width: '100%' }}
          >
            {alert.message}
          </Alert>
        )}
      </Snackbar>
    </Container>
  );
};

export default AdminPage;
