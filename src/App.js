import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { 
  Box,
  AppBar, 
  Toolbar, 
  Typography, 
  Button,
  ThemeProvider,
  createTheme
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

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

function App() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

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
              <Toolbar sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
                <Typography 
                  variant="h6" 
                  component={Link} 
                  to="/" 
                  sx={{ 
                    flexGrow: 1, 
                    textDecoration: 'none', 
                    color: 'inherit',
                    '&:hover': {
                      color: 'rgba(255, 255, 255, 0.8)',
                    },
                  }}
                >
                  Gen AI Usecases Portal
                </Typography>
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
              <Route path="/" element={<HomePage />} />
              <Route path="/usecases" element={<UsecasePage />} />
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
