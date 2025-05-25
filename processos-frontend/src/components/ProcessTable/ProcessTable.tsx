import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import { useProcessStore } from '../../store/process/process.store';
import ProcessDialog from '../ProcessDialog/ProcessDialog';
import { Process, statusEnum } from '../../types/process/process';

export default function ProcessTable() {
    const {
        processes,
        fetchProcesses,
        addProcess,
        deleteProcess,
        updateProcess,
    } = useProcessStore();

    const [filter, setFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [processToEdit, setProcessToEdit] = useState<Process | undefined>(
        undefined,
    );

    useEffect(() => {
        fetchProcesses();
    }, [fetchProcesses]);

    const handleDelete = async (id: string) => {
        await deleteProcess(id);
        fetchProcesses();
    };

    const handleAddOrEdit = async (process: any) => {
        if ('id' in process) {
            await updateProcess(String(process.id), process);
        } else {
            await addProcess(process);
            await fetchProcesses();
        }
        setOpenDialog(false);
        setProcessToEdit(undefined);
    };

    const handleOpenEdit = async (process: Process) => {
        setProcessToEdit(process);
        setOpenDialog(true);
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'number', headerName: 'Número Processo', width: 200 },
        { field: 'claimant', headerName: 'Requerente', width: 150 },
        { field: 'defendant', headerName: 'Requerido', width: 150 },
        { field: 'description', headerName: 'Descrição', width: 200 },
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
            renderCell: params => {
                const status = params.value as keyof typeof statusEnum;
                return statusEnum[status] || params.value;
            },
        },
        {
            field: 'opening_date',
            headerName: 'Abertura',
            width: 150,
            renderCell: params => {
                const match = String(params.value).match(
                    /(\d{4})-(\d{2})-(\d{2})/,
                );
                if (match) {
                    const [_, year, month, day] = match;
                    return `${day}-${month}-${year}`;
                }
                return '';
            },
        },
        {
            field: 'actions',
            headerName: 'Ações',
            width: 200,
            renderCell: params => (
                <div className="flex gap-2">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleOpenEdit(params.row)}
                    >
                        Editar
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(params.row.id)}
                    >
                        Deletar
                    </Button>
                </div>
            ),
        },
    ];

    const filteredRows = processes.filter(row => {
        const matchesNumber = row.number
            .toLowerCase()
            .includes(filter.toLowerCase());
        const matchesStatus = statusFilter ? row.status === statusFilter : true;
        return matchesNumber && matchesStatus;
    });

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">
                Gerenciamento de Processos
            </h1>

            <div className="flex gap-4 mb-4">
                <TextField
                    label="Filtrar por Numero de Processo"
                    style={{ width: 400 }}
                    size="small"
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                />

                <FormControl style={{ width: 200 }} size="small">
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={statusFilter}
                        onChange={e => setStatusFilter(e.target.value)}
                        label="Status"
                    >
                        <MenuItem value="">Todos</MenuItem>
                        {Object.entries(statusEnum).map(([key, value]) => (
                            <MenuItem key={key} value={key}>
                                {value}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button
                    variant="contained"
                    color="success"
                    style={{
                        backgroundColor: 'oklch(0.29 0.09 240.68)',
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        setOpenDialog(true);
                        setProcessToEdit(undefined);
                    }}
                >
                    Adicionar Processo
                </Button>
            </div>

            <div className="bg-white rounded-lg shadow-md">
                <DataGrid
                    rows={filteredRows}
                    columns={columns}
                    autoHeight
                    disableRowSelectionOnClick
                    pageSizeOptions={[]}
                />
            </div>

            <ProcessDialog
                open={openDialog}
                onClose={() => {
                    setOpenDialog(false);
                    setProcessToEdit(undefined);
                }}
                onConfirm={handleAddOrEdit}
                processToEdit={processToEdit}
            />
        </div>
    );
}
