import {
    Box,
    CssBaseline,
    Toolbar,
    Typography,
    IconButton,
} from '@mui/material';
import { AppBar, DrawerHeader } from './DrawerComponents';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth/auth.store';

export default function MenuLateral() {
    const logout = useAuthStore(state => state.logoutUser);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <Box>
            <CssBaseline />
            <AppBar
                position="fixed"
                style={{
                    backgroundColor: 'oklch(0.29 0.09 240.68)',
                }}
            >
                <Toolbar
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <Typography variant="h6" noWrap>
                        Processos
                    </Typography>
                    <IconButton color="inherit" onClick={handleLogout}>
                        <LogoutIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                }}
            >
                <DrawerHeader />
            </Box>
        </Box>
    );
}
