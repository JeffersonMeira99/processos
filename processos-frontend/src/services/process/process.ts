import { useAuthStore } from '../../store/auth/auth.store';
import { Process } from '../../types/process/process';
import { configApi } from '../../utils/api';

export const getProcess = async (): Promise<Process[]> => {
    const token = useAuthStore.getState().user?.access_token;
    const response = await configApi.get('/api/processos', {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const getProcessById = async (id: string): Promise<Process> => {
    const token = useAuthStore.getState().user?.access_token;
    const response = await configApi.get(`/api/processos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const postProcess = async (
    process: Omit<Process, 'id'>,
): Promise<Process> => {
    const token = useAuthStore.getState().user?.access_token;
    const response = await configApi.post('/api/processos', process, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const putProcess = async (
    id: string,
    process: Partial<Process>,
): Promise<Process> => {
    const token = useAuthStore.getState().user?.access_token;
    const response = await configApi.put(`/api/processos/${id}`, process, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const deleteProcess = async (id: string): Promise<void> => {
    const token = useAuthStore.getState().user?.access_token;
    await configApi.delete(`/api/processos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};
