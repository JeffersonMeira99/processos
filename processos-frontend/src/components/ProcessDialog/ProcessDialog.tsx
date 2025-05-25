import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    MenuItem,
} from '@mui/material';
import { Process } from '../../types/process/process';

interface ProcessDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: (process: Omit<Process, 'id'> | Process) => void;
    processToEdit?: Process;
}

const ProcessDialog: React.FC<ProcessDialogProps> = ({
    open,
    onClose,
    onConfirm,
    processToEdit,
}) => {
    const [form, setForm] = useState<Omit<Process, 'id'>>({
        number: '',
        claimant: '',
        defendant: '',
        status: 'em_andamento',
        opening_date: '',
        description: '',
    });

    useEffect(() => {
        if (processToEdit) {
            const { id, ...rest } = processToEdit;

            const dateStr = String(rest.opening_date)
                .split('T')[0]
                .split(' ')[0];

            setForm({
                ...rest,
                opening_date: dateStr,
            });
        } else {
            setForm({
                number: '',
                claimant: '',
                defendant: '',
                status: 'em_andamento',
                opening_date: '',
                description: '',
            });
        }
    }, [processToEdit, open]);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | { name?: string; value: unknown }
        >,
    ) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name as string]: value }));
    };

    const handleSubmit = () => {
        const processToSend = {
            ...form,
            opening_date: new Date(form.opening_date),
        };

        if (processToEdit) {
            onConfirm({ ...processToSend, id: processToEdit.id });
        } else {
            onConfirm(processToSend);
        }
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                {processToEdit ? 'Editar Processo' : 'Adicionar Processo'}
            </DialogTitle>
            <DialogContent dividers>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Número do Processo"
                    name="number"
                    value={form.number}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Requerente"
                    name="claimant"
                    value={form.claimant}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Requerido"
                    name="defendant"
                    value={form.defendant}
                    onChange={handleChange}
                />
                <TextField
                    select
                    fullWidth
                    margin="normal"
                    label="Status"
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                >
                    <MenuItem value="em_andamento">Em Andamento</MenuItem>
                    <MenuItem value="acordo_realizado">
                        Acordo Realizado
                    </MenuItem>
                    <MenuItem value="encerrado">Encerrado</MenuItem>
                </TextField>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Data de Abertura"
                    type="date"
                    name="opening_date"
                    InputLabelProps={{ shrink: true }}
                    value={form.opening_date}
                    onChange={handleChange}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Descrição"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    maxRows={8}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                >
                    {processToEdit ? 'Salvar Alterações' : 'Adicionar'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ProcessDialog;
