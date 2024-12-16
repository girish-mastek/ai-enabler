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
  Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

// Import pages
import HomePage from './pages/HomePage';
import UsecasePage from './pages/UsecasePage';
import AdminPage from './pages/AdminPage';
import UsecaseDetail from './components/UsecaseDetail';
import AddUsecaseForm from './components/AddUsecaseForm';
import initialUsecases from './data/usecases.json';

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
      <Typography 
        variant="h6" 
        component={Link} 
        to="/" 
        sx={{ 
          flexGrow: 0, 
          textDecoration: 'none', 
          color: 'inherit',
          '&:hover': {
            color: 'rgba(255, 255, 255, 0.8)',
          },
          mr: 3
        }}
      >
        Mastek Gen AI Knowledge Portal
      </Typography>
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
  const [usecases, setUsecases] = useState(() => {
    const savedUsecases = localStorage.getItem('usecases');
    return savedUsecases ? JSON.parse(savedUsecases) : initialUsecases;
  });
  const [alert, setAlert] = useState(null);

  // Save usecases to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('usecases', JSON.stringify(usecases));
  }, [usecases]);

  const handleOpenDialog = () => {
    setIsAddDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsAddDialogOpen(false);
  };

  const handleAddUseCase = (usecase) => {
    const newUsecase = {
      ...usecase,
      status: 'pending',
      submittedAt: new Date().toISOString()
    };
    
    setUsecases(prevUsecases => [newUsecase, ...prevUsecases]);
    setAlert({
      severity: 'success',
      message: 'Use case submitted successfully'
    });
    handleCloseDialog();
  };

  const handleApproveUseCase = (id) => {
    setUsecases(prevUsecases => prevUsecases.map(usecase => 
      usecase.id === id 
        ? { 
            ...usecase, 
            status: 'approved',
            moderatedAt: new Date().toISOString()
          } 
        : usecase
    ));
    setAlert({
      severity: 'success',
      message: 'Use case approved successfully'
    });
  };

  const handleRejectUseCase = (id) => {
    setUsecases(prevUsecases => prevUsecases.map(usecase => 
      usecase.id === id 
        ? { 
            ...usecase, 
            status: 'rejected',
            moderatedAt: new Date().toISOString()
          } 
        : usecase
    ));
    setAlert({
      severity: 'info',
      message: 'Use case rejected'
    });
  };

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
