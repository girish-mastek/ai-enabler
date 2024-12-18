import React from 'react';
import {
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
  Box,
  Container
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import users from '../data/user.json';
import usecases from '../data/usecases.json';

function AdminPanel() {
  const findUser = (userId) => {
    return users.find(user => user.id === userId) || { firstname: 'Unknown', lastname: 'User' };
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>Admin Panel</Typography>
        <Button 
          variant="contained" 
          sx={{ 
            textTransform: 'none',
            px: 3,
            py: 1,
            bgcolor: 'white',
            color: '#177386',
            '&:hover': {
              bgcolor: '#177386',
              color: 'white'
            }
          }}
        >
          Add New Usecase
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ 
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'grey.200'
      }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'grey.50' }}>
              <TableCell sx={{ fontWeight: 600 }}>Usecase</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Submitted By</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Service Line</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Delivery Phase</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Submitted At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usecases.map((usecase) => {
              const submitter = findUser(usecase.userId);
              return (
                <TableRow key={usecase.id} hover>
                  <TableCell>{usecase.usecase}</TableCell>
                  <TableCell>
                    <Chip
                      icon={<PersonIcon sx={{ fontSize: '16px' }} />}
                      label={`${submitter.firstname} ${submitter.lastname}`}
                      size="small"
                      sx={{
                        bgcolor: '#E8F5E9',
                        color: '#2E7D32',
                        border: '1px solid #C8E6C9',
                        '& .MuiChip-label': { px: 1 }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={usecase.service_line}
                      size="small"
                      sx={{
                        bgcolor: '#F3E5F5',
                        color: '#7B1FA2',
                        border: '1px solid #E1BEE7',
                        '& .MuiChip-label': { px: 1 }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={usecase.sdlc_phase}
                      size="small"
                      sx={{
                        bgcolor: '#E0F2F1',
                        color: '#00796B',
                        border: '1px solid #B2DFDB',
                        '& .MuiChip-label': { px: 1 }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={usecase.status}
                      size="small"
                      sx={{
                        bgcolor: usecase.status === 'pending' ? '#FFF3E0' : '#E8F5E9',
                        color: usecase.status === 'pending' ? '#E65100' : '#2E7D32',
                        border: '1px solid',
                        borderColor: usecase.status === 'pending' ? '#FFE0B2' : '#C8E6C9',
                        textTransform: 'capitalize',
                        '& .MuiChip-label': { px: 1 }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(usecase.submittedAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default AdminPanel;
