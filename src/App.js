import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UsecasePage from './pages/UsecasePage';
import AdminPage from './pages/AdminPage';
import UsecaseDetail from './components/UsecaseDetail';
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

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" elevation={2}>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Gen AI Usecases Portal
              </Typography>
              <Button color="inherit" component={Link} to="/">Home</Button>
              <Button color="inherit" component={Link} to="/usecases">Usecases</Button>
              <Button color="inherit" component={Link} to="/admin">Admin</Button>
            </Toolbar>
          </AppBar>
          <Container sx={{ mt: 4, mb: 4 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/usecases" element={<UsecasePage />} />
              <Route path="/usecases/:id" element={<UsecaseDetail />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
