export interface ApiResponse<T> {
    data: T;
    error: string | null;
    loading: boolean;
}

export interface ApiError {
    message: string;
    code?: string;
    status?: number;
}
