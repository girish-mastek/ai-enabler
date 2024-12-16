import React, { useState } from 'react';
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
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

// Import pages
import HomePage from './pages/HomePage';
import UsecasePage from './pages/UsecasePage';
import AdminPage from './pages/AdminPage';
import UsecaseDetail from './components/UsecaseDetail';
import AddUsecaseForm from './components/AddUsecaseForm';

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

  const handleOpenDialog = () => {
    console.log('Opening dialog...');
    setIsAddDialogOpen(true);
  };

  const handleCloseDialog = () => {
    console.log('Closing dialog...');
    setIsAddDialogOpen(false);
  };

  const handleAddUseCase = (usecase) => {
    console.log('Adding new usecase:', usecase);
    // In a real application, this would be an API call
    handleCloseDialog();
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box 
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
              <Route path="/usecases" element={<UsecasePage searchQuery={searchQuery} />} />
              <Route path="/usecases/:id" element={<UsecaseDetail />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </Box>

          <AddUsecaseForm
            open={isAddDialogOpen}
            onClose={handleCloseDialog}
            onSubmit={handleAddUseCase}
          />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
