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
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import LoginIcon from '@mui/icons-material/Login';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

// Import pages and components
import HomePage from './pages/HomePage';
import UsecasePage from './pages/UsecasePage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import MyAccountPage from './pages/MyAccountPage';
import UsecaseDetail from './components/UsecaseDetail';
import AddUsecaseForm from './components/AddUsecaseForm';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider, useAuth } from './context/AuthContext';
import * as api from './services/api';

// Theme configuration
const theme = createTheme({
  palette: {
    primary: {
      main: '#177386',
      50: '#e3f2fd',
      100: '#bbdefb',
    },
    secondary: {
      main: '#dc004e',
      50: '#fce4ec',
      100: '#f8bbd0',
    },
    mastek: {
      main: '#177386'
    },
    masteklight: {
      main: '#fff'
    }
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
  const { user, logout, isAuthorized } = useAuth();

  const handleSearchClick = () => {
    if (searchQuery.trim()) {
      navigate('/usecases');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
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
      {user && (
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{ 
            mr: 2,
            bgcolor: 'white',
            color: '#177386',
            '&:hover': {
              bgcolor: '#e6f3f7',
              color: '#177386'
            }
          }}
        >
          Add Usecase
        </Button>
      )}
      <Button 
        color="inherit" 
        component={Link} 
        to="/usecases"
        startIcon={<AutoStoriesIcon />}
      >
        Usecases
      </Button>
      {user && (
        <Button 
          color="inherit" 
          component={Link} 
          to="/my-account"
          startIcon={<AccountCircleIcon />}
        >
          My Account
        </Button>
      )}
      {isAuthorized() && (
        <Button 
          color="inherit" 
          component={Link} 
          to="/admin"
          startIcon={<AdminPanelSettingsIcon />}
        >
          Admin
        </Button>
      )}
      {user ? (
        <Button 
          color="inherit" 
          onClick={handleLogout}
          startIcon={<LogoutIcon />}
        >
          Logout
        </Button>
      ) : (
        <Button 
          color="inherit" 
          component={Link} 
          to="/login"
          startIcon={<LoginIcon />}
        >
          Login
        </Button>
      )}
    </Toolbar>
  );
}

function AppContent() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [usecases, setUsecases] = useState([]);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingUsecase, setEditingUsecase] = useState(null);

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
        message: 'Failed to load usecases'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (usecase = null) => {
    setEditingUsecase(usecase);
    setIsAddDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsAddDialogOpen(false);
    setEditingUsecase(null);
  };

  const handleAddUseCase = async (usecase) => {
    try {
      let updatedUsecase;
      if (editingUsecase) {
        // Update existing usecase
        updatedUsecase = await api.updateUseCase(editingUsecase.id, usecase);
        setUsecases(prevUsecases => prevUsecases.map(uc => 
          uc.id === editingUsecase.id ? updatedUsecase : uc
        ));
        setAlert({
          severity: 'success',
          message: 'Usecase updated successfully'
        });
      } else {
        // Add new usecase
        updatedUsecase = await api.addUseCase(usecase);
        setUsecases(prevUsecases => [updatedUsecase, ...prevUsecases]);
        setAlert({
          severity: 'success',
          message: 'Usecase submitted successfully'
        });
      }
      handleCloseDialog();
    } catch (error) {
      setAlert({
        severity: 'error',
        message: editingUsecase ? 'Failed to update usecase' : 'Failed to add usecase'
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
        message: 'Usecase approved successfully'
      });
    } catch (error) {
      setAlert({
        severity: 'error',
        message: 'Failed to approve usecase'
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
        message: 'Usecase rejected'
      });
    } catch (error) {
      setAlert({
        severity: 'error',
        message: 'Failed to reject usecase'
      });
    }
  };

  const handleDeleteUseCase = async (id) => {
    try {
      await api.deleteUseCase(id);
      setUsecases(prevUsecases => prevUsecases.filter(usecase => usecase.id !== id));
      setAlert({
        severity: 'success',
        message: 'Usecase deleted successfully'
      });
    } catch (error) {
      setAlert({
        severity: 'error',
        message: 'Failed to delete usecase'
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
            handleOpenDialog={() => handleOpenDialog()}
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
          <Route path="/login" element={<LoginPage />} />
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
              <ProtectedRoute>
                <AdminPage 
                  usecases={usecases}
                  onApprove={handleApproveUseCase}
                  onReject={handleRejectUseCase}
                  onDelete={handleDeleteUseCase}
                  onEdit={handleOpenDialog}
                />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/my-account" 
            element={
              <ProtectedRoute>
                <MyAccountPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Box>

      {/* Dialog rendered outside the main container */}
      <AddUsecaseForm
        open={isAddDialogOpen}
        onClose={handleCloseDialog}
        onSubmit={handleAddUseCase}
        usecase={editingUsecase}
        isEdit={!!editingUsecase}
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
    </Container>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;