import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import usecases from '../data/usecases.json';
import {
  Container,
  Typography,
  Paper,
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
  Tabs,
  Tab,
  Alert,
  Button,
  Tooltip,
  Grid,
  Avatar,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import BadgeIcon from '@mui/icons-material/Badge';
import EmailIcon from '@mui/icons-material/Email';
import { useNavigate } from 'react-router-dom';

const MyAccountPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  // Filter usecases for the current user
  const userUsecases = usecases.filter(usecase => usecase.userId === user?.id);
  const pendingUsecases = userUsecases.filter(usecase => usecase.status === 'pending');
  const approvedUsecases = userUsecases.filter(usecase => usecase.status === 'approved');
  const rejectedUsecases = userUsecases.filter(usecase => usecase.status === 'rejected');

  const handleView = (id) => {
    navigate(`/usecases/${id}`);
  };

  const handleEdit = (usecase) => {
    // Handle edit action
    navigate(`/usecases/edit/${usecase.id}`);
  };

  const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  const tableCellStyles = {
    padding: '16px',
  };

  const UseCaseTable = ({ usecases }) => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={tableCellStyles}>Use Case</TableCell>
            <TableCell sx={tableCellStyles}>Project</TableCell>
            <TableCell sx={tableCellStyles}>Service Line</TableCell>
            <TableCell sx={tableCellStyles}>Delivery Phase</TableCell>
            <TableCell sx={tableCellStyles}>Tools</TableCell>
            <TableCell sx={tableCellStyles}>Submitted At</TableCell>
            <TableCell align="center" sx={tableCellStyles}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usecases.map((usecase) => (
            <TableRow 
              key={usecase.id}
              onClick={(e) => {
                if (!e.target.closest('.actions-cell')) {
                  handleView(usecase.id);
                }
              }}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              <TableCell sx={tableCellStyles}>
                <Tooltip title={usecase.usecase || ''}>
                  <Typography variant="body2">
                    {truncateText(usecase.usecase, 30)}
                  </Typography>
                </Tooltip>
              </TableCell>
              <TableCell sx={tableCellStyles}>
                <Tooltip title={usecase.project || ''}>
                  <Typography variant="body2">
                    {truncateText(usecase.project, 30)}
                  </Typography>
                </Tooltip>
              </TableCell>
              <TableCell sx={tableCellStyles}>
                <Chip 
                  label={usecase.service_line || 'N/A'} 
                  size="small" 
                  color="primary" 
                />
              </TableCell>
              <TableCell sx={tableCellStyles}>
                <Chip 
                  label={usecase.sdlc_phase || 'N/A'} 
                  size="small" 
                  color="secondary" 
                />
              </TableCell>
              <TableCell sx={tableCellStyles}>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {Array.isArray(usecase.tools_used) && usecase.tools_used.map((tool, index) => (
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
              <TableCell sx={tableCellStyles}>
                {usecase.submittedAt ? new Date(usecase.submittedAt).toLocaleDateString() : 'N/A'}
              </TableCell>
              <TableCell align="center" className="actions-cell" sx={tableCellStyles}>
                <Stack direction="row" spacing={1} justifyContent="center">
                  <Button
                    startIcon={<EditIcon />}
                    color="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(usecase);
                    }}
                  >
                    Edit
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
    <Container maxWidth={false} sx={{ mt: 4, mb: 4, px: 4 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          mb: 4,
          background: 'linear-gradient(145deg, #ffffff 0%, #f5f7fa 100%)',
          borderRadius: '16px',
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: '#177386',
                fontSize: '2rem',
              }}
            >
              {user?.firstname?.[0]}{user?.lastname?.[0]}
            </Avatar>
          </Grid>
          <Grid item xs>
            <Box sx={{ mb: 3 }}>
              <Typography 
                variant="h3" 
                sx={{ 
                  mb: 2, 
                  fontWeight: 600,
                  color: '#177386'
                }}
              >
                Welcome, {user?.firstname || ''} {user?.lastname || ''}
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm="auto">
                  <Stack direction="row" spacing={1} alignItems="center">
                    <BadgeIcon sx={{ color: '#177386' }} />
                    <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                      {user?.employee_id || 'N/A'}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm="auto">
                  <Stack direction="row" spacing={1} alignItems="center">
                    <EmailIcon sx={{ color: '#177386' }} />
                    <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                      {user?.email || 'N/A'}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ width: '100%' }}>
        <Typography 
          variant="h5" 
          gutterBottom
          sx={{ 
            color: '#177386',
            fontWeight: 600,
            mb: 2
          }}
        >
          My Usecases
        </Typography>

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
            {pendingUsecases.length === 0 ? (
              <Alert severity="info">No pending use cases</Alert>
            ) : (
              <UseCaseTable usecases={pendingUsecases} />
            )}
          </>
        )}

        {activeTab === 1 && (
          <>
            {approvedUsecases.length === 0 ? (
              <Alert severity="info">No approved use cases</Alert>
            ) : (
              <UseCaseTable usecases={approvedUsecases} />
            )}
          </>
        )}

        {activeTab === 2 && (
          <>
            {rejectedUsecases.length === 0 ? (
              <Alert severity="info">No rejected use cases</Alert>
            ) : (
              <UseCaseTable usecases={rejectedUsecases} />
            )}
          </>
        )}
      </Box>
    </Container>
  );
};

export default MyAccountPage;
