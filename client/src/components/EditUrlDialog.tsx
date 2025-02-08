import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { Url } from '../types/url';

interface EditUrlDialogProps {
    url: Url;
    onSave: (updatedUrl: Url) => void;
    onClose: () => void;
}

const EditUrlDialog: React.FC<EditUrlDialogProps> = ({ url, onSave, onClose }) => {
    const [longUrl, setLongUrl] = useState(url.longUrl);
    const [customShortId, setCustomShortId] = useState(url.customShortId || '');

    const handleSave = () => {
        onSave({
            ...url,
            longUrl,
            customShortId: customShortId || undefined,
        });
    };

    return (
        <Dialog open onClose={onClose}>
            <DialogTitle>Edit URL</DialogTitle>
            <DialogContent>
                <TextField
                    label="Long URL"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Custom Short ID (optional)"
                    value={customShortId}
                    onChange={(e) => setCustomShortId(e.target.value)}
                    fullWidth
                    margin="normal"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditUrlDialog;