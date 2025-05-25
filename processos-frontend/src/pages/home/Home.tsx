import React from 'react';
import { Box, Paper } from '@mui/material';
import ProcessTable from '../../components/ProcessTable/ProcessTable';

const HomePage: React.FC = () => {
    return (
        <Box
            sx={{
                margin: '0 auto',
                padding: '16px',
                backgroundColor: '#f5f5f5',
                borderRadius: '8px',
            }}
        >
            <Paper sx={{ padding: '16px', marginBottom: '24px' }}>
                <ProcessTable />
            </Paper>
        </Box>
    );
};

export default HomePage;
