export type LoginResponse = {
    _id: string;
    email: string;
    name: string;
    token: string;
};

export type RegisterUser = {
    name: string;
    email: string;
    password: string;
};
