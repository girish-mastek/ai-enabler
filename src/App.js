import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { 
  Box,
  AppBar, 
  Toolbar, 
  Typography, 
  Button,
  ThemeProvider,
  createTheme,
  TextField,
  InputAdornment,
  IconButton,
  Container,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

// Import pages
import HomePage from './pages/HomePage';
import UsecasePage from './pages/UsecasePage';
import AdminPage from './pages/AdminPage';
import UsecaseDetail from './components/UsecaseDetail';
import AddUsecaseForm from './components/AddUsecaseForm';
import * as api from './services/api';

// Theme configuration
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      50: '#e3f2fd',
      100: '#bbdefb',
    },
    secondary: {
      main: '#dc004e',
      50: '#fce4ec',
      100: '#f8bbd0',
    },
  },
  components: {
    MuiBox: {
      styleOverrides: {
        root: {
          boxSizing: 'border-box'
        }
      }
    }
  }
});

// Separate component for the navigation bar to use hooks
function NavigationBar({ searchQuery, setSearchQuery, handleOpenDialog }) {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    if (searchQuery.trim()) {
      navigate('/usecases');
    }
  };

  return (
    <Toolbar sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
      <Box
        component={Link}
        to="/"
        sx={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
          mr: 3,
          '&:hover': {
            opacity: 0.8
          }
        }}
      >
        <img
          src="/logo-2022.png"
          alt="Mastek Logo"
          style={{
            height: '40px',
            width: 'auto'
          }}
        />
      </Box>
      <TextField
        size="small"
        placeholder="Search usecases..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{
          flexGrow: 1,
          mr: 2,
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.25)',
            },
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.3)',
            },
          },
          '& .MuiOutlinedInput-input': {
            color: 'white',
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton 
                onClick={handleSearchClick}
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.7)',
                  '&:hover': {
                    color: 'white',
                  }
                }}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        onKeyPress={(e) => {
          if (e.key === 'Enter' && searchQuery.trim()) {
            handleSearchClick();
          }
        }}
      />
      <Button
        variant="contained"
        color="secondary"
        startIcon={<AddIcon />}
        onClick={handleOpenDialog}
        sx={{ 
          mr: 2,
          '&:hover': {
            bgcolor: 'secondary.dark',
          }
        }}
      >
        Add Use Case
      </Button>
      <Button color="inherit" component={Link} to="/">Home</Button>
      <Button color="inherit" component={Link} to="/usecases">Usecases</Button>
      <Button color="inherit" component={Link} to="/admin">Admin</Button>
    </Toolbar>
  );
}

function App() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [usecases, setUsecases] = useState([]);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsecases();
  }, []);

  const loadUsecases = async () => {
    try {
      setLoading(true);
      const data = await api.getAllUseCases();
      setUsecases(data);
    } catch (error) {
      setAlert({
        severity: 'error',
        message: 'Failed to load use cases'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = () => {
    setIsAddDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsAddDialogOpen(false);
  };

  const handleAddUseCase = async (usecase) => {
    try {
      const newUsecase = await api.addUseCase(usecase);
      setUsecases(prevUsecases => [newUsecase, ...prevUsecases]);
      setAlert({
        severity: 'success',
        message: 'Use case submitted successfully'
      });
      handleCloseDialog();
    } catch (error) {
      setAlert({
        severity: 'error',
        message: 'Failed to add use case'
      });
    }
  };

  const handleApproveUseCase = async (id) => {
    try {
      const updatedUsecase = await api.updateUseCaseStatus(id, 'approved');
      setUsecases(prevUsecases => prevUsecases.map(usecase => 
        usecase.id === id ? updatedUsecase : usecase
      ));
      setAlert({
        severity: 'success',
        message: 'Use case approved successfully'
      });
    } catch (error) {
      setAlert({
        severity: 'error',
        message: 'Failed to approve use case'
      });
    }
  };

  const handleRejectUseCase = async (id) => {
    try {
      const updatedUsecase = await api.updateUseCaseStatus(id, 'rejected');
      setUsecases(prevUsecases => prevUsecases.map(usecase => 
        usecase.id === id ? updatedUsecase : usecase
      ));
      setAlert({
        severity: 'info',
        message: 'Use case rejected'
      });
    } catch (error) {
      setAlert({
        severity: 'error',
        message: 'Failed to reject use case'
      });
    }
  };

  const handleDeleteUseCase = async (id) => {
    try {
      await api.deleteUseCase(id);
      setUsecases(prevUsecases => prevUsecases.filter(usecase => usecase.id !== id));
      setAlert({
        severity: 'success',
        message: 'Use case deleted successfully'
      });
    } catch (error) {
      setAlert({
        severity: 'error',
        message: 'Failed to delete use case'
      });
    }
  };

  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh' 
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Container 
          disableGutters 
          maxWidth={false}
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            minHeight: '100vh',
            width: '100%',
            overflowX: 'hidden'
          }}
        >
          <AppBar 
            position="static" 
            elevation={0} 
            sx={{ 
              borderBottom: 1, 
              borderColor: 'grey.200',
              width: '100%'
            }}
          >
            <Box sx={{ width: '100%', maxWidth: '1920px', mx: 'auto' }}>
              <NavigationBar 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleOpenDialog={handleOpenDialog}
              />
            </Box>
          </AppBar>
          
          <Box 
            component="main" 
            sx={{ 
              flexGrow: 1,
              width: '100%',
              overflowX: 'hidden'
            }}
          >
            <Routes>
              <Route path="/" element={<HomePage searchQuery={searchQuery} />} />
              <Route 
                path="/usecases" 
                element={
                  <UsecasePage 
                    searchQuery={searchQuery} 
                    usecases={usecases}
                  />
                } 
              />
              <Route 
                path="/usecases/:id" 
                element={
                  <UsecaseDetail 
                    usecases={usecases}
                  />
                } 
              />
              <Route 
                path="/admin" 
                element={
                  <AdminPage 
                    usecases={usecases}
                    onApprove={handleApproveUseCase}
                    onReject={handleRejectUseCase}
                    onDelete={handleDeleteUseCase}
                  />
                } 
              />
            </Routes>
          </Box>
        </Container>

        {/* Dialog rendered outside the main container */}
        <AddUsecaseForm
          open={isAddDialogOpen}
          onClose={handleCloseDialog}
          onSubmit={handleAddUseCase}
        />

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
      </Router>
    </ThemeProvider>
  );
}

export default App;
