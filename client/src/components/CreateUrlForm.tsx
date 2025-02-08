import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Box, CircularProgress } from '@mui/material';

// Define the form inputs interface
export interface CreateUrlFormInputs {
    longUrl: string;
    customShortId?: string;
}

interface CreateUrlFormProps {
    onSubmit: SubmitHandler<CreateUrlFormInputs>;
    loading: boolean;
}

const CreateUrlForm: React.FC<CreateUrlFormProps> = ({ onSubmit, loading }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateUrlFormInputs>();

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
            <TextField
                label="Long URL"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register('longUrl', {
                    required: 'Long URL is required',
                    pattern: {
                        value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                        message: 'Invalid URL format',
                    },
                })}
                error={!!errors.longUrl}
                helperText={errors.longUrl?.message}
            />
            <TextField
                label="Custom Short ID (optional)"
                variant="outlined"
                fullWidth
                margin="normal"
                {...register('customShortId', {
                    pattern: {
                        value: /^[a-zA-Z0-9_-]+$/,
                        message: 'Custom short ID must be alphanumeric',
                    },
                })}
                error={!!errors.customShortId}
                helperText={errors.customShortId?.message}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
            >
                {loading ? <CircularProgress size={24} /> : 'Create'}
            </Button>
        </Box>
    );
};

export default CreateUrlForm;