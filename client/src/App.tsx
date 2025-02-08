import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreateUrlPage from './pages/CreateUrlPage';
import UrlListPage from './pages/UrlListPage';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            URL Shortener
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/create">
            Create URL
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: 4 }}>
        <Routes>
          <Route path="/" element={<UrlListPage />} />
          <Route path="/create" element={<CreateUrlPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;