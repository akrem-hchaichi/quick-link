import { useAppDispatch, useAppSelector } from '../store/hooks'; // Updated import
import { createUrl } from '../store/url/urlThunks';
import { Container, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import CreateUrlForm from '../components/CreateUrlForm';

interface CreateUrlFormInputs {
    longUrl: string;
    customShortId?: string;
}

const CreateUrlPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading } = useAppSelector((state) => state.url);

    const onSubmit: SubmitHandler<CreateUrlFormInputs> = async (data) => {
        try {
            await dispatch(createUrl(data)).unwrap();
            toast.success('URL created successfully!');
            navigate('/');
        } catch (error) {
            toast.error('Failed to create URL. Please try again.');
        }
    };
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Create Short URL
            </Typography>
            <CreateUrlForm onSubmit={onSubmit} loading={loading} />
        </Container>
    );
};
export default CreateUrlPage;