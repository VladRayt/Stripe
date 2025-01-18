import { Platform } from 'react-native';
import { logger } from './logger';

type ErrorLevel = 'low' | 'medium' | 'high' | 'critical';

interface ErrorMetadata {
    level: ErrorLevel;
    code?: string | undefined;
    context?: Record<string, unknown> | undefined;
}

export class AppError extends Error {
    level: ErrorLevel;
    code: string | undefined;
    context: Record<string, unknown> | undefined;

    constructor(message: string, metadata: ErrorMetadata) {
        super(message);
        this.name = 'AppError';
        this.level = metadata.level;
        this.code = metadata.code;
        this.context = metadata.context;
    }
}

export const errorHandler = {
    handleApiError(error: unknown, context?: Record<string, unknown> | undefined): AppError {
        if (error instanceof AppError) return error;

        const baseContext = {
            timestamp: new Date().toISOString(),
            ...(context || {}),
        };

        if (error instanceof Response) {
            logger.error('API Response Error', {
                status: error.status,
                statusText: error.statusText,
                ...baseContext,
            });

            return new AppError('Помилка сервера', {
                level: 'high',
                code: 'API_ERROR',
                context: baseContext,
            });
        }

        if (error instanceof Error) {
            logger.error('Unexpected Error', {
                error,
                ...baseContext,
            });

            return new AppError(error.message, {
                level: 'medium',
                code: 'UNEXPECTED_ERROR',
                context: baseContext,
            });
        }

        logger.error('Unknown Error', {
            error,
            ...baseContext,
        });

        return new AppError('Невідома помилка', {
            level: 'low',
            code: 'UNKNOWN_ERROR',
            context: baseContext,
        });
    },

    handleNavigationError(error: unknown): void {
        logger.error('Navigation Error', { error });
    },

    handleFormError(error: unknown, formId: string): void {
        logger.error('Form Error', { error, formId });
    },

    setupGlobalHandler(): void {
        if (Platform.OS !== 'web' && global && (global as any).ErrorUtils) {
            const errorUtils = (global as any).ErrorUtils;
            const previousHandler = errorUtils.getGlobalHandler();

            errorUtils.setGlobalHandler((error: Error, isFatal?: boolean) => {
                logger.error('Global Error', { error, isFatal });
                previousHandler(error, isFatal);
            });
        }
    },
};
