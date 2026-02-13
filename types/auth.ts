export type LoginRequest = {
    email: string;
    password: string;
};

export type User = {
    id: number;
    name: string;
    email: string;
    role: string; // CLIENT or FREELANCER
};

export type LoginResponse = {
    token: string;
};
