import React, { useState } from 'react';
import { TextField, Button, Container, Typography, CircularProgress } from '@mui/material';
import './GeminiForm.css';
import { geminiService } from '../../../Services/GeminiService';

const GeminiForm: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState<string | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrompt(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        try {
            setResponse(await geminiService.chat(prompt));
        } catch (error) {
            console.error('Error sending request:', error);
            setResponse('Error occurred while sending request.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography style={{ paddingTop: '5vh' }} variant="h4" component="h1" gutterBottom>
                Send Prompt to Gemini
            </Typography>
            <form onSubmit={handleSubmit} className="prompt-form">
                <TextField
                    label="Enter your prompt"
                    variant="outlined"
                    fullWidth
                    value={prompt}
                    onChange={handleChange}
                    required
                    multiline
                    rows={4}
                    placeholder="Tell me a programming joke"
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ marginTop: '16px' }}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} /> : 'Submit'}
                </Button>
            </form>
            {response && (
                <Typography variant="body1" component="p" style={{ marginTop: '16px' }}>
                    {response}
                </Typography>
            )}
        </Container>
    );
};

export default GeminiForm;
