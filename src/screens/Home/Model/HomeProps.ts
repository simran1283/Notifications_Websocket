export interface Notification {
    id: string
    type: string;
    title: string;
    message: string;
    timestamp: string;
    priority?: string;
    error_code?: string;
    completion_time?: string;
}