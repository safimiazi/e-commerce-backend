export interface Iusers {
    phone: string;
    email?: string;
    password?: string;
    role: "user" | "admin";
    name?: string;
    address?: string;
}