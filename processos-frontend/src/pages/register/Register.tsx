import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuthStore } from '../../store/auth/auth.store';

export const RegisterPage = () => {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        password: '',
    });

    const registerUser = useAuthStore(state => state.registerUser);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { name, email, password } = credentials;

        if ([name, email, password].includes('')) {
            return toast.error('Todos os campos são obrigatórios');
        }

        try {
            await registerUser(credentials);
            toast.success('Cadastro realizado com sucesso!');
            navigate('/');
        } catch (error) {
            toast.error('Erro ao cadastrar. Verifique seus dados.');
        }
    };

    const handleChange = (e: FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        setCredentials(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <>
            <h2 className="text-xl md:text-2xl font-bold leading-tight mt-12 text-gray-600 uppercase">
                Cadastro
            </h2>
            <form className="mt-6" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-gray-700">Nome</label>
                    <input
                        type="text"
                        placeholder="João"
                        className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                        name="name"
                        value={credentials.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        placeholder="joao.silva@gmail.com"
                        className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="mt-4">
                    <label className="block text-gray-700">Senha</label>
                    <input
                        type="password"
                        placeholder="**************"
                        minLength={6}
                        className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                    />
                </div>

                <button
                    type="submit"
                    style={{
                        backgroundColor: 'oklch(0.29 0.09 240.68)',
                        cursor: 'pointer',
                    }}
                    className="w-full block hover:opacity-90 text-white font-semibold rounded-lg px-4 py-3 mt-6"
                >
                    Cadastrar
                </button>
            </form>
        </>
    );
};
