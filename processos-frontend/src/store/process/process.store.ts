import { StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { toast } from 'sonner';
import { Process } from '../../types/process/process';
import {
    deleteProcess,
    getProcess,
    getProcessById,
    postProcess,
    putProcess,
} from '../../services/process/process';

export interface ProcessState {
    processes: Process[];
    fetchProcesses: () => Promise<void>;
    getProcessById: (id: string) => Promise<Process | undefined>;
    addProcess: (process: Omit<Process, 'id'>) => Promise<void>;
    updateProcess: (id: string, process: Partial<Process>) => Promise<void>;
    deleteProcess: (id: string) => Promise<void>;
}

const storeApi: StateCreator<ProcessState> = (set, get) => ({
    processes: [],

    fetchProcesses: async () => {
        try {
            const response = await getProcess();
            set({ processes: response });
        } catch (error) {
            toast.error('Erro ao carregar processos');
        }
    },

    getProcessById: async id => {
        try {
            const process = await getProcessById(id);
            return process;
        } catch (error) {
            toast.error('Erro ao buscar processo por ID');
            return undefined;
        }
    },

    addProcess: async process => {
        try {
            const newProcess = await postProcess(process);
            set({ processes: [...get().processes, newProcess] });
            toast.success('Processo adicionado com sucesso');
        } catch (error) {
            toast.error('Erro ao adicionar processo');
        }
    },

    updateProcess: async (id, process) => {
        try {
            const updated = await putProcess(id, process);
            set({
                processes: get().processes.map(p =>
                    p.id === Number(id) ? updated : p,
                ),
            });
            toast.success('Processo atualizado com sucesso');
        } catch (error) {
            toast.error('Erro ao atualizar processo');
        }
    },

    deleteProcess: async id => {
        try {
            await deleteProcess(id);
            set({
                processes: get().processes.filter(p => String(p.id) !== id),
            });
            toast.success('Processo excluído com sucesso');
        } catch (error) {
            toast.error('Erro ao excluir processo');
        }
    },
});

export const useProcessStore = create<ProcessState>()(
    devtools(persist(storeApi, { name: 'process-storage' })),
);
