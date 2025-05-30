import { Navigate, Outlet } from 'react-router-dom';

import { useAuthStore } from '../store/auth/auth.store';
import { Header } from '../components/Header';

export const AdminLayout = () => {
    const authStatus = useAuthStore(state => state.status);
    const user = useAuthStore(state => state.user);

    // if (authStatus === "pending") return <div>Carregando...</div>;
    if (authStatus === 'unauthorized') return <Navigate to="/" />;

    return (
        <div className="flex flex-col items-center justify-center gap-10">
            <Header />

            <main className="w-full xl:w-[75rem] flex flex-col items-center gap-4 pb-10">
                {user?.name && (
                    <h2 className="font-bold uppercase text-xl">
                        Bem Vindo
                        <span className="font-extrabold text-indigo-600">
                            {user?.name}
                        </span>
                    </h2>
                )}
                <Outlet />
            </main>
        </div>
    );
};
