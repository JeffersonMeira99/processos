import { Route, Routes } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { LoginPage } from '../pages/login/Login';
import { AdminLayout } from '../layouts/AdminLayout';
import HomePage from '../pages/home/Home';
import { RegisterPage } from '../pages/register/Register';

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<AuthLayout />}>
                <Route index element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Route>

            <Route path="/home" element={<AdminLayout />}>
                <Route path="/home" element={<HomePage />} />
            </Route>
        </Routes>
    );
};
