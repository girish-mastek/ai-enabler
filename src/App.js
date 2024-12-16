import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { 
  Container, 
  AppBar, 
  Toolbar, 
  Typography, 
  Button,
  Box,
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
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    h1: {
      fontWeight: 500,
    },
    h2: {
      fontWeight: 500,
    },
    h3: {
      fontWeight: 500,
    },
    h4: {
      fontWeight: 500,
    },
  },
});

function App() {
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box sx={{ flexGrow: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <AppBar position="static" elevation={2}>
            <Toolbar>
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
                color="inherit" 
                startIcon={<AddIcon />}
                onClick={() => setIsAddDialogOpen(true)}
                sx={{ mr: 2 }}
              >
                Add Use Case
              </Button>
              <Button color="inherit" component={Link} to="/">Home</Button>
              <Button color="inherit" component={Link} to="/usecases">Usecases</Button>
              <Button color="inherit" component={Link} to="/admin">Admin</Button>
            </Toolbar>
          </AppBar>
          
          <Container sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/usecases" element={<UsecasePage />} />
              <Route path="/usecases/:id" element={<UsecaseDetail />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </Container>

          <Box 
            component="footer" 
            sx={{ 
              py: 3, 
              px: 2, 
              mt: 'auto',
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[200]
                  : theme.palette.grey[800],
            }}
          >
            <Container maxWidth="sm">
              <Typography variant="body2" color="text.secondary" align="center">
                © {new Date().getFullYear()} Gen AI Usecases Portal. All rights reserved.
              </Typography>
            </Container>
          </Box>

          <AddUsecaseForm
            open={isAddDialogOpen}
            onClose={() => setIsAddDialogOpen(false)}
            onSubmit={async (usecase) => {
              // In a real application, this would be an API call
              const response = await fetch('/api/usecases', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  ...usecase,
                  status: 'pending', // All new use cases start as pending
                  submittedAt: new Date().toISOString(),
                }),
              });
              if (response.ok) {
                setIsAddDialogOpen(false);
              }
            }}
          />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
