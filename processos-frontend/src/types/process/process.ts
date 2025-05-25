export type Process = {
    id: number;
    number: string;
    claimant: string;
    defendant: string;
    status: string;
    description: string;
    opening_date: Date | string;
};

export enum statusEnum {
    em_andamento = 'Em Andamento',
    acordo_realizado = 'Acordo Realizado',
    encerrado = 'Encerrado',
}
