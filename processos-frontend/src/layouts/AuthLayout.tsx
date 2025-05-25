import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/auth/auth.store';
import img from '../assets/logo.png';

export const AuthLayout = () => {
    const authStatus = useAuthStore(state => state.status);

    if (authStatus === 'pending') return <div>Cargando...</div>;
    if (authStatus === 'authorized') return <Navigate to="/home" />;

    return (
        <div>
            <main>
                <section className="flex flex-col md:flex-row h-screen items-center">
                    <div
                        className="hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen"
                        style={{ backgroundColor: 'oklch(0.29 0.09 240.68)' }}
                    >
                        <img
                            src={img}
                            alt="Logo"
                            className="object-contain mx-auto max-h-[100%] w-auto"
                        />
                    </div>

                    <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
                        <div className="w-full h-100">
                            <Outlet />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};
