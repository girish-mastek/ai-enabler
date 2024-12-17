import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
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
  Snackbar,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';

const AdminPage = ({ usecases, onApprove, onReject, onDelete, onEdit }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [alert, setAlert] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null });

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

  const handleDeleteClick = (id) => {
    setDeleteConfirm({ open: true, id });
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirm.id) {
      onDelete(deleteConfirm.id);
      setDeleteConfirm({ open: false, id: null });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm({ open: false, id: null });
  };

  const handleView = (id) => {
    navigate(`/usecases/${id}`);
  };

  const handleEdit = (usecase) => {
    onEdit(usecase);
  };

  const truncateText = (text, maxLength = 100) => {
    if (text && text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text || '';
  };

  const UseCaseTable = ({ usecases, showModeration = false }) => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Use Case</TableCell>
            <TableCell>Project</TableCell>
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
              <TableCell>
                <Tooltip title={usecase.usecase || ''}>
                  <Typography variant="body2">
                    {truncateText(usecase.usecase, 30)}
                  </Typography>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip title={usecase.project || ''}>
                  <Typography variant="body2">
                    {truncateText(usecase.project, 30)}
                  </Typography>
                </Tooltip>
              </TableCell>
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
                  <Button
                    startIcon={<VisibilityIcon />}
                    color="info"
                    onClick={() => handleView(usecase.id)}
                  >
                    View
                  </Button>
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
                    onClick={() => handleEdit(usecase)}
                  >
                    Edit
                  </Button>
                  <Button
                    startIcon={<DeleteIcon />}
                    color="error"
                    onClick={() => handleDeleteClick(usecase.id)}
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
    <Box sx={{ p: 3, width: '100%' }}>
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

      <Dialog
        open={deleteConfirm.open}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this use case? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

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
    </Box>
  );
};

export default AdminPage;