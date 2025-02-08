import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks'; // Updated import
import { fetchUrls } from '../store/url/urlThunks';
import { Container, Typography } from '@mui/material';
import UrlTable from '../components/UrlTable';

const UrlListPage = () => {
  const dispatch = useAppDispatch();
  const { urls, loading, error } = useAppSelector((state) => state.url);

  useEffect(() => {
    dispatch(fetchUrls({}));
  }, [dispatch]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        URL List
      </Typography>
      <UrlTable urls={urls} />
    </Container>
  );
};

export default UrlListPage;
