export interface ContactForm {
    username: string;
    email: string;
    message: string;
    timestamp: number;
    isRead: boolean;
    isNew: boolean;
    id?: any;
}