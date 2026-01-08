export interface ApiResponse<T> {
    result: T;
    success: boolean;
    message?: string;
    messageId?: number;
    messageType?: string;
}