import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { ApiError } from './types';


const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export function useApi<T>(endpoint: string, options?: AxiosRequestConfig) {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<ApiError | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios({
                url: `${BASE_URL}${endpoint}`,
                method: 'GET',
                ...options,
            });
            setData(response.data);
            setError(null);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const errorData: ApiError = {
                    message: err.message || 'An error occurred',
                };

                if (err.code) {
                    errorData.code = err.code;
                }

                if (err.response?.status) {
                    errorData.status = err.response.status;
                }

                setError(errorData);
            } else {
                setError({ message: 'An unknown error occurred' });
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [endpoint]);

    const refetch = () => {
        fetchData();
    };

    return { data, error, loading, refetch };
}
